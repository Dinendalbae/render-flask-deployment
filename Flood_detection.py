from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import requests
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split

app = Flask(__name__, static_folder='static')

# API ve model ayarları aynı kalacak
API_KEY = '354498d631b33a2597541fba90108bc1'
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

# Model eğitimi aynı kalacak
df = pd.read_csv("flood_risk_dataset_india.csv")
columns_api = ['Rainfall (mm)', 'Temperature (°C)', 'Humidity (%)', 'Flood Occurred']
df_api = df[columns_api]
X_api = df_api.drop(columns=['Flood Occurred'])
y_api = df_api['Flood Occurred']

pipeline_api = Pipeline(steps=[
    ('preprocessor', StandardScaler()),
    ('classifier', RandomForestClassifier(random_state=30))
])

# Veriyi train ve test olarak ayır
X_train, X_test, y_train, y_test = train_test_split(
    X_api, 
    y_api, 
    test_size=0.2,  # %20'si test için
    random_state=30  
)

pipeline_api.fit(X_train, y_train)

def get_weather_data(city):
    # Koordinatları al
    # Van için sabit koordinatları kullan
    if city == "Van":
        lat, lon = 38.5, 43.4  # Van, Türkiye'nin koordinatları
        # Doğrudan forecast URL'ini oluştur
        forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    else:
        # Diğer şehirler için mevcut geo-lokasyon mantığını kullan
        geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}"
        geo_response = requests.get(geo_url)
        if geo_response.status_code != 200:
            return None
        
        location = geo_response.json()[0]
        lat, lon = location['lat'], location['lon']
        forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    
    response = requests.get(forecast_url)
    
    if response.status_code == 200:
        data = response.json()
        current_weather = data['list'][0]
        
        # 24 saatlik yağış hesapla
        total_rain = sum(period.get('rain', {}).get('3h', 0) for period in data['list'][:8])
        
        # Current weather'a toplam yağışı ekle
        current_weather['rain'] = {'24h': total_rain}
        return current_weather
        
    return None

def process_weather_data(weather_data):
    return {
        'Rainfall (mm)': weather_data.get('rain', {}).get('24h', 0),
        'Temperature (°C)': weather_data['main']['temp'],
        'Humidity (%)': weather_data['main']['humidity'],
        'Clouds (%)': weather_data['clouds']['all'],
        'Pressure (hPa)': weather_data['main']['pressure'],
        'Wind Speed (m/s)': weather_data['wind']['speed']
    }


def custom_probability(features):
    rainfall = features['Rainfall (mm)'].iloc[0]
    
    # RandomForest tahminini al
    rf_prob = pipeline_api.predict_proba(features)[0][1]
    
    # Yağış ağırlığı hesaplama
    rainfall_weight = np.log1p(rainfall) / 4.0
    
    # Temel olasılık hesaplamada RandomForest tahminini kullan
    base_prob = (rainfall_weight * 0.8) + (rainfall_weight * rf_prob * 0.1)
    
    temp = features['Temperature (°C)'].iloc[0]
    humidity = features['Humidity (%)'].iloc[0]
    
    temp_effect = 1 + ((30 - temp) / 1000)  # Sıcaklık düştükçe etki artar
    humidity_effect = 1 + (humidity / 10000)
    
    # Düşük yağış kontrolü
    if rainfall < 5:
        probability = base_prob * 0.2
    else:
        probability = base_prob * temp_effect * humidity_effect
    
    # Olasılığı 0-1 arasında sınırlama
    probability = np.clip(probability, 0, 1)
    
    return probability


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/past-floods')
def past_floods():
    return render_template('past-floods.html')


@app.route('/predict-historical', methods=['POST'])
def predict_historical():
   try:
       city = request.form.get('city')

       if city == "TEST_CITY":
           # Manuel test için gelen verileri al
           input_data = pd.DataFrame([{
               'Rainfall (mm)': float(request.form.get('rainfall')),
               'Temperature (°C)': float(request.form.get('temperature')), 
               'Humidity (%)': float(request.form.get('humidity'))
           }])       
       elif city == "Valencia, İspanya":
           input_data = pd.DataFrame([{
               'Rainfall (mm)': 300, 
               'Temperature (°C)': 15, 
               'Humidity (%)': 95     
           }])
       elif city == "İstanbul":
           input_data = pd.DataFrame([{
               'Rainfall (mm)': 128,
               'Temperature (°C)': 28,
               'Humidity (%)': 85
           }])
       elif city == "Antalya":
           input_data = pd.DataFrame([{
               'Rainfall (mm)': 165,
               'Temperature (°C)': 18,
               'Humidity (%)': 90
           }])
       elif city == "Gaziantep":
           input_data = pd.DataFrame([{
               'Rainfall (mm)': 142,
               'Temperature (°C)': 22,
               'Humidity (%)': 88
           }])
       elif city == "Bodrum":
           input_data = pd.DataFrame([{
               'Rainfall (mm)': 88,
               'Temperature (°C)': 27.2,
               'Humidity (%)': 88
           }])
       elif city == "Samsun":
           input_data = pd.DataFrame([{
               'Rainfall (mm)': 68.4,
               'Temperature (°C)': 20,
               'Humidity (%)': 88
           }])
       elif city == "Ankara":
           input_data = pd.DataFrame([{
                'Rainfall (mm)': 47,
                'Temperature (°C)': 22.7,
                'Humidity (%)': 72
           }])
       elif city == "Adıyaman":
           input_data = pd.DataFrame([{
                'Rainfall (mm)': 35,
                'Temperature (°C)': 12,
                'Humidity (%)': 92
           }])
       elif city == "İzmir":
           input_data = pd.DataFrame([{
                'Rainfall (mm)': 39,
                'Temperature (°C)': 12,
                'Humidity (%)': 72
           }])
       else:
           return jsonify({
               "success": False,
               "error": "Geçmiş sel verisi bulunamadı."
           })
       
       adjusted_probability = custom_probability(input_data)
       
       return jsonify({
           "success": True,
           "probability": round(adjusted_probability * 100, 2)
       })
       
   except Exception as e:
       return jsonify({
           "success": False,
           "error": str(e)
       })


@app.route('/ai-dashboard')
def ai_dashboard():
    return render_template('ai-dashboard.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        city = request.form.get('city')
        weather_data = get_weather_data(city)
        
        if weather_data:
            processed_data = process_weather_data(weather_data)
            input_data = pd.DataFrame([{
                'Rainfall (mm)': float(processed_data['Rainfall (mm)']),
                'Temperature (°C)': processed_data['Temperature (°C)'],
                'Humidity (%)': processed_data['Humidity (%)']
            }])
            
            adjusted_probability = custom_probability(input_data)
            
            result = {
                "success": True,
                "data": processed_data,
                "probability": round(adjusted_probability * 100, 2)
            }
        else:
            result = {
                "success": False,
                "error": "Hava durumu verisi alınamadı."
            }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })
    

if __name__ == '__main__':
    app.run()
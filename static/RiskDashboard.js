// RiskDashboard.js
const RiskDashboard = () => {
    // Türkiye'deki tüm şehirler ve koordinatları
    const turkiyeSehirleri = {
      "Adana": [37.0000, 35.3213],
      "Adıyaman": [37.7644, 38.2777],
      "Afyonkarahisar": [38.7507, 30.5567],
      "Ağrı": [39.7191, 43.0503],
      "Amasya": [40.6499, 35.8353],
      "Ankara": [39.9334, 32.8597],
      "Antalya": [36.8969, 30.7133],
      "Artvin": [41.1828, 41.8183],
      "Aydın": [37.8560, 27.8416],
      "Balıkesir": [39.6484, 27.8826],
      "Bilecik": [40.1506, 29.9792],
      "Bingöl": [39.0626, 40.7696],
      "Bitlis": [38.4006, 42.1095],
      "Bolu": [40.7392, 31.6089],
      "Burdur": [37.7210, 30.2797],
      "Bursa": [40.1885, 29.0610],
      "Çanakkale": [40.1553, 26.4142],
      "Çankırı": [40.6013, 33.6134],
      "Çorum": [40.5506, 34.9556],
      "Denizli": [37.7765, 29.0864],
      "Diyarbakır": [37.9144, 40.2306],
      "Edirne": [41.6818, 26.5623],
      "Elazığ": [38.6810, 39.2264],
      "Erzincan": [39.7500, 39.5000],
      "Erzurum": [39.9000, 41.2700],
      "Eskişehir": [39.7767, 30.5206],
      "Gaziantep": [37.0662, 37.3833],
      "Giresun": [40.9128, 38.3895],
      "Gümüşhane": [40.4386, 39.5086],
      "Hakkari": [37.5833, 43.7333],
      "Hatay": [36.2023, 36.1613],
      "Isparta": [37.7648, 30.5566],
      "Mersin": [36.8000, 34.6333],
      "İstanbul": [41.0082, 28.9784],
      "İzmir": [38.4192, 27.1287],
      "Kars": [40.6167, 43.1000],
      "Kastamonu": [41.3887, 33.7827],
      "Kayseri": [38.7312, 35.4787],
      "Kırklareli": [41.7333, 27.2167],
      "Kırşehir": [39.1425, 34.1709],
      "Kocaeli": [40.8533, 29.8815],
      "Konya": [37.8667, 32.4833],
      "Kütahya": [39.4167, 29.9833],
      "Malatya": [38.3552, 38.3095],
      "Manisa": [38.6191, 27.4289],
      "Kahramanmaraş": [37.5858, 36.9371],
      "Mardin": [37.3212, 40.7245],
      "Muğla": [37.2153, 28.3636],
      "Muş": [38.7432, 41.5064],
      "Nevşehir": [38.6244, 34.7144],
      "Niğde": [37.9667, 34.6833],
      "Ordu": [40.9839, 37.8764],
      "Rize": [41.0201, 40.5234],
      "Sakarya": [40.7569, 30.3783],
      "Samsun": [41.2928, 36.3313],
      "Siirt": [37.9333, 41.9500],
      "Sinop": [42.0231, 35.1531],
      "Sivas": [39.7477, 37.0179],
      "Tekirdağ": [40.9833, 27.5167],
      "Tokat": [40.3167, 36.5500],
      "Trabzon": [41.0015, 39.7178],
      "Tunceli": [39.1079, 39.5401],
      "Şanlıurfa": [37.1591, 38.7969],
      "Uşak": [38.6823, 29.4082],
      "Van": [38.4891, 43.4089],
      "Yozgat": [39.8181, 34.8147],
      "Zonguldak": [41.4564, 31.7987]
    };
  
    // Population data for the 5 most populous cities
    const populousCities = {
      "İstanbul": 15840900,
      "Ankara": 5747325,
      "İzmir": 4439372,
      "Bursa": 3147818,
      "Antalya": 2619832,
      "Konya": 2277017,
      "Gaziantep": 2130432,
      "Şanlıurfa": 2115256,
      "Mersin": 1891145,
      "Adana": 1773852
    };
  
    const [cityData, setCityData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
  
    // Risk Legend Component'i
    const RiskLegend = () => (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-3">Risk Seviyeleri</h3>
            <div className="grid grid-cols-5 gap-4">
                <div className="bg-red-200 p-3 rounded-lg">
                    <div className="text-red-800 font-medium text-center">
                        <div className="mb-1">Çok Yüksek</div>
                        <div className="text-sm">≥80%</div>
                    </div>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                    <div className="text-red-600 font-medium text-center">
                        <div className="mb-1">Yüksek</div>
                        <div className="text-sm">65-79%</div>
                    </div>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                    <div className="text-yellow-600 font-medium text-center">
                        <div className="mb-1">Orta</div>
                        <div className="text-sm">50-64%</div>
                    </div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                    <div className="text-green-600 font-medium text-center">
                        <div className="mb-1">Düşük</div>
                        <div className="text-sm">40-49%</div>
                    </div>
                </div>
                <div className="bg-green-200 p-3 rounded-lg">
                    <div className="text-green-800 font-medium text-center">
                        <div className="mb-1">Çok Düşük</div>
                        <div className="text-sm">＜40%</div>
                    </div>
                </div>
            </div>
        </div>
    );


    // Risk seviyesi belirleme fonksiyonu
    function getRiskLevel(probability) {
        if (probability >= 80) return { level: 'Çok Yüksek', color: 'text-red-800', bgColor: 'bg-red-200' };
        if (probability >= 65) return { level: 'Yüksek', color: 'text-red-600', bgColor: 'bg-red-100' };
        if (probability >= 50) return { level: 'Orta', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        if (probability >= 40) return { level: 'Düşük', color: 'text-green-600', bgColor: 'bg-green-100' };
        return { level: 'Çok Düşük', color: 'text-green-800', bgColor: 'bg-green-200' 
        };
    }
    
    
    // Create city card component
    const CityCard = ({ cityInfo }) => {
        const risk = getRiskLevel(cityInfo.probability);
        return (
            <div className={`p-4 rounded-lg ${risk.bgColor} border border-gray-200`}>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{cityInfo.city}</h3>
                    <span className={`font-bold ${risk.color}`}>{cityInfo.probability}%</span>
                </div>
                <div className="mt-2 text-sm space-y-1">
                    <p>Risk Seviyesi: <span className={`${risk.color} font-semibold`}>{risk.level}</span></p>
                    <p>Sıcaklık: {cityInfo.data['Temperature (°C)']}°C</p>
                    <p>Nem: {cityInfo.data['Humidity (%)']}%</p>
                    <p>Yağış: {cityInfo.data['Rainfall (mm)']} mm</p>
                    <p>Bulut Oranı: {cityInfo.data['Clouds (%)']}%</p>
                    <p>Basınç: {cityInfo.data['Pressure (hPa)']} hPa</p>
                    <p>Rüzgar Hızı: {cityInfo.data['Wind Speed (m/s)']} m/s</p>
                </div>
            </div>
        );
    };


    // Fetch city data
    React.useEffect(() => {
      const fetchCityData = async () => {
        setLoading(true);
        try {
          const allCities = Object.keys(turkiyeSehirleri);
          const promises = allCities.map(async (city) => {
            const formData = new FormData();
            formData.append('city', city);
            const response = await fetch('/predict', {
              method: 'POST',
              body: formData
            });
            const data = await response.json();
            return {
              city,
              population: populousCities[city],
              ...data
            };
          });
  
          const results = await Promise.all(promises);
          setCityData(results.filter(result => result.success));
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCityData();
      const interval = setInterval(fetchCityData, 30 * 60 * 1000);
      return () => clearInterval(interval);
    }, []);
  
    // Sort cities by population and risk
    const populationSorted = [...cityData]
      .filter(city => populousCities[city.city])
      .sort((a, b) => populousCities[b.city] - populousCities[a.city])
      .slice(0, 10);
  
    const riskSorted = [...cityData]
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 10);
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Türkiye Sel Risk Monitörü</h2>
        <RiskLegend />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">En Riskli 10 Şehir</h3>
            <div className="grid grid-cols-2 gap-4">
              {riskSorted.map((city, index) => (
                <CityCard key={`risk-${index}`} cityInfo={city} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">En Kalabalık 10 Şehir</h3>
              <div className="grid grid-cols-2 gap-4">
              {populationSorted.map((city, index) => (
                <CityCard key={`pop-${index}`} cityInfo={city} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
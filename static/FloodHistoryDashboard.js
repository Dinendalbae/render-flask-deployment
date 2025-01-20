const FloodHistoryDashboard = () => {
    const [predictions, setPredictions] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const floodHistory = [
        {
            city: "Valencia, İspanya",
            date: "29 Ekim 2024",
            data: {
                'Temperature (°C)': 15,
                'Humidity (%)': 95,
                'Rainfall (mm)': 300,
                'Clouds (%)': 100
            },
            damage: 3500, // 3.5 milyar Euro
            deaths: 231,
            duration: 456, // 19 gün = 456 saat
            additionalInfo: "Cold drop (DANA) kaynaklı aşırı yağışlar"
        },
        {
            city: "İstanbul",
            date: "15 Ağustos 2023",
            data: {
                'Temperature (°C)': 28,
                'Humidity (%)': 85,
                'Rainfall (mm)': 128,
                'Clouds (%)': 90
            },
            damage: 50,
            deaths: 2,
            duration: 6
        },
        {
            city: "Antalya",
            date: "3 Şubat 2023",
            data: {
                'Temperature (°C)': 18,
                'Humidity (%)': 90,
                'Rainfall (mm)': 165,
                'Clouds (%)': 95
            },
            damage: 30,
            deaths: 0,
            duration: 12
        },
        {
            city: "Gaziantep",
            date: "27 Mart 2023",
            data: {
                'Temperature (°C)': 22,
                'Humidity (%)': 88,
                'Rainfall (mm)': 142,
                'Clouds (%)': 85
            },
            damage: 25,
            deaths: 1,
            duration: 8
        },
        {
            city: "Bodrum",
            date: "22 Eylül 2015",
            data: {
                'Temperature (°C)': 27.2,
                'Humidity (%)': 88,
                'Rainfall (mm)': 88,
                'Clouds (%)': 75
            },
            damage: 15,
            deaths: 0,
            duration: 4
        },
        {
            city: "Samsun",
            date: "4 Temmuz 2012",
            data: {
                'Temperature (°C)': 20,
                'Humidity (%)': 88,
                'Rainfall (mm)': 68.4,
                'Clouds (%)': 80
            },
            damage: 10,
            deaths: 0,
            duration: 5
        },
        {
            city: "Ankara",
            date: "7 Haziran 2022", 
            data: {
                'Temperature (°C)': 22.7,
                'Humidity (%)': 72,
                'Rainfall (mm)': 47,
                'Clouds (%)': 65
            },
            damage: 20,
            deaths: 0,
            duration: 5
        },
        {
            city: "Adıyaman",
            date: "15 Mart 2023",
            data: {
                'Temperature (°C)': 12,
                'Humidity (%)': 92, 
                'Rainfall (mm)': 35,
                'Clouds (%)': 85
            },
            damage: 40,
            deaths: 3,
            duration: 8
        },
        {
            city: "İzmir",
            date: "2 Şubat 2021",
            data: {
                'Temperature (°C)': 12,
                'Humidity (%)': 72,
                'Rainfall (mm)': 39,
                'Clouds (%)': 75
            },
            damage: 30,
            deaths: 0,
            duration: 7
        }
    ];

    React.useEffect(() => {
        const getPredictions = async () => {
            const predictions = {};
            for (const flood of floodHistory) {
                const formData = new FormData();
                formData.append('city', flood.city);
                
                const response = await fetch('/predict-historical', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                if (result.success) {
                    predictions[flood.city] = result.probability;
                }
            }
            setPredictions(predictions);
            setLoading(false);
        };

        getPredictions();
    }, []);

    // Risk seviyesi belirleme fonksiyonu
    function getRiskLevel(probability) {
        if (probability >= 80) return { level: 'Çok Yüksek', color: 'text-red-800', bgColor: 'bg-red-200' };
        if (probability >= 65) return { level: 'Yüksek', color: 'text-red-600', bgColor: 'bg-red-100' };
        if (probability >= 50) return { level: 'Orta', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        if (probability >= 40) return { level: 'Düşük', color: 'text-green-600', bgColor: 'bg-green-100' };
        return { level: 'Çok Düşük', color: 'text-green-800', bgColor: 'bg-green-200' 
        };
    }
     
    const FloodCard = ({ floodInfo }) => {
        const risk = getRiskLevel(predictions[floodInfo.city]);
        return (
            <div className={`p-4 rounded-lg ${risk.bgColor} border border-gray-200 mb-4`}>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{floodInfo.city}</h3>
                    <span className={risk.color}>{predictions[floodInfo.city]}%</span>
                </div>
                <div className="mt-2 text-sm space-y-1">
                    <p>Risk Seviyesi: <span className={risk.color}>{risk.level}</span></p>
                    <p>Sıcaklık: {floodInfo.data['Temperature (°C)']}°C</p>
                    <p>Nem: {floodInfo.data['Humidity (%)']}%</p>
                    <p>Yağış: {floodInfo.data['Rainfall (mm)']} mm</p>
                    <p>Bulut Oranı: {floodInfo.data['Clouds (%)']}%</p>
                    <p>Tarih: {floodInfo.date}</p>
                    {floodInfo.damage > 0 && (
                        <p>Hasar: {floodInfo.damage}M TL</p>
                    )}
                    {floodInfo.duration > 0 && (
                        <p>Süre: {floodInfo.duration} saat</p>
                    )}
                    {floodInfo.deaths > 0 && (
                        <p className="text-red-600">Can Kaybı: {floodInfo.deaths}</p>
                    )}
                </div>
            </div>
        );
     };
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-center mb-6">Geçmiş Sel Olayları ve Tahminler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Toplam Olay</h3>
                    <p className="text-3xl font-bold text-blue-600">{floodHistory.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Toplam Hasar</h3>
                    <p className="text-3xl font-bold text-green-600">
                        {floodHistory.reduce((acc, curr) => acc + curr.damage, 0)}M TL
                    </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Toplam Can Kaybı</h3>
                    <p className="text-3xl font-bold text-red-600">
                        {floodHistory.reduce((acc, curr) => acc + curr.deaths, 0)}
                    </p>
                </div>
            </div>
            {loading ? (
            <div className="text-center">
                <p>Tahminler yükleniyor...</p>
            </div>
        ) : (
            <div>
                <h3 className="text-xl font-semibold mb-4">Detaylı Sel Kayıtları ve Tahminler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...floodHistory]
                        .sort((a, b) => {
                            const probA = predictions[a.city] || 0;
                            const probB = predictions[b.city] || 0;
                            return probB - probA;  // Yüksekten düşüğe sıralama
                        })
                        .map((flood, index) => (
                            <FloodCard key={index} floodInfo={flood} />
                        ))
                    }
                </div>
            </div>
        )}
        </div>
    );
};
// AIDashboard.js

// Model performance data
const modelComparisonData = [
    {
        name: 'Random Forest',
        accuracy: 0.9023,
        precision: 0.90,
        recall: 0.90,
        f1Score: 0.90,
        trainingTime: 'Orta',
        inferenceTime: 'Orta',
        scalability: 'İyi',
        realTimeSuitability: 'Orta'
    },
    {
        name: 'XGBoost',
        accuracy: 0.8609,
        precision: 0.86,
        recall: 0.86,
        f1Score: 0.86,
        trainingTime: 'Orta',
        inferenceTime: 'Orta',
        scalability: 'İyi',
        realTimeSuitability: 'İyi'
    },
    {
        name: 'LightGBM',
        accuracy: 0.8004,
        precision: 0.80,
        recall: 0.80,
        f1Score: 0.80,
        trainingTime: 'Düşük',
        inferenceTime: 'Düşük',
        scalability: 'Mükemmel',
        realTimeSuitability: 'Mükemmel'
    },
    {
        name: 'KNN',
        accuracy: 0.6495,
        precision: 0.65,
        recall: 0.65,
        f1Score: 0.65,
        trainingTime: 'Düşük',
        inferenceTime: 'Yüksek',
        scalability: 'Zayıf',
        realTimeSuitability: 'Orta'
    },
    {
        name: 'SVM',
        accuracy: 0.6044,
        precision: 0.63,
        recall: 0.60,
        f1Score: 0.58,
        trainingTime: 'Yüksek',
        inferenceTime: 'Yüksek',
        scalability: 'Zayıf',
        realTimeSuitability: 'Orta'
    }
];


const AIDashboard = () => {
    // SVG ikonları için helper component'ler
    const IconArrowUpCircle = ({className}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m16 12-4-4-4 4"></path>
            <path d="M12 16V8"></path>
        </svg>
    );

    const IconArrowDownCircle = ({className}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 12l4 4 4-4"></path>
            <path d="M12 8v8"></path>
        </svg>
    );

    const IconHome = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
    );

    // Helper function for performance indicator color
    const getPerformanceColor = (value) => {
        if (value >= 0.85) return 'text-green-600';
        if (value >= 0.70) return 'text-yellow-600';
        return 'text-red-600';
    };

    // Helper function for qualitative metrics color
    const getQualitativeColor = (value) => {
        const colorMap = {
            'Mükemmel': 'text-green-600',
            'İyi': 'text-blue-600',
            'Orta': 'text-yellow-600',
            'Zayıf': 'text-red-600',
            'Yüksek': 'text-red-600',
            'Düşük': 'text-green-600'
        };
        return colorMap[value] || 'text-gray-600';
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-800">AI Model Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <button 
                                onClick={() => window.location.href='/'} 
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <IconHome />
                                Ana Sayfa
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Model Özeti */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Model Doğruluğu</p>
                                <p className="text-2xl font-bold text-blue-600">90.23%</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Model Tipi</p>
                                <p className="text-2xl font-bold text-green-600">RandomForest</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                                    <path d="M12 2a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center mb-4">
                            <div className="text-purple-600 mr-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="17 8 12 3 7 8"/>
                                    <line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold">Kullanılan Özellikler</h2>
                        </div>
                        <p className="text-gray-600">Yağış, Sıcaklık, Nem</p>
                    </div>
                </div>

                {/* Ana Parametreler */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-6">Model Parametreleri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Yağış */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 1 1 0 9h-1"/>
                                    <path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>
                                </svg>
                                <h3 className="font-semibold text-gray-800">Yağış Miktarı</h3>
                            </div>
                            <p className="text-sm text-gray-600">24 saatlik toplam yağış miktarı modelin en önemli girdisidir. Yüksek yağış miktarı sel riskini önemli ölçüde artırır.</p>
                        </div>

                        {/* Sıcaklık */}
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
                                </svg>
                                <h3 className="font-semibold text-gray-800">Sıcaklık</h3>
                            </div>
                            <p className="text-sm text-gray-600">Hava sıcaklığı, yağışın etkisini ve buharlaşma oranını etkileyerek risk hesaplamasına katkıda bulunur.</p>
                        </div>

                        {/* Nem */}
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
                                </svg>
                                <h3 className="font-semibold text-gray-800">Nem Oranı</h3>
                            </div>
                            <p className="text-sm text-gray-600">Yüksek nem oranı, zemin doygunluğunu ve yağış etkisini artırarak sel riskini yükseltebilir.</p>
                        </div>
                    </div>
                </div>

                {/* Risk Faktörleri */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-6">Risk Faktörleri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                            <IconArrowUpCircle className="w-6 h-6 text-red-500 mt-1" />
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Risk Artırıcı Faktörler</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Yüksek yağış (>20mm/24s)</li>
                                    <li>• Yüksek nem (>80%)</li>
                                    <li>• Önceden doymuş toprak</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                            <IconArrowDownCircle className="w-6 h-6 text-green-500 mt-1" />
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Risk Azaltıcı Faktörler</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Düşük yağış (&lt;5mm/24s)</li>
                                    <li>• Normal nem (40-60%)</li>
                                    <li>• Kuru toprak koşulları</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Veri Kaynağı */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Veri Kaynağı</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium mb-3">OpenWeatherMap API</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center">
                                        <span className="mr-2">•</span>
                                        24 saatlik toplam yağış verisi
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">•</span>
                                        Gerçek zamanlı sıcaklık ve nem verisi
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">•</span>
                                        81 il için anlık veri alımı
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Eğitim Veri Seti Özeti</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium mb-3">Genel Bilgiler</h3>
                                <ul className="space-y-2">
                                    <li className="text-gray-700">
                                        <span className="font-medium">Toplam Satır Sayısı:</span> 10,000
                                    </li>
                                    <li className="text-gray-700">
                                        <span className="font-medium">Özellik Sayısı:</span> 13
                                    </li>
                                    <li className="text-gray-700">
                                        <span className="font-medium">Hedef Değişken:</span> Sel Gerçekleşti (Evet / Hayır)
                                    </li>
                                    <li className="text-gray-700 mt-4">
                                        <span className="font-medium">Veri Seti Kaynağı: </span>
                                        <a 
                                            href="https://www.kaggle.com/datasets/s3programmer/flood-risk-in-india/data"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                        >
                                            Kaggle - Flood Risk in India
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="16" 
                                                height="16" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                                className="inline ml-1"
                                            >
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Veri Seti Sütunları */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Eğitim Veri Seti Sütunları</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Enlem
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Boylam
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Yağış (mm)
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Sıcaklık (°C)
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Nem (%)
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Nehir Deşarjı (m³/s)
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Su Seviyesi (m)
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Yükseklik (m)
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Arazi Örtüsü
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Toprak Tipi
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Nüfus Yoğunluğu
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Altyapı (Var/Yok)
                        </div>
                        <div className="text-gray-700 flex items-center">
                            <span className="mr-2">•</span>
                            Geçmişte Sel Oldu (Oldu/Olmadı)
                        </div>
                    </div>
                </div>

                    {/* Model Karşılaştırma Tablosu */}
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-xl font-semibold mb-4">Model Karşılaştırması</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Model</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Doğruluk</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Hassasiyet</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Geri Çağırma</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">F1 Skoru</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Eğitim Süresi</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Çıkarım Süresi</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Ölçeklenebilirlik</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Gerçek Zamanlı Uygunluk</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modelComparisonData.map((model, index) => (
                                    <tr key={index} className={model.name === 'Random Forest' ? 'bg-blue-50' : ''}>
                                        <td className="px-4 py-2 font-medium">{model.name}</td>
                                        <td className={`px-4 py-2 ${getPerformanceColor(model.accuracy)}`}>
                                            {(model.accuracy * 100).toFixed(2)}%
                                        </td>
                                        <td className={`px-4 py-2 ${getPerformanceColor(model.precision)}`}>
                                            {(model.precision * 100).toFixed(2)}%
                                        </td>
                                        <td className={`px-4 py-2 ${getPerformanceColor(model.recall)}`}>
                                            {(model.recall * 100).toFixed(2)}%
                                        </td>
                                        <td className={`px-4 py-2 ${getPerformanceColor(model.f1Score)}`}>
                                            {(model.f1Score * 100).toFixed(2)}%
                                        </td>
                                        <td className={`px-4 py-2 ${getQualitativeColor(model.trainingTime)}`}>
                                            {model.trainingTime}
                                        </td>
                                        <td className={`px-4 py-2 ${getQualitativeColor(model.inferenceTime)}`}>
                                            {model.inferenceTime}
                                        </td>
                                        <td className={`px-4 py-2 ${getQualitativeColor(model.scalability)}`}>
                                            {model.scalability}
                                        </td>
                                        <td className={`px-4 py-2 ${getQualitativeColor(model.realTimeSuitability)}`}>
                                            {model.realTimeSuitability}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Model ve Veri İşleme */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-xl font-semibold mb-4">Model ve Veri İşleme</h2>
                    <div className="prose max-w-none">
                        <p className="text-gray-600 mb-4">
                        Model, OpenWeatherMap API'sinden alınan üç temel metrik üzerinde çalışır:
                        24 saatlik toplam yağış, anlık sıcaklık ve nem. Orijinal veri setinde bulunan diğer özellikler (su seviyesi, yükseklik, 
                        arazi örtüsü vb.) API kısıtlamaları nedeniyle gerçek zamanlı tahminlerde kullanılmamaktadır.
                        </p>
                        <p className="text-gray-600 mb-4">
                        Veri ön işleme aşamasında StandardScaler kullanılarak özellikler normalize edilmektedir. 
                        RandomForest modelimiz, bu normalize edilmiş veriler üzerinde eğitilmiştir. Model, 
                        %90.23'lük bir doğruluk oranı ile diğer modeller arasında en iyi performansı göstermiştir.
                        </p>
                        <p className="text-gray-600">
                        Model, OpenWeatherMap API'sinden alınan 24 saatlik yağış verisi ve anlık hava durumu parametreleri ile
                        Türkiye'deki her şehir için sel risk tahminlerini yapabilmektedir. Bu yaklaşım, daha uzun vadeli
                        yağış verilerini dikkate alarak daha doğru risk değerlendirmesi yapmamızı sağlar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
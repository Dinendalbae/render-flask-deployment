// ModelInfoCard.js
const ModelInfoCard = () => {
  const IconCloudRain = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 1 1 0 9h-1"></path>
      <path d="M16 14v6"></path>
      <path d="M8 14v6"></path>
      <path d="M12 16v6"></path>
    </svg>
  );

  const IconThermometer = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
    </svg>
  );

  const IconDroplets = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.1c.3 1.45 1.14 2.84 2.29 3.76S18 9.1 18 10.25c0 2.22-1.8 4.05-4 4.05"></path>
    </svg>
  );

  const IconInfo = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
    </svg>
  );

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

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 my-8">
      <div className="flex items-center gap-2 mb-4">
        <IconInfo className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Risk Değerlendirme Modeli
        </h2>
      </div>
      
      <p className="text-gray-600 mb-6">
      Risk seviyesi, aşağıdaki meteorolojik parametrelerin RandomForest algoritması kullanılarak analiz edilmesiyle hesaplanmaktadır. 
      Model, yağış verisine logaritmik ağırlık vererek, sıcaklık ve nem oranını da dikkate alarak risk seviyesini belirler.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <IconCloudRain className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Yağış Miktarı</h3>
          </div>
          <p className="text-sm text-gray-600">24 saatlik toplam yağış miktarı modelin en önemli girdisidir. Yüksek yağış miktarı sel riskini önemli ölçüde artırır.</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <IconThermometer className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-800">Sıcaklık</h3>
          </div>
          <p className="text-sm text-gray-600">Hava sıcaklığı, yağışın etkisini ve buharlaşma oranını etkileyerek risk hesaplamasına katkıda bulunur.</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <IconDroplets className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-800">Nem Oranı</h3>
          </div>
          <p className="text-sm text-gray-600">Yüksek nem oranı, zemin doygunluğunu ve yağış etkisini artırarak sel riskini yükseltebilir.</p>
        </div>
      </div>

      <div className="flex gap-6 mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <IconArrowUpCircle className="w-4 h-4 text-red-500" />
          <span>Risk artırıcı faktörler: Yüksek yağış (>20mm/24s), Yüksek nem (>80%)</span>
        </div>
        <div className="flex items-center gap-2">
          <IconArrowDownCircle className="w-4 h-4 text-green-500" />
          <span>Risk azaltıcı faktörler: Düşük yağış (&lt;5mm/24s), Normal nem (40-60%)</span>
        </div>
      </div>
    </div>
  );
};
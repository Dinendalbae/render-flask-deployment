const ManualTestRoot = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [formData, setFormData] = React.useState({
      temperature: '',
      humidity: '',
      rainfall: ''
    });
    const [prediction, setPrediction] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
  
    React.useEffect(() => {
      window.showManualTest = () => setIsVisible(true);
      return () => {
        window.showManualTest = undefined;
      };
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      
      try {
        const submitData = new FormData();
        submitData.append('city', 'TEST_CITY');
        submitData.append('temperature', formData.temperature);
        submitData.append('humidity', formData.humidity);
        submitData.append('rainfall', formData.rainfall);
        
        const response = await fetch('/predict-historical', {
          method: 'POST',
          body: submitData
        });
        
        const result = await response.json();
        if (result.success) {
          setPrediction(result.probability);
        } else {
          setError(result.error || 'Tahmin yapılırken bir hata oluştu');
        }
      } catch (err) {
        setError('İstek gönderilirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const getRiskLevel = (probability) => {
      if (probability >= 80) return { level: 'Çok Yüksek', color: 'text-red-800' };
      if (probability >= 65) return { level: 'Yüksek', color: 'text-red-600' };
      if (probability >= 50) return { level: 'Orta', color: 'text-yellow-600' };
      if (probability >= 40) return { level: 'Düşük', color: 'text-green-600' };
      return { level: 'Çok Düşük', color: 'text-green-800' };
    };
  
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 9999 }}>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Manuel Sel Riski Testi</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Sıcaklık (°C)</label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nem (%)</label>
                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Yağış (mm)</label>
                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
  
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Kapat
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Tahmin Yapılıyor...' : 'Tahmin Yap'}
              </button>
            </div>
  
            {prediction !== null && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Sel Riski:</span>
                  <span className={getRiskLevel(prediction).color + " font-bold"}>
                    {`%${prediction} (${getRiskLevel(prediction).level})`}
                  </span>
                </div>
              </div>
            )}
  
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };
  
  // Ana componenti render et
  ReactDOM.render(<ManualTestRoot />, document.getElementById('manual-test-root'));
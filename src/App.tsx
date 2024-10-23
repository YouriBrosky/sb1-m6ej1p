import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuthSection } from './components/AuthSection';
import { DataDisplay } from './components/DataDisplay';
import { DeviceList } from './components/DeviceList';
import { useDevices } from './hooks/useDevices';

function App() {
  const [jwtToken, setJwtToken] = useState('');
  const { devices, error, isLoading, decodedToken, fetchDeviceData } = useDevices();

  const handleLogin = () => {
    window.open('https://iam2testingorg.b2clogin.com/iam2testingorg.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupsignin&client_id=dccb350d-0369-427a-a602-9f06434653d3&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms&scope=openid&response_type=id_token&prompt=login', '_blank');
  };

  const handleTokenSubmit = () => {
    fetchDeviceData(jwtToken);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-3xl mx-auto">
          <AuthSection
            jwtToken={jwtToken}
            onTokenChange={setJwtToken}
            onLogin={handleLogin}
            onTokenSubmit={handleTokenSubmit}
            isLoading={isLoading}
          />

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {decodedToken && (
            <DataDisplay title="Decoded Token" data={decodedToken} />
          )}

          {isLoading ? (
            <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading devices...</span>
              </div>
            </div>
          ) : devices && (
            <DeviceList devices={devices} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
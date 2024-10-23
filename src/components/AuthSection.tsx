import React, { useEffect } from 'react';
import { Lock, ExternalLink, KeyRound } from 'lucide-react';

interface AuthSectionProps {
  jwtToken: string;
  onTokenChange: (token: string) => void;
  onLogin: () => void;
  onTokenSubmit: () => void;
  isLoading: boolean;
}

export function AuthSection({ jwtToken, onTokenChange, onLogin, onTokenSubmit, isLoading }: AuthSectionProps) {

  // Extract id_token from URL fragment on component mount
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // Remove the leading '#'
    const idToken = params.get('id_token');
    if (idToken) {
      onTokenChange(idToken);
    }
  }, [onTokenChange]);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
      <div className="flex items-center mb-4">
        <Lock className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">Authentication</h2>
      </div>
      
      <button
        onClick={onLogin}
        disabled={isLoading}
        className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg mb-6 transition duration-150"
      >
        <ExternalLink className="h-5 w-5 mr-2" />
        Login with Azure B2C
      </button>

      <div className="space-y-4">
        <div>
          <label htmlFor="jwt" className="block text-sm font-medium text-gray-700 mb-2">
            JWT Token
          </label>
          <textarea
            id="jwt"
            value={jwtToken}
            onChange={(e) => onTokenChange(e.target.value)}
            disabled={isLoading}
            className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Paste your JWT token here..."
          />
        </div>

        <button
          onClick={onTokenSubmit}
          disabled={!jwtToken || isLoading}
          className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-150"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <KeyRound className="h-5 w-5 mr-2" />
              Get Device Data
            </>
          )}
        </button>
      </div>
    </div>
  );
}

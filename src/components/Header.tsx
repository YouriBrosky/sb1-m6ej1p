import React from 'react';
import { Thermometer } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <Thermometer className="h-12 w-12 text-blue-600 mr-2" />
        <h1 className="text-4xl font-bold text-gray-800">Heat Pump Portal</h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Welcome to the next generation of heat pump management. Secure access to your devices through our new IAM system.
      </p>
    </header>
  );
}
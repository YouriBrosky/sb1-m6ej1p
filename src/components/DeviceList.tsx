import React from 'react';
import { DeviceData } from '../types';
import { Thermometer } from 'lucide-react';

interface DeviceListProps {
  devices: DeviceData[];
}

export function DeviceList({ devices }: DeviceListProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Thermometer className="h-5 w-5 text-blue-600 mr-2" />
        Heat Pump Devices
      </h3>
      
      <div className="grid gap-4">
        {devices.map((device, index) => (
          <div
            key={`${device.name}-${index}`}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{device.name}</h4>
                <p className="text-sm text-gray-600">{device.customer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {devices.length === 0 && (
        <p className="text-gray-500 text-center py-4">No devices found</p>
      )}
    </div>
  );
}
import React from 'react';

interface DataDisplayProps {
  title: string;
  data: Record<string, any> | null;
}

export function DataDisplay({ title, data }: DataDisplayProps) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-60">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
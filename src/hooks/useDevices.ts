import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { DeviceData, DecodedToken } from '../types';
import { fetchDevices } from '../services/api';
import { jwtDecode } from 'jwt-decode';

export function useDevices() {
  const [devices, setDevices] = useState<DeviceData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  const fetchDeviceData = async (token: string) => {
    try {
      setError(null);
      setDevices(null);
      setIsLoading(true);
      
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);

      const data = await fetchDevices(token);
      setDevices(data);
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      
      if (err instanceof Error) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError;
          if (axiosError.code === 'ECONNABORTED') {
            errorMessage = 'Request timed out. Please try again.';
          } else if (axiosError.response?.status === 401) {
            errorMessage = 'Invalid or expired token. Please login again.';
          } else if (axiosError.response?.status === 403) {
            errorMessage = 'You do not have permission to access this resource.';
          } else if (!axiosError.response) {
            errorMessage = 'Network error. Please check your connection and try again.';
          } else {
            errorMessage = axiosError.response?.data?.message || axiosError.message;
          }
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      console.error('Error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    devices,
    error,
    isLoading,
    decodedToken,
    fetchDeviceData,
  };
}
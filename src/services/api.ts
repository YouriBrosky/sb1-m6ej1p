import axios from 'axios';
import { DeviceData } from '../types';

const API_URL = 'https://devices-api-dev-gateway-gmf6h8dvduatf6d9.westeurope-01.azurewebsites.net/Device';

export async function fetchDevices(token: string): Promise<DeviceData[]> {
  const response = await axios.get<DeviceData[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 5000,
  });

  return response.data;
}
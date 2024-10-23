export interface DeviceData {
  name: string;
  customer: string;
}

export interface DecodedToken {
  sub?: string;
  name?: string;
  email?: string;
  exp?: number;
  [key: string]: any;
}
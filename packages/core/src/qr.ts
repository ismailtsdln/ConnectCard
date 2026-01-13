import { WifiConfig } from './schema.js';

/**
 * Generates a Wi-Fi connection string compatible with QR scanners.
 * Format: WIFI:S:<SSID>;T:<TYPE>;P:<PASSWORD>;H:<HIDDEN>;;
 */
export function generateWifiString(config: WifiConfig): string {
  const { ssid, password, security, hidden } = config;
  
  // Escaping special characters: \ , ; :
  const escape = (str: string) => str.replace(/([\\,;:])/g, '\\$1');

  let wifiString = `WIFI:S:${escape(ssid)};`;
  
  if (security !== 'nopass') {
    wifiString += `T:${security};`;
  }
  
  if (password) {
    wifiString += `P:${escape(password)};`;
  }
  
  if (hidden) {
    wifiString += `H:true;`;
  }
  
  wifiString += ';';
  
  return wifiString;
}

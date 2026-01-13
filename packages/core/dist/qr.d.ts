import { WifiConfig } from './schema.js';
/**
 * Generates a Wi-Fi connection string compatible with QR scanners.
 * Format: WIFI:S:<SSID>;T:<TYPE>;P:<PASSWORD>;H:<HIDDEN>;;
 */
export declare function generateWifiString(config: WifiConfig): string;

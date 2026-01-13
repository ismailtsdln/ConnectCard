import { describe, it, expect } from 'vitest';
import { generateWifiString } from './qr.js';

describe('generateWifiString', () => {
  it('should generate a simple WPA string', () => {
    const config = { ssid: 'MyHome', password: 'password123', security: 'WPA' as const, hidden: false };
    const result = generateWifiString(config);
    expect(result).toBe('WIFI:S:MyHome;T:WPA;P:password123;;');
  });

  it('should escape special characters', () => {
    const config = { ssid: 'My;Network', password: 'pass:word', security: 'WPA' as const, hidden: false };
    const result = generateWifiString(config);
    expect(result).toBe('WIFI:S:My\\;Network;T:WPA;P:pass\\:word;;');
  });

  it('should handle nopass', () => {
    const config = { ssid: 'FreeWifi', security: 'nopass' as const, hidden: false };
    const result = generateWifiString(config);
    expect(result).toBe('WIFI:S:FreeWifi;;');
  });
});

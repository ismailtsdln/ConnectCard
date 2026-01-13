import { z } from 'zod';
export const WifiSecuritySchema = z.enum(['WPA', 'WEP', 'nopass']);
export const WifiConfigSchema = z.object({
    ssid: z.string().min(1, 'SSID is required').max(32, 'SSID must be 32 characters or less'),
    password: z.string().optional(),
    security: WifiSecuritySchema.default('WPA'),
    hidden: z.boolean().default(false),
});

import { z } from 'zod';
export declare const WifiSecuritySchema: z.ZodEnum<{
    WPA: "WPA";
    WEP: "WEP";
    nopass: "nopass";
}>;
export declare const WifiConfigSchema: z.ZodObject<{
    ssid: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
    security: z.ZodDefault<z.ZodEnum<{
        WPA: "WPA";
        WEP: "WEP";
        nopass: "nopass";
    }>>;
    hidden: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type WifiConfig = z.infer<typeof WifiConfigSchema>;
export type WifiSecurity = z.infer<typeof WifiSecuritySchema>;

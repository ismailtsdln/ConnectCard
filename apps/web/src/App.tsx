import React, { useState, useEffect } from 'react';
import { generateWifiString } from '@connectcard/core';
import type { WifiConfig, WifiSecurity } from '@connectcard/core';
import QRCode from 'qrcode';
import { 
  Wifi, 
  Lock, 
  Eye, 
  EyeOff, 
  Download, 
  Share2, 
  Moon, 
  Sun,
  Type,
  Shield
} from 'lucide-react';

function App() {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState<WifiSecurity>('WPA');
  const [hidden, setHidden] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const generateQR = async () => {
      if (!ssid) {
        setQrDataUrl('');
        return;
      }
      
      const config: WifiConfig = { ssid, password, security, hidden };
      const wifiString = generateWifiString(config);
      
      try {
        const url = await QRCode.toDataURL(wifiString, {
          width: 800,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error(err);
      }
    };

    generateQR();
  }, [ssid, password, security, hidden]);

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `wifi-qr-${ssid}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <header className="w-full max-w-5xl flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-600 rounded-xl text-white shadow-lg shadow-primary-600/20">
            <Wifi size={24} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
            ConnectCard
          </h1>
        </div>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <section className="space-y-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Network Details</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Enter your Wi-Fi credentials to generate a secure QR code.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Type size={16} className="text-primary-500" /> SSID (Network Name)
              </label>
              <input 
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="e.g. My Home Wi-Fi"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Shield size={16} className="text-primary-500" /> Security Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['WPA', 'WEP', 'nopass'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSecurity(type as WifiSecurity)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      security === type 
                        ? 'bg-primary-600 text-white shadow-md' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {type === 'nopass' ? 'None' : type}
                  </button>
                ))}
              </div>
            </div>

            {security !== 'nopass' && (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Lock size={16} className="text-primary-500" /> Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter network password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="hidden"
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="hidden" className="text-sm text-slate-600 dark:text-slate-400">
                Hidden Network
              </label>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="flex flex-col items-center justify-center space-y-8 italic">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700 min-w-[300px] min-h-[300px] flex items-center justify-center">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Wi-Fi QR Code" className="w-full h-auto max-w-[300px]" />
              ) : (
                <div className="text-center space-y-4 text-slate-400">
                  <Wifi size={64} className="mx-auto opacity-20" />
                  <p className="text-sm italic">Enter SSID to see preview</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              disabled={!qrDataUrl}
              onClick={downloadQR}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                qrDataUrl 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 hover:scale-105 active:scale-95' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Download size={20} /> Download PNG
            </button>
            <button 
              disabled={!qrDataUrl}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <Share2 size={20} />
            </button>
          </div>
        </section>
      </main>

      <footer className="mt-20 text-slate-400 text-sm flex flex-col items-center gap-4">
        <p>&copy; 2026 ConnectCard. Built with TypeScript & React.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary-500 transition-colors">Documentation</a>
          <span>•</span>
          <a href="#" className="hover:text-primary-500 transition-colors">CLI Tool</a>
          <span>•</span>
          <a href="#" className="hover:text-primary-500 transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

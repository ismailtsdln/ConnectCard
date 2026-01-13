import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          title: 'ConnectCard',
          subtitle: 'Network Details',
          desc: 'Enter your Wi-Fi credentials to generate a secure QR code.',
          ssid_label: 'SSID (Network Name)',
          ssid_placeholder: 'e.g. My Home Wi-Fi',
          security_label: 'Security Type',
          password_label: 'Password',
          password_placeholder: 'Enter network password',
          hidden_label: 'Hidden Network',
          download_png: 'PNG',
          download_pdf: 'PDF',
          preview_placeholder: 'Enter SSID to see preview',
          footer: 'Build with TypeScript & React.',
        }
      },
      tr: {
        translation: {
          title: 'ConnectCard',
          subtitle: 'Ağ Detayları',
          desc: 'Güvenli bir QR kodu oluşturmak için Wi-Fi bilgilerinizi girin.',
          ssid_label: 'SSID (Ağ Adı)',
          ssid_placeholder: 'ör. Ev Wi-Fi Ağım',
          security_label: 'Güvenlik Tipi',
          password_label: 'Şifre',
          password_placeholder: 'Ağ şifresini girin',
          hidden_label: 'Gizli Ağ',
          download_png: 'PNG',
          download_pdf: 'PDF',
          preview_placeholder: 'Önizleme için SSID girin',
          footer: 'TypeScript ve React ile geliştirildi.',
        }
      }
    }
  });

export default i18n;

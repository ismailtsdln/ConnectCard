import { jsPDF } from 'jspdf';
import { WifiConfig } from './schema.js';

export async function generateWifiPdf(config: WifiConfig, qrDataUrl: string): Promise<Uint8Array> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Card dimensions and position (roughly center of A4)
  const cardWidth = 100;
  const cardHeight = 140;
  const x = (210 - cardWidth) / 2;
  const y = (297 - cardHeight) / 2;

  // Draw card border
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(x, y, cardWidth, cardHeight, 5, 5, 'S');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(2, 132, 199); // Blue-600
  doc.text('ConnectCard', x + cardWidth / 2, y + 15, { align: 'center' });

  // SSID
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Wi-Fi Network:', x + 10, y + 30);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(config.ssid, x + 10, y + 37);

  // Password (if applicable)
  if (config.security !== 'nopass' && config.password) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Password:', x + 10, y + 50);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(config.password, x + 10, y + 57);
  }

  // QR Code
  doc.addImage(qrDataUrl, 'PNG', x + 10, y + 70, 80, 80);

  // Footer instructions
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  doc.text('Scan this QR code with your camera to connect automatically.', x + cardWidth / 2, y + cardHeight - 10, { align: 'center' });

  return new Uint8Array(doc.output('arraybuffer'));
}

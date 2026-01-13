#!/usr/bin/env node
import { Command } from 'commander';
import { generateWifiString, WifiConfigSchema } from '@connectcard/core';
import pc from 'picocolors';
import { intro, outro, text, select, confirm, spinner } from '@clack/prompts';
import QRCode from 'qrcode';
import fs from 'node:fs';
import path from 'node:path';

const program = new Command();

program
  .name('connectcard')
  .description('Generate Wi-Fi QR cards')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a Wi-Fi QR code image')
  .option('-s, --ssid <type>', 'Wi-Fi SSID')
  .option('-p, --password <type>', 'Wi-Fi Password')
  .option('-t, --type <type>', 'Security type (WPA, WEP, nopass)', 'WPA')
  .option('-o, --output <path>', 'Output file path', 'wifi-qr.png')
  .action(async (options) => {
    intro(pc.cyan(' ConnectCard '));

    let ssid = options.ssid;
    let password = options.password;
    let security = options.type;

    if (!ssid) {
      ssid = await text({
        message: 'Enter Wi-Fi SSID:',
        validate: (value) => {
          if (!value) return 'SSID is required';
        },
      });
    }

    if (security !== 'nopass' && !password) {
      password = await text({
        message: 'Enter Wi-Fi Password:',
        placeholder: 'Leave blank for no password',
      });
    }

    const config = {
      ssid,
      password,
      security,
    };

    const validation = WifiConfigSchema.safeParse(config);

    if (!validation.success) {
      outro(pc.red('Validation failed: ' + validation.error.message));
      process.exit(1);
    }

    const wifiString = generateWifiString(validation.data as any);
    const s = spinner();
    s.start('Generating QR code...');
    
    try {
      await QRCode.toFile(options.output, wifiString, {
        width: 600,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      s.stop('QR code generated successfully!');
      outro(pc.green(`✓ Saved to ${options.output}`));
    } catch (err: any) {
      s.stop('Failed to generate QR code');
      outro(pc.red(`Error: ${err.message}`));
      process.exit(1);
    }
  });

program.parse();

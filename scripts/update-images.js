const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function updateHrmsDashboard() {
  const srcPath = path.join(__dirname, '../public/images/products/hrms-dashboard.jpg');
  const backupPath = path.join(__dirname, '../public/images/products/hrms-dashboard.orig.jpg');

  const markBuf = await sharp(path.join(__dirname, '../public/logo-mark.png'))
    .resize(17, 17)
    .png()
    .toBuffer();

  const logoLightBuf = await sharp(path.join(__dirname, '../public/logo-light.png'))
    .resize({ height: 26 })
    .png()
    .toBuffer();

  // 1. Tab overlay - pure white active tab
  const tabSvg = Buffer.from(`
    <svg width="185" height="26" xmlns="http://www.w3.org/2000/svg">
      <rect width="185" height="26" fill="#ffffff" />
      <text x="24" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" fill="#2d3142">Uptrix HRMS — Dashboard</text>
    </svg>
  `);

  // 2. URL bar overlay - pure white address bar
  const urlSvg = Buffer.from(`
    <svg width="280" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="24" fill="#ffffff" />
      <g fill="none" stroke="#64748b" stroke-width="1.3" transform="translate(2, 4)">
        <rect x="1" y="5" width="10" height="8" rx="1.5" fill="#64748b" />
        <path d="M3 5V3.5a3 3 0 0 1 6 0V5" stroke="#64748b" fill="none" />
      </g>
      <text x="22" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12.5" fill="#334155">https://app.uptrix.com/hrms/dashboard</text>
    </svg>
  `);

  // 3. Sidebar logo overlay - matches sidebar background
  const sidebarSvg = Buffer.from(`
    <svg width="170" height="48" xmlns="http://www.w3.org/2000/svg">
      <rect width="170" height="48" fill="#14133d" />
    </svg>
  `);

  await sharp(backupPath)
    .composite([
      // Browser tab
      { input: tabSvg, left: 115, top: 9 },
      { input: markBuf, left: 118, top: 13 },
      // Browser URL bar
      { input: urlSvg, left: 95, top: 43 },
      // Sidebar logo
      { input: sidebarSvg, left: 18, top: 85 },
      { input: logoLightBuf, left: 22, top: 95 },
    ])
    .sharpen({ sigma: 0.8, m1: 1.0, m2: 0.5 })
    .jpeg({ quality: 96 })
    .toFile(srcPath);

  console.log('Successfully updated hrms-dashboard.jpg with Uptrix branding');
}

async function updateCrmPipeline() {
  const srcPath = path.join(__dirname, '../public/images/products/crm-pipeline.jpg');
  const backupPath = path.join(__dirname, '../public/images/products/crm-pipeline.orig.jpg');

  const markBuf = await sharp(path.join(__dirname, '../public/logo-mark.png'))
    .resize(17, 17)
    .png()
    .toBuffer();

  const logoLightBuf = await sharp(path.join(__dirname, '../public/logo-light.png'))
    .resize({ height: 26 })
    .png()
    .toBuffer();

  // 1. Tab overlay - pure white active tab
  const tabSvg = Buffer.from(`
    <svg width="155" height="26" xmlns="http://www.w3.org/2000/svg">
      <rect width="155" height="26" fill="#ffffff" />
      <text x="24" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" fill="#1f2937">Uptrix CRM</text>
    </svg>
  `);

  // 2. URL bar overlay
  const urlSvg = Buffer.from(`
    <svg width="245" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect width="245" height="24" fill="#ffffff" />
      <g fill="none" stroke="#64748b" stroke-width="1.3" transform="translate(2, 4)">
        <rect x="1" y="5" width="10" height="8" rx="1.5" fill="#64748b" />
        <path d="M3 5V3.5a3 3 0 0 1 6 0V5" stroke="#64748b" fill="none" />
      </g>
      <text x="22" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12.5" fill="#334155">https://app.uptrix.com/crm/pipeline</text>
    </svg>
  `);

  // 3. Sidebar overlay - matches sidebar background
  const sidebarSvg = Buffer.from(`
    <svg width="155" height="48" xmlns="http://www.w3.org/2000/svg">
      <rect width="155" height="48" fill="#152132" />
    </svg>
  `);

  // Enhanced clarity: brighten + boost contrast + sharpen for crisp readability
  await sharp(backupPath)
    .modulate({ brightness: 1.15, saturation: 1.18 })
    .sharpen({ sigma: 1.1, m1: 1.4, m2: 0.5 })
    .composite([
      // Browser tab
      { input: tabSvg, left: 72, top: 9 },
      { input: markBuf, left: 74, top: 14 },
      // Browser URL bar
      { input: urlSvg, left: 92, top: 43 },
      // Sidebar logo
      { input: sidebarSvg, left: 45, top: 82 },
      { input: logoLightBuf, left: 50, top: 92 },
    ])
    .jpeg({ quality: 96 })
    .toFile(srcPath);

  console.log('Successfully updated crm-pipeline.jpg with enhanced clarity and Uptrix branding');
}

async function main() {
  await updateHrmsDashboard();
  await updateCrmPipeline();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

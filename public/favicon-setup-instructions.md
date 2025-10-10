# Favicon Setup Instructions

## Current Status
✅ HTML favicon links have been added to `index.html`
✅ Web manifest file created at `public/site.webmanifest`
❌ Favicon image files need to be generated

## Required Favicon Files
The following files need to be created in the `public/` directory:

1. `favicon.ico` (16x16, 32x32, 48x48 sizes in one file)
2. `favicon-16x16.png`
3. `favicon-32x32.png`
4. `apple-touch-icon.png` (180x180)
5. `android-chrome-192x192.png`
6. `android-chrome-512x512.png`

## How to Generate Favicon Files

### Option 1: Using favicon.io (Recommended)
1. Go to https://favicon.io/
2. Click "PNG to ICO"
3. Upload your logo file: `src/assets/fw-logo.png`
4. Download the generated favicon package
5. Extract and copy all files to the `public/` directory

### Option 2: Using RealFaviconGenerator
1. Go to https://realfavicongenerator.net/
2. Upload your logo file: `src/assets/fw-logo.png`
3. Customize settings if needed
4. Generate and download the favicon package
5. Copy all files to the `public/` directory

## What's Already Configured

### HTML Head (in index.html)
```html
<!-- Favicon Configuration -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#8b5cf6" />
```

### Web Manifest (site.webmanifest)
- App name: "Agência FW Digital - Fábrica de Software"
- Short name: "FW Digital"
- Theme color: #8b5cf6 (purple from your brand)
- Background color: #ffffff

## After Adding Favicon Files
1. Clear browser cache
2. Test the favicon appears in browser tabs
3. Test on mobile devices (home screen icon)
4. Verify PWA manifest works correctly

## Notes
- The theme color (#8b5cf6) matches your brand's purple color
- All modern browsers and devices are supported
- PWA (Progressive Web App) ready configuration

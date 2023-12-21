// pages/api/convertWebsiteToPDF.js

import puppeteer from 'puppeteer';

export default async function convertWebsiteToPDF(url) {
  if (!url) {
    throw new Error('URL is required');
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Adjust as needed based on your website's structure
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    return pdfBuffer;
  } catch (error) {
    console.error('Error converting website to PDF:', error);
    throw new Error('Internal Server Error');
  } finally {
    await browser.close();
  }
}

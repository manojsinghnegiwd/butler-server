import puppeteer from "puppeteer";

export const getYoutubeTranscript = async (url: string) => {
    const youtubeId = url.split('v=')[1];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://youtubetranscript.com/?v=${youtubeId}`);

    // Wait for the loading text to be shown
    await page.waitForSelector('#demo', { visible: true });

    const demoElement = await page.$('#demo');
    const text = await (await demoElement.getProperty('textContent')).jsonValue()

    await browser.close();

    return text;
}
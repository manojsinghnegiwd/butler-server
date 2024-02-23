import { generate, streamToString } from "../../../utils/OpenAI";

export default eventHandler(async (event) => {
    const { seed } = await readBody(event);

    if (!seed) {
        throw new Error('Missing seed');
    }

    const transcript = await getYoutubeTranscript(seed);

    const prompt = `
        Youtube video transcript:
        
        ${transcript}

        ========================

        From the above youtube video transcript generate a summary.

        * Make sure the summary is a good representation of the video.
        * Make sure to use formatting when needed.
    `;

    return { response: await generate(prompt) }
})

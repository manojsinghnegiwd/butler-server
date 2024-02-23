import { generate, streamToString } from "../../../utils/OpenAI";

export default eventHandler(async (event) => {
    const { seed } = await readBody(event);

    if (!seed) {
        throw new Error('Missing seed');
    }

    const prompt = `
        short story seed: ${seed}

        ========================

        From the above seed generate a short story and return:

        Title: the title of the story,
        Story: the story itself
    `;

    return { response: await generate(prompt) }
})

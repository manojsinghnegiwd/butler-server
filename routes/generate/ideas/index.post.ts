import { generate } from "../../../utils/OpenAI";

export default eventHandler(async (event) => {
    const { seed } = await readBody(event);

    if (!seed) {
        throw new Error('Missing seed');
    }

    const prompt = `
        idea seed: ${seed}

        ========================

        From the above seed generate 5 new ideas.
    `;

    return { response: await generate(prompt) }
})

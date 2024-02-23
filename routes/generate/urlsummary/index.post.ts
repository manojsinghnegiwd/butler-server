import { extract } from "@extractus/article-extractor";

export default eventHandler(async (event) => {
    const { seed } = await readBody(event);

    if (!seed) {
        throw new Error('Missing seed');
    }

    try {
        const page = await extract(seed);
    
        if (page) {
            const { title, content } = page;
            
            const prompt = `
                Summarise the following article:

                ========================
                
                Title: ${title}
                
                Content: ${content}
            `;

            return { response: await generate(prompt) }

        } else {
            throw new Error('Failed to extract article');
        }
    } catch (error) {
        throw new Error('Failed to extract article');
    }
})


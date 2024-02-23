import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAPI_KEY,
});

export const generate = async function (prompt) {
    const messages = [
        {
            role: 'user',
            content: prompt
        }
    ]

    const response_string = await streamToString(talkToOpenAI(messages));
    return response_string;
}

export const talkToOpenAI = async function* (messages) {
    const stream = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo-16k',
        stream: true,
    });

    for await (const chunk of stream) {
        yield chunk.choices[0]?.delta?.content || '';
    }
}

export const streamToString = async (stream) => {
    let response_string = '';

    for await (const message of stream) {
        for (const letter of message) {
            response_string += letter;
        }
    }

    return response_string;
}
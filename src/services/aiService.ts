import Config from 'react-native-config';

const GEMINI_API_KEY = Config.GEMINI_API_KEY;

export const askAI = async (question: string) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `
You are Dev, a helpful React Native development assistant.
Explain concepts clearly and practically.
Provide production-ready code when requested.
Explain why, when, and how to use each approach.
                `,
              },
            ],
          },
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: question,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API request failed');
    }

    return (
      data.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || '')
        .join('') || ''
    );
  } catch (error) {
    console.error('Gemini AI Error:', error);
    throw error;
  }
};

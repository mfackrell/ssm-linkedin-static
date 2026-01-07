import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateLinkedinCaption(topic) {
  console.log(`Generating LinkedIn caption for topic: "${topic}"`);

  // 1. Define the Persona
  const systemPrompt = `
You are a content strategist for QuickAsset.
You are writing a LinkedIn post based on the "Lighter, Not Louder" philosophy.
`;

  // 2. Define the Task
  const userPrompt = `
  Topic: ${topic}
  INPUT LINK: https://quickasset.vercel.app/

  YOUR TASK:
  1. Analyze the INPUT HEADLINE to identify the specific professional audience or asset implied.
  2. Write a LinkedIn post (150-250 words) that treats the digital asset as a serious productivity tool.

  STRUCTURE:
  1. The Professional Insight: Start with a counter-intuitive observation about the specific industry work. (e.g., "Great architecture isn't just about design; it's about file management.")
  2. The Asset Validation: Acknowledge that the "boring" file they use every day is actually their most valuable intellectual property.
  3. The Market Reality: Remind them that junior professionals or peers are actively looking for this exact template/tool to save time.
  4. The Solution: "You can productize this in minutes."
  5. The Link: Place the link on its own line at the bottom.

  TONE & STYLE:
  - Professional, clear, and calm.
  - No "Bro-etry" (one-line paragraphs). Use standard paragraphs.
  - No "Hustle" language ("Crush it", "10x").
  - Use minimal, clean emojis if needed (only 1-2 max).

  OUTPUT FORMAT:
  Return ONLY the post text.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7, 
    });

    const caption = completion.choices[0].message.content;
    
    console.log("\n=== LINKEDIN RESPONSE START ===");
    console.log(caption);
    console.log("=== LINKEDIN RESPONSE END ===\n");
    
    return caption;

  } catch (error) {
    console.error("Error generating LinkedIn caption:", error);
    throw new Error("Failed to generate LinkedIn caption.");
  }
}

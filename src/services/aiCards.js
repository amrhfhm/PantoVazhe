import { baseCards } from '../data/baseCards.js';

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export async function generateAICards(count = 40) {
  if (!ANTHROPIC_API_KEY) {
    console.warn('No Anthropic API key found, falling back to base cards');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `${count} کارت بازی کلمه به فارسی بساز. هر کارت شامل: کلمه فارسی، توضیح ۲-۳ جمله‌ای، دسته‌بندی (از میان: اشخاص، مکان‌ها، حیوانات، اشیا، مفاهیم، سرگرمی، غذا)، و امتیاز (۱ یا ۳ — برای کلمات سخت‌تر ۳ بده).

فقط JSON خالص برگردون بدون توضیح اضافه:
[{"id":"ai1","word":"...","description":"...","category":"...","points":1,"source":"ai"}]`,
          },
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Extract JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found in response');

    const cards = JSON.parse(jsonMatch[0]);
    return cards;
  } catch (err) {
    clearTimeout(timeoutId);
    console.error('AI cards generation failed:', err);
    return null;
  }
}

export function getFallbackCards() {
  return [...baseCards];
}

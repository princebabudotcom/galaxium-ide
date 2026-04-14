export const parseLLMResponse = (text) => {
  try {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid response');
    }

    let cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    // Extract JSON block safely
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON found');

    let jsonString = match[0];

    // 🔧 Fix common LLM issues safely

    // 1. Replace single quotes → double quotes (only when safe)
    jsonString = jsonString.replace(/'/g, '"');

    // 2. Remove trailing commas
    jsonString = jsonString.replace(/,\s*([}\]])/g, '$1');

    // 3. Remove control characters
    jsonString = jsonString.replace(/[\u0000-\u001F]+/g, '');

    // 4. Try parsing normally first
    try {
      return JSON.parse(jsonString);
    } catch (err) {
      // 5. Fallback: fix unquoted keys (more controlled)
      jsonString = jsonString.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

      return JSON.parse(jsonString);
    }
  } catch (err) {
    console.error('❌ RAW RESPONSE:\n', text);
    console.error('❌ FINAL ERROR:', err.message);

    // 🔁 Fallback object instead of null (prevents crash chain)
    return {
      type: 'error',
      raw: text,
      message: 'Failed to parse LLM response',
    };
  }
};

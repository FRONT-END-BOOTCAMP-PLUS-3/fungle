/**
 * Response 본문이 비어 있거나 JSON이 아닐 때 발생하는
 * "Failed to execute 'json' on 'Response': Unexpected end of JSON input" 방지
 */
export async function safeParseJson<T = unknown>(
  response: Response
): Promise<T | null> {
  const text = await response.text();
  if (!text.trim()) {
    return null;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

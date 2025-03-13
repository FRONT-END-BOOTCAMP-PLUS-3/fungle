export const getParamsFromRequest = (
  request: Request,
  paramKeys: string[]
): Record<string, string | null> => {
  const urlParts = request.url.split("/").filter(Boolean);
  const params: Record<string, string | null> = {};

  const numericValues = urlParts.filter((part) => /^\d+$/.test(part));

  paramKeys.forEach((key, index) => {
    params[key] = numericValues[index] || null;
  });

  return params;
};

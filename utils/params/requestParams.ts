export const getParamsFromRequest = (
  request: Request,
  paramKeys: string[]
): Record<string, string | null> => {
  const urlParts = request.url.split("/");
  const params: Record<string, string | null> = {};

  paramKeys.forEach((key, index) => {
    params[key] = urlParts[urlParts.length - paramKeys.length + index] || null;
  });

  return params;
};

export const capitalizeEachWord = (str: string): string => {
  if (isUUID(str)) {
    return str;
  }
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const isUUID = (str: string) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

export const getAbbreviation = (input?: string): string => {
  if (!input) {
    return "";
  }
  return input.replace(/[a-z]/g, "");
};

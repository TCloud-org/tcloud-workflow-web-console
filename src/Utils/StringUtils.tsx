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

export const maskPhoneNumber = (value: string, format: string) => {
  let formattedNumber = value;

  formattedNumber = formattedNumber.replace(/\D/g, "");

  let formattedIndex = 0;
  let result = "";

  for (let i = 0; i < format.length; i++) {
    if (format[i] === "9") {
      if (formattedIndex < formattedNumber.length) {
        result += formattedNumber[formattedIndex];
        formattedIndex++;
      } else {
        break;
      }
    } else {
      result += format[i];
    }
  }

  return result;
};

export const unmaskPhoneNumber = (str: string) => {
  const numbers = str.match(/\d+/g);
  if (!numbers) return "";

  return numbers.join("");
};

export const isLastCharacterNotANumber = (str: string) => {
  return /\D$/.test(str);
};

export const extractKeywordsFromString = (input: string): string[] => {
  const matches = input.match(/\${(.*?)}/g);
  if (!matches) return [];

  const keywords = matches.map((match) => match.substring(2, match.length - 1));
  return Array.from(new Set(keywords));
};

export const replacePlaceholders = (
  input: string,
  replacements: { [key: string]: string }
): string => {
  let result = input;
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(`\\$\\{${key}\\}`, "g");
    result = result.replace(regex, value);
  });
  return result;
};

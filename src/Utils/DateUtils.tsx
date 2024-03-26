export const formatDate = (data: number | string | undefined) => {
  if (!data) return undefined;

  let time = parseInt(data.toString());
  if (isUnixTimestamp(data)) {
    time *= 1000;
  }
  const date = new Date(time);

  const locale = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return locale.split(", ").join(" ").split("/").join("-");
};

export const formatDateString = (data: string | undefined) => {
  if (!data) return undefined;

  const date = new Date(data);

  const locale = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return locale.split(", ").join(" ").split("/").join("-");
};

export const isUnixTimestamp = (value: any) => {
  if (typeof value !== "number" || isNaN(value)) {
    return false;
  }

  const minUnixTimestamp = 0;
  const maxUnixTimestamp = 2147483647;
  return value >= minUnixTimestamp && value <= maxUnixTimestamp;
};

export const isDateBeforeNow = (date: number | string | undefined) => {
  if (!date) return undefined;

  let time = new Date(date);
  if (isUnixTimestamp(date)) {
    time = new Date(parseInt(date.toString()) * 1000);
  }
  return time.getTime() < Date.now();
};

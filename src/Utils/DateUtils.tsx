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

export const formatTime = (timeInMinutes: number | string) => {
  let minutes = parseFloat(timeInMinutes.toString());
  if (minutes === 0) {
    return "0 minute";
  }
  const days = Math.floor(minutes / (60 * 24));
  const remainingHours = Math.floor((minutes % (60 * 24)) / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  const seconds = Math.round((minutes - Math.floor(minutes)) * 60);

  let formattedTime = "";

  if (days > 0) {
    formattedTime += `${days} day${days > 1 ? "s" : ""} `;
  }
  if (remainingHours > 0) {
    formattedTime += `${remainingHours} hour${remainingHours > 1 ? "s" : ""} `;
  }

  if (days > 0 && remainingHours > 0) {
    return formattedTime.trim();
  }

  if (remainingMinutes > 0) {
    formattedTime += `${remainingMinutes} minute${
      remainingMinutes > 1 ? "s" : ""
    } `;
  }

  if (remainingHours > 0 && remainingMinutes > 0) {
    return formattedTime.trim();
  }

  if (seconds > 0) {
    formattedTime += `${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return formattedTime.trim();
};

export const formatTimeShort = (timeInMinutes: number | string) => {
  let minutes = parseFloat(timeInMinutes.toString());
  if (minutes === 0) {
    return "0m";
  }
  const days = Math.floor(minutes / (60 * 24));
  const remainingHours = Math.floor((minutes % (60 * 24)) / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  const seconds = Math.round((minutes - Math.floor(minutes)) * 60);

  let formattedTime = "";

  if (days > 0) {
    formattedTime += `${days}d `;
  }
  if (remainingHours > 0) {
    formattedTime += `${remainingHours}h `;
  }

  if (remainingMinutes > 0) {
    formattedTime += `${remainingMinutes}m`;
  }

  if (seconds > 0) {
    formattedTime += `${seconds}s`;
  }

  return formattedTime.trim();
};

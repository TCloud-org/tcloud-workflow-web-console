export const formatDate = (data: number | string | undefined) => {
  if (!data) return undefined;

  let time = parseInt(data.toString());
  if (isUnixTimestamp(data)) {
    time *= 1000;
  }
  const date = new Date(time);

  const utcString = date.toISOString();
  const utcDate = utcString.split("T")[0];
  const utcTime = utcString.split("T")[1].split(".")[0];

  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;
  const offsetSign = timezoneOffset >= 0 ? "+" : "-";

  const utcOffset = `UTC${offsetSign}${offsetHours
    .toString()
    .padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;

  return `${utcDate} ${utcTime} (${utcOffset})`;
};

export const formatDateString = (data: string | undefined) => {
  if (!data) return undefined;

  const date = new Date(data);

  const utcString = date.toISOString();
  const utcDate = utcString.split("T")[0];
  const utcTime = utcString.split("T")[1].split(".")[0];

  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;
  const offsetSign = timezoneOffset >= 0 ? "+" : "-";

  const utcOffset = `UTC${offsetSign}${offsetHours
    .toString()
    .padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;

  return `${utcDate} ${utcTime} (${utcOffset})`;
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
    formattedTime += `${remainingMinutes}m `;
  }

  if (seconds > 0) {
    formattedTime += `${seconds}s`;
  }

  return formattedTime.trim();
};

export const getTime = (data: any) => {
  if (!data) return undefined;

  let time = parseInt(data.toString());
  if (isUnixTimestamp(data)) {
    time *= 1000;
  }

  const result = new Date(time).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  return result;
};

export const prettifyDate = (dateString: string): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const addOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const ordinalDay = addOrdinalSuffix(day);

  return `${month} ${ordinalDay}, ${year}`;
};

export const prettifyDateWithoutYear = (dateString: string): string => {
  const s = formatDate(dateString) || "";
  const date = prettifyDate(s);
  return date.split(",")[0];
};

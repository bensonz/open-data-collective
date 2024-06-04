import ms from "ms";

/**
 * Regex for email
 *
 * @description: test email
 * @param email  email as string
 * @returns boolean
 */
export const regexTestEmail = (email: string) => {
  if (email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  return false;
};

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};
/**
 * How long ago was the timestamp
 * @param timestamp - The timestamp to compare
 * @param timeOnly
 * @returns
 */
export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export const sizeToString = (size: number, precision = 0): string => {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(precision)} ${sizes[i]}`;
};

const mimeTypeToFileExtension: Record<string, string> = {
  // "image/*": "img", // Generic image file extension
  // "video/*": "video", // Generic video file extension
  // "audio/*": "audio", // Generic audio file extension

  "text/x-c": "c",
  "text/x-c++": "cpp",
  "application/csv": "csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "text/html": "html",
  "text/x-java": "java",
  "application/json": "json",
  "text/markdown": "md",
  "application/pdf": "pdf",
  "text/x-php": "php",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "text/x-python": "py",
  "text/x-script.python": "py",
  "text/x-ruby": "rb",
  "text/x-tex": "tex",
  "text/plain": "txt",
  "text/css": "css",
  "text/javascript": "js",
  "application/x-tar": "tar",
  "application/typescript": "ts",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/xml": "xml",
  "text/xml": "xml",
  "application/zip": "zip",
};

export const getFileTypeFromMimeType = (mimeType: string): string => {
  const fileExtension = mimeTypeToFileExtension[mimeType];
  if (fileExtension) return fileExtension;
  const splitMimeType = mimeType.split("/");
  switch (splitMimeType[0]) {
    case "image":
      return "image";
    case "video":
      return "video";
    case "audio":
      return "audio";
    default:
      return "file";
  }
};

export const FILE_TYPES = [
  ...Object.values(mimeTypeToFileExtension),
  "image",
  "video",
  "audio",
  "file",
];

/**
 * Ensure that a string is wrapped in double curly braces
 * @param str - The string to wrap
 * @returns  The wrapped string - e.g. "{{my string}}"
 */
export const ensureBrackets = (str: string): string => {
  // Remove any existing curly braces from the string
  let cleanStr = str.replace(/[{]|[}]/g, "");

  // Wrap the cleaned string with double curly braces
  return `{{${cleanStr}}}`;
};

/**
 * Test if a string is a valid url
 *
 * @param url - The url to test
 * @returns - Whether the url is valid
 */
export const testWebsite = (url: string) => {
  if (url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

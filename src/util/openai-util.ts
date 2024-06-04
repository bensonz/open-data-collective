export function isOpenAiRunFinalState(status: string) {
  return (
    status === "completed" ||
    status === "failed" ||
    status === "expired" ||
    status === "requires_action" ||
    status === "cancelled"
  );
}

// OpenAi annotation format
const left = "【";
const right = "】";
/**
 * Splits a string with annotations into segments
 * @param str - string with annotations
 * @returns {string[], number[]}
 */
export function splitSegments(str: string) {
  const all = [];
  let curChars = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === left) {
      if (curChars.length > 0) {
        all.push(curChars.join(""));
        curChars = [];
      }
      curChars.push(left);
    } else if (str[i] === right) {
      curChars.push(right);
      all.push(curChars.join(""));
      curChars = [];
    } else {
      curChars.push(str[i]);
    }
  }

  if (curChars.length > 0) {
    all.push(curChars.join(""));
  }

  return all;
}

/**
 * Limits the token usage of the content
 *
 * @param content - the content to be limited
 */
export function limitTokenUsage(content: string, limit = 16385) {
  const buffer = limit - 3000;
  if (content.length <= buffer) {
    // no need to encode if we are below half the limit
    return content;
  }
  // npm package: `gpt-3-encode` fails the project.
  return content.slice(0, buffer);
}

/**
 * Just a simple function to (fake) count the token usage
 *
 * @param content
 * @returns integer
 */
export function countToken(content: string) {
  return Math.floor(content.length * 0.7);
}

// This is a sample for the OpenAI assistant function tool
const sample = `
{
  "name": "get_previous_msg",
  "description": "Use Gpt3.5 to get the previous messages that may be relevant to the current message. If you feel like there may be a relevant message that the user has sent before, you can use this endpoint to get the previous messages.",
  "parameters": {
    "type": "object",
    "properties": {
      "current_message": {
        "type": "string",
        "description": "The current message that the user has sent"
      }
    },
    "required": [
      "current_message"
    ]
  }
}`;

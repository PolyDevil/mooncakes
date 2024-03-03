/*
import { guard } from "~/utils/switch";

type result = {
  type: "error";
  message: string;
} | {
  type: "data";
  value: Array<...>;
}

const data: result = ...;

switch (data.type) {
  case "error": {
    return data.message; // safely access error message
  }

  case "data": {
    return data.value; // safely access data value
  }

  default: {
    return guard(data); // make sure that after adding one new type in result - switch would break;
  }
}
*/

export function guard(value: never): never {
  throw new Error(
    `ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(
      value
    )}`
  );
}

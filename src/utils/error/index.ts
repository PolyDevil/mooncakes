type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

/*
import ToError from "~/utils/error";

try {
  const response = await fetch();
  const json = await response.json();

  if (typeof json !== "object") {
    throw new Error(`[${response.status}] could not parse response`);
  }
} catch (maybeError: unknown) {
  console.error(ToError(maybeError).message) // safely access error from catch
}
*/

export default (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
};

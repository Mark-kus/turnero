export function throwNextRedirectError(e: any): undefined {
  if (e.digest.includes("NEXT_REDIRECT")) {
    throw e;
  }

  return;
}

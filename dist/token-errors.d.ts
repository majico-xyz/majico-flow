/**
 * Detect API JSON bodies that mean the user is out of app tokens (upgrade / top-up).
 * Used by flow hooks when status codes vary or `code` is missing from the payload.
 */
export declare function isInsufficientTokensPayload(data: unknown): boolean;

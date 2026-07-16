import { describe, expect, it } from "vitest";
import { isInsufficientTokensPayload } from "./token-errors.js";

describe("isInsufficientTokensPayload", () => {
  it("returns true for structured insufficient_tokens when balance is low", () => {
    expect(
      isInsufficientTokensPayload({
        error: "insufficient_tokens",
        code: "INSUFFICIENT_TOKENS",
        tier: "free",
        upgradeOptions: ["creator", "pro"],
        balance: 0,
        required: 19,
      })
    ).toBe(true);
  });

  it("returns true for legacy INSUFFICIENT_TOKENS code with insufficient-token message", () => {
    expect(
      isInsufficientTokensPayload({
        code: "INSUFFICIENT_TOKENS",
        error: "Insufficient tokens for a logo batch.",
        balance: 0,
        required: 19,
      })
    ).toBe(true);
  });

  it("returns false when structured payload has sufficient balance", () => {
    expect(
      isInsufficientTokensPayload({
        error: "insufficient_tokens",
        code: "INSUFFICIENT_TOKENS",
        balance: 1_000_000,
        required: 19,
      })
    ).toBe(false);
  });

  it("returns false for unrelated errors", () => {
    expect(isInsufficientTokensPayload({ error: "Forbidden" })).toBe(false);
    expect(isInsufficientTokensPayload(null)).toBe(false);
    expect(isInsufficientTokensPayload({})).toBe(false);
    expect(
      isInsufficientTokensPayload({
        error: "Insufficient tokens. Upgrade to Pro or Creator for more.",
      })
    ).toBe(false);
  });
});

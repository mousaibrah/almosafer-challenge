import { formatNumber } from "../utils";

describe("formatNumber", () => {
  it("formats numbers less than 1000 correctly", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(1)).toBe("1");
    expect(formatNumber(100)).toBe("100");
    expect(formatNumber(999)).toBe("999");
  });

  it("formats numbers 1000 and above with k suffix", () => {
    expect(formatNumber(1000)).toBe("1k");
    expect(formatNumber(1500)).toBe("1.5k");
    expect(formatNumber(10000)).toBe("10k");
    expect(formatNumber(12345)).toBe("12.3k");
    expect(formatNumber(999999)).toBe("999.9k");
  });

  it("formats numbers 1,000,000 and above with M suffix", () => {
    expect(formatNumber(1000000)).toBe("1M");
    expect(formatNumber(1500000)).toBe("1.5M");
    expect(formatNumber(10000000)).toBe("10M");
    expect(formatNumber(12345678)).toBe("12.3M");
  });

  it("formats numbers 1,000,000,000 and above with B suffix", () => {
    expect(formatNumber(1000000000)).toBe("1B");
    expect(formatNumber(1500000000)).toBe("1.5B");
    expect(formatNumber(10000000000)).toBe("10B");
    expect(formatNumber(12345678901)).toBe("12.3B");
  });

  it("handles decimal precision correctly", () => {
    expect(formatNumber(1234)).toBe("1.2k");
    expect(formatNumber(1235)).toBe("1.2k");
    expect(formatNumber(1236)).toBe("1.2k");
    expect(formatNumber(1249)).toBe("1.2k");
    expect(formatNumber(1250)).toBe("1.2k");
    expect(formatNumber(1251)).toBe("1.3k");
  });

  it("handles edge cases", () => {
    expect(formatNumber(-1)).toBe("-1");
    expect(formatNumber(-1000)).toBe("-1k");
    expect(formatNumber(0.5)).toBe("0.5");
    expect(formatNumber(0.1)).toBe("0.1");
  });

  it("handles very large numbers", () => {
    expect(formatNumber(999999999999)).toBe("999.9B");
    expect(formatNumber(1000000000000)).toBe("1T");
    expect(formatNumber(1500000000000)).toBe("1.5T");
  });

  it("handles zero and small numbers", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(0.1)).toBe("0.1");
    expect(formatNumber(0.5)).toBe("0.5");
    expect(formatNumber(1)).toBe("1");
  });

  it("handles numbers that should round up", () => {
    expect(formatNumber(999)).toBe("999");
    expect(formatNumber(999.9)).toBe("999.9");
    expect(formatNumber(1000)).toBe("1k");
    expect(formatNumber(1499)).toBe("1.5k");
    expect(formatNumber(1500)).toBe("1.5k");
    expect(formatNumber(1501)).toBe("1.5k");
  });

  it("handles numbers that should round down", () => {
    expect(formatNumber(1001)).toBe("1k");
    expect(formatNumber(1499)).toBe("1.5k");
    expect(formatNumber(1500)).toBe("1.5k");
    expect(formatNumber(1999)).toBe("2k");
  });
});

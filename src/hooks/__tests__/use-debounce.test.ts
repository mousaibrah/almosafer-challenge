import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "../use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Change value
    rerender({ value: "changed", delay: 500 });

    // Value should still be the old one immediately
    expect(result.current).toBe("initial");

    // Fast forward time by less than delay
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should still be the old one
    expect(result.current).toBe("initial");

    // Fast forward time to complete the delay
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Now value should be updated
    expect(result.current).toBe("changed");
  });

  it("should cancel previous timeout when value changes again", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Change value first time
    rerender({ value: "first", delay: 500 });

    // Fast forward time by 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Change value again before first change takes effect
    rerender({ value: "second", delay: 500 });

    // Fast forward time by 200ms (total 500ms from first change)
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Value should still be initial because second change reset the timer
    expect(result.current).toBe("initial");

    // Fast forward time by 300ms more (total 500ms from second change)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Now value should be updated to 'second'
    expect(result.current).toBe("second");
  });

  it("should work with different delay values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 1000 },
      }
    );

    rerender({ value: "changed", delay: 1000 });

    // Fast forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("initial");

    // Fast forward time by 500ms more (total 1000ms)
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("changed");
  });

  it("should work with zero delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 0 },
      }
    );

    rerender({ value: "changed", delay: 0 });

    // With zero delay, value should update immediately
    expect(result.current).toBe("changed");
  });

  it("should handle multiple rapid changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Make multiple rapid changes
    rerender({ value: "first", delay: 500 });
    act(() => jest.advanceTimersByTime(100));

    rerender({ value: "second", delay: 500 });
    act(() => jest.advanceTimersByTime(100));

    rerender({ value: "third", delay: 500 });
    act(() => jest.advanceTimersByTime(100));

    // Value should still be initial
    expect(result.current).toBe("initial");

    // Fast forward to complete the delay from the last change
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should be updated to the last change
    expect(result.current).toBe("third");
  });

  it("should handle non-string values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 500 },
      }
    );

    rerender({ value: 42, delay: 500 });

    expect(result.current).toBe(0);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(42);
  });

  it("should handle empty string values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    rerender({ value: "", delay: 500 });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("");
  });
});

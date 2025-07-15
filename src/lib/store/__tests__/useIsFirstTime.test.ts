import { renderHook, act } from '@testing-library/react'
import { useIsFirstTime } from '../useIsFirstTime'

describe('useIsFirstTime', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should return true by default when no localStorage is set', () => {
    const { result } = renderHook(() => useIsFirstTime())

    expect(result.current.isFirstTime).toBe(true)
  })

  it('should update isFirstTime state when setIsFirstTime is called', () => {
    const { result } = renderHook(() => useIsFirstTime())

    expect(result.current.isFirstTime).toBe(true)

    act(() => {
      result.current.setIsFirstTime(false)
    })

    expect(result.current.isFirstTime).toBe(false)
  })

  it('should maintain state consistency across re-renders', () => {
    const { result, rerender } = renderHook(() => useIsFirstTime())

    expect(result.current.isFirstTime).toBe(true)

    act(() => {
      result.current.setIsFirstTime(false)
    })

    expect(result.current.isFirstTime).toBe(false)

    // Re-render should maintain the same state
    rerender()
    expect(result.current.isFirstTime).toBe(false)
  })

  it('should handle multiple state changes', () => {
    const { result } = renderHook(() => useIsFirstTime())

    expect(result.current.isFirstTime).toBe(true)

    act(() => {
      result.current.setIsFirstTime(false)
    })

    expect(result.current.isFirstTime).toBe(false)

    act(() => {
      result.current.setIsFirstTime(true)
    })

    expect(result.current.isFirstTime).toBe(true)
  })

  it('should have setIsFirstTime function available', () => {
    const { result } = renderHook(() => useIsFirstTime())

    expect(typeof result.current.setIsFirstTime).toBe('function')
  })
})

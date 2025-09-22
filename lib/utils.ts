import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Preserves scroll position during DOM updates using anchor delta approach
 * @param anchorRef - Ref to a stable anchor element
 * @param callback - Function to execute after scroll position is preserved
 */
export function preserveScroll(anchorRef: React.RefObject<HTMLElement>, callback?: () => void) {
  const anchor = anchorRef.current
  if (!anchor) {
    callback?.()
    return
  }

  const before = anchor.getBoundingClientRect().top
  callback?.()
  
  requestAnimationFrame(() => {
    const after = anchor.getBoundingClientRect().top
    window.scrollBy(0, after - before)
  })
}

import { useEffect } from "react";

export default function useOutsideClick(
  elementRef: React.MutableRefObject<HTMLElement | null>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!elementRef.current || elementRef.current.contains(event.target as Node)) {
        return;
      }
      handleOnClickOutside(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [elementRef, handleOnClickOutside]);
}
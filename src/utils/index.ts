export * from "./timeUtils";

export function debounce(callback: () => void, delay: number = 300) {
  let timeoutId: NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback();
    }, delay);
  };
}

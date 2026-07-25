let i = 0;

export function useRerender(cb: CallableFunction, renderAmount: number) {
 const id = setTimeout(() => {
    while (i < renderAmount) {
      cb?.();
      i += 1;
    }
    
  }, 10);
  return () => {clearTimeout(id); i=0}
}

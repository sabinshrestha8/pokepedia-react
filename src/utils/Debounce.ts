/**
 * If Used in an Arrow Function:
 * ----------------------------->
 * const debouncedFn = debounce(() => {
 *  console.log(this);
 * }, 300);
 *
 * debouncedFn();
 *
 * In this case, "this" would capture the lexical "this" value
 * from its surrounding scope. If this code is within a functional
 * component. For example, this would likely refer to the component
 * instance.
 */

export const debounce = (fn: Function, timeout: number) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}

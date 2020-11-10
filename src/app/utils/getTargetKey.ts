const keyLoaderProxy = new Proxy<any>({}, {
  get(target, key) {
    return key;
  }
});
export function getTargetKey(fun: (obj: any) => any): string {
  return fun(keyLoaderProxy);
}

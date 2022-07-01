declare const echarts: {
  init(element: HTMLElement): {
    setOption(opt: any): void
    resize(opt: {
      width: number,
      height: number,
    }): void
    dispose(): void
  }

}
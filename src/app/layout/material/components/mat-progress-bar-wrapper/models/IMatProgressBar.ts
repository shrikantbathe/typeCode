export interface IMatProgressBar {
    bufferValue: number,
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query',
    value: number,
}

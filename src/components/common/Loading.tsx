type Props = {
  width?: number | string,
  height?: number | string,
}

export function Loading({width = 40, height = 40}: Props) {
  return (<div className={`relative w-[${width}px] h-[${height}px]`}>
  <div className={`absolute w-[${width}px] h-[${height}px] animate-spin border-8 border-solid border-transparent border-t-teal-200 rounded-[100%]`}></div>
  <div className={`absolute w-[${width}px] h-[${height}px] animate-spin-reverse border-8 border-solid border-transparent border-l-teal-200 rounded-[100%]`}></div>
</div>)
}
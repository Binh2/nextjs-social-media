type Props = {
  width?: number | string,
  height?: number | string,
}

export function Loading({width = 24, height = 24}: Props) {
  return (<div className={`relative`} style={{width, height}}>
  <div className={`absolute animate-spin border-4 border-solid border-transparent border-t-teal-200 rounded-[100%]`} style={{width, height}}></div>
  <div className={`absolute animate-spin-reverse border-4 border-solid border-transparent border-l-teal-200 rounded-[100%]`} style={{width, height}}></div>
</div>)
}
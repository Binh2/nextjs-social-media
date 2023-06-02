type Props = {
  width?: number | string,
  height?: number | string,
}

export function Loading({width, height}: Props) {
  return <div className={`rounded-[100%] inline-block w-[${width}] h-[${height}] animate-spin border-black radius-tl border-t-8 border-solid`}></div>;
}
Loading.defaultProps = {
  width: 48,
  height: 48,
}
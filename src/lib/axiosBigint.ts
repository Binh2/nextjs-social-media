import * as JSONbig from 'json-bigint';

export const transformResponse = [(data: any) => {
  return JSONbig.parse(data)
}]
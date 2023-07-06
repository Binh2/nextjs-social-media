import { transformResponse } from "@/lib/axiosBigint"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Props = {
  postId: string
}
export function CommentCount({postId}: Props) {
  const { data } = useQuery<number>(["post", postId, "comment", "count"], {
    queryFn: () => {
      return axios.get(`/api/post/${postId}/comment/count`, {transformResponse}).then(res => res.data)
    }
  })
  return (<>
    { data || 0 }
  </>)
}
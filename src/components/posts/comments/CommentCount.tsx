import { transformResponse } from "@/lib/axiosBigint"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Props = {
  postId: string
}
export function CommentCount({postId}: Props) {
  const { data } = useQuery<number>(["posts", postId, "comments", "count"], {
    queryFn: () => {
      return axios.get(`/api/posts/${postId}/comments/count`, {transformResponse}).then(res => res.data)
    }
  })
  return (<>
    { data || 0 }
  </>)
}
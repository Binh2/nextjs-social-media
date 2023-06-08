import Popup from "reactjs-popup";
import { Reaction } from "./Reaction";
import { ReactionProps } from "@/types/ReactionProps";
import { useSession } from "next-auth/react";

type Props = {
  reactions: ReactionProps[],
  count: number | null,
}

export function Reactions({ reactions, count }: Props) {
  const { data: session, status } = useSession();
  const didSelfReact = reactions.map(reaction => reaction.authorEmail).includes(session?.user?.email || '')

  return (<div>
    <ol>
      {reactions.filter((reaction, index, self) => {
        return self.findIndex(reactionTemp => reactionTemp.type == reaction.type) == index;
      }).map(reaction => (
        <li key={reaction.type}>
          <Reaction type={reaction.type}></Reaction>
        </li>
      ))}
    </ol>
    { 
      !count &&
      <p>
        { didSelfReact && <span>Bạn và </span> }
        { !count && <span>{(count || 0) - (didSelfReact ? 1 : 0)} người khác</span> }
      </p>
    }
  </div>)
}
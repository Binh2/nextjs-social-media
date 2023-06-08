import { ReactionTypes } from '@/lib/reactionTypes';
import { faFaceAngry, faFaceGrinSquintTears, faFaceSadCry, faFaceSurprise, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  type?: number;
  className?: string
}

const defaultProps = {
  className: ''
}

export function Reaction({ type, className }: Props) {
  const defaultReturn = <FontAwesomeIcon icon={faThumbsUp} className={`${className} fa-solid fa-thumbs-up text-[#bbb]`} />;
  if (type == ReactionTypes.NONE) return defaultReturn;
  else if (type == ReactionTypes.LIKE) return <FontAwesomeIcon icon={faThumbsUp} className={`${className} text-teal-500 fa-solid fa-thumbs-up`} />
  else if (type == ReactionTypes.LOVE) return (<FontAwesomeIcon icon={faHeart} className={`${className} text-red-500 fa-duotone fa-heart`} />)
  else if (type == ReactionTypes.FUNNY) return (<FontAwesomeIcon icon={faFaceGrinSquintTears} className={`${className} text-yellow-500 fa-solid fa-face-grin-squint-tears`} />)
  else if (type == ReactionTypes.SURPRISED) return (<FontAwesomeIcon icon={faFaceSurprise} className={`${className} text-yellow-500 fa-solid fa-face-surprise`} />)
  else if (type == ReactionTypes.SAD) return (<FontAwesomeIcon icon={faFaceSadCry} className={`${className} text-yellow-500 fa-solid fa-face-sad-cry`} />)
  else if (type == ReactionTypes.ANGRY) return (<FontAwesomeIcon icon={faFaceAngry} className={`${className} text-red-500 fa-solid fa-face-angry`} />)
  return defaultReturn;
}

Reaction.defaultProps = defaultProps
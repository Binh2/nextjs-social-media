type Props = {
  className?: string
}

export function Intro({ className = "" }: Props) {
  return (
    <div className={`m-auto ${className}`}>
      <h1 className="text-center text-4xl font-bold mb-4 font-[Inter] text-teal-500" 
        style={{textShadow: "1px 0 black, -1px 0 black, 0 1px black, 0 -1px black, 0.5px 0.5px black, -0.5px -0.5px black, 0.5px -0.5px black, -0.5px 0.5px black"}}
      >SocialSphere</h1>
      <p className="text-gray-600 text-lg font-bold">Welcome to SocialSphere - the place to connect with new friends and build your network.</p>
    </div>
  );
}

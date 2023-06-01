import { useSession } from "next-auth/react";

export function LeftSidebar() {
  const { data: session, status } = useSession();
  
  return (<>
    <section className={`float-left`}>
      <div>Home</div> 
      <div>{session?.user?.name}</div>
      <div>Watch</div>
      <div>Marketplace</div>
      <div>Game</div>
      <div>Users</div>
      <div>View</div>
    </section>
  </>)
}
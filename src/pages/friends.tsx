import Header from "@/components/common/Header"
import { SessionProvider } from "next-auth/react"

export default function SessionProvided() {
  return (<>
    <SessionProvider>
      <Page></Page>  
    </SessionProvider>  
  </>)
}

function Page() {
  return (<>
    <Header></Header>
    <h1>Friend requests</h1>
    <h1>Friend suggestions</h1>
  </>)
}

SessionProvided.requiredAuth = true;
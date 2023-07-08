import { AddInfoLink, CloseButton, Hr } from "@/components/common";
import * as Urls from "@/lib/urls";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Popup from "reactjs-popup";

export function EditDetailsPopup() {
  const [ open, setOpen ] = useState(false);
  const { data: session } = useSession();
  return (<>
    <button onClick={() => setOpen(true)}></button>
    <Popup open={open} onClose={() => setOpen(false)} className={`overflow-auto`}>
      <div>
        <h1>Edit details</h1>
        <CloseButton></CloseButton>
      </div>
      <Hr></Hr>
      <h2>Customise your Intro</h2>
      <p>Details you select will be public</p>
      <h2>Pronouns</h2>
      <AddInfoLink href={Urls.aboutUser(session?.user.id)}>Add pronouns to your profile</AddInfoLink>
      <h2>Work</h2>
      <AddInfoLink href={Urls.aboutUser(session?.user.id)}>Add a wokkplace</AddInfoLink>
      <h2>Education</h2>
      <AddInfoLink href={Urls.aboutUser(session?.user.id)}>Add your universities</AddInfoLink>
      <div className={`sticky bottom-0`}>
        <button className="button">Cancel</button>
        <button className="button button--standout">Save</button>
      </div>
    </Popup>
  </>)
}
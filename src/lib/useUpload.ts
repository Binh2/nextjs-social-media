import { ChangeEvent, useState } from "react";

export const UploadState = {
  IDLE: 1,
  UPLOADING: 2,
  UPLOADED: 3,
};
Object.freeze(UploadState);

export function useUpload(defaultImageUrl: string = '') {
  const [uploadState, setUploadState] = useState(UploadState.IDLE);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  async function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setUploadState(UploadState.UPLOADING);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data.secure_url);
    setImageUrl(data.secure_url);
    setUploadState(UploadState.UPLOADED);
  }
  return {
    uploadState,
    imageUrl,
    handleFileInputChange,
  }
}
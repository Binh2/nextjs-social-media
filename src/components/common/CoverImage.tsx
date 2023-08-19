import Popup from 'reactjs-popup'
import { CloseButton } from './controls/buttons';
import { UploadState, useUpload } from '@/hooks';
import { User } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { MouseEvent, useEffect, useRef, useState } from 'react';

export function CoverImage({ className='' }: { className?: string }) {
  const [ open, setOpen ] = useState(false);
  const { uploadState, imageUrl, handleFileInputChange } = useUpload();
  const { data: session } = useSession();
  const { data: user } = useQuery<User>([ "users", session?.user.id || '' ], {
    queryFn: async () => {
      return await fetch("/api/users/self").then(res => res.json())
    }
  })
  const src = user?.coverImage;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      return await fetch("/api/users/coverImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          coverImage: imageUrl
        })
      }).then(res => res.json())
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['users', session?.user.id || '']);
    }
  })
  

  return (<>
    <div className={`w-full h-[30%] ${className}`}>
      { src ?
        <Image src={src} alt='' width={0} height={0} style={{ width: "100%" }} unoptimized></Image>  :
        <>
          <label className={`cursor-pointer bg-white flex flex-col items-center justify-center`}>
            <Image src="/image-placeholder.svg" alt='' width={0} height={0} style={{ maxWidth: "100px", height: "50%" }} className={`p-4 rounded-full bg-gray-300 border-4 border-white`} />
            <p className={`font-bold text-center`}>Add an image/photo</p>
            <p className={`text-sm text-center text-gray-700`}>or drag and drop</p>
            <input type="file" onChange={handleFileInputChange} className={`hidden`}></input>
          </label>
          <Popup open={open} onClose={() => setOpen(false)}>
            <div className={`bg-white p-4 select-none`}>
              {/* Popup header */}
              <div className={`flex justify-between items-center`}>
                <div className={`w-12 h-12`}></div>
                <p className={`text-lg font-bold`}>Customise your cover image</p>
                <CloseButton onClick={() => setOpen(false)} />
              </div>

              {/* Popup body */}
              <ImageCropper src={imageUrl} />

              {/* Popup footer */}
              <div className={`flex justify-end mt-2`}>
                <button className={`button`} onClick={() => setOpen(false)}>Cancel</button>
                <button className={`button button--standout`} onClick={() => mutation.mutate(imageUrl)}>Confirm</button>
              </div>
            </div>
          </Popup>
        </>
      }
    </div>
  </>)
}

function ImageCropper({ src='', alt='' }: { src?: string, alt?: string }) {
  const [ x1, setX1 ] = useState(8);
  const [ y1, setY1 ] = useState(8);
  const [ x2, setX2 ] = useState(108);
  const [ y2, setY2 ] = useState(108);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageWidth = imageRef.current?.width || 0
  const imageHeight = imageRef.current?.height || 0;

  return (<>
    <div className={`relative max-h-[80vh] overflow-y-auto`}>
      <div className={`absolute bg-transparent border-gray-700 opacity-50 roudned-full box-content`} 
      style={{
        borderLeftWidth: (x1-4) + 'px', borderRightWidth:  (imageWidth  - x2+4) + 'px',
        borderTopWidth:  (y1-4) + 'px', borderBottomWidth: (imageHeight - y2+4) + 'px',
        width: x2-x1, height: y2-y1,
      }}></div>

      <DraggableDiv x={x1} y={y1} 
      xOnChange={dx => { setX1(x1 => x1+dx); setX2(x2 => x2+dx); }} 
      yOnChange={dy => { setY1(y1 => y1+dy); setY2(y2 => y2+dy); }}
      style={{width: x2-x1, height: y2-y1}}
      className={`border border-dashed border-teal-500`}
      />
      <DraggableDiv x={x1-4} y={y1-4} xOnChange={dx => setX1(x1 => x1+dx)} yOnChange={dy => setY1(y1 => y1+dy)} className={`w-2 h-2 bg-white border border-gray-500 cursor-nw-resize`} />
      <DraggableDiv x={x2-4} y={y1-4} xOnChange={dx => setX2(x2 => x2+dx)} yOnChange={dy => setY1(y1 => y1+dy)} className={`w-2 h-2 bg-white border border-gray-500 cursor-ne-resize`} />
      <DraggableDiv x={x2-4} y={y2-4} xOnChange={dx => setX2(x2 => x2+dx)} yOnChange={dy => setY2(y2 => y2+dy)} className={`w-2 h-2 bg-white border border-gray-500 cursor-se-resize`} />
      <DraggableDiv x={x1-4} y={y2-4} xOnChange={dx => setX1(x1 => x1+dx)} yOnChange={dy => setY2(y2 => y2+dy)} className={`w-2 h-2 bg-white border border-gray-500 cursor-sw-resize`} />

      <DraggableDiv x={(x1+x2)/2-4} y={y1-4} yOnChange={dy => setY1(y1 => y1+dy)} className={`w-2 h-2 bg-white border border-gray-500 cursor-n-resize`} />
      <DraggableDiv x={(x1+x2)/2-4} y={y2-4} yOnChange={dy => setY2(y2 => y2+dy)} className={`w-2 h-2 bg-white border border-gray-500 cursor-s-resize`} />
      <DraggableDiv x={x1-4} y={(y1+y2)/2-4} xOnChange={dx => setX1(x1 => x1+dx)} className={`w-2 h-2 bg-white border border-gray-500 cursor-w-resize`} />
      <DraggableDiv x={x2-4} y={(y1+y2)/2-4} xOnChange={dx => setX2(x2 => x2+dx)} className={`w-2 h-2 bg-white border border-gray-500 cursor-e-resize`} />
      <Image ref={imageRef} src={src} alt={alt} width={0} height={0} style={{width: "auto", height: "auto"}} unoptimized />
    </div>
  </>)
}

function DraggableDiv({x, y, xOnChange, yOnChange, className='', style={}}: {x: number, y: number, xOnChange?: (dx: number) => void, yOnChange?: (dy: number) => void, className?: string, style?: Object}) {
  const isMouseDown = useRef(false)
  useEffect(() => {
    function onMouseDown() { isMouseDown.current = true }
    function onMouseMove(e: any) {
      if (!isMouseDown.current) return;  
      xOnChange && xOnChange(e.movementX);
      yOnChange && yOnChange(e.movementY);
    }
    function onMouseUp() { isMouseDown.current = false }
    
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  }, [xOnChange, yOnChange])
  return (<>
    <div className={`absolute ${className}`} style={{left: x-4, top: y-4, ...style}} 
    onMouseDown={() => isMouseDown.current = true}
    ></div>
  </>)
}
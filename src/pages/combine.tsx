import { useUpload } from "@/hooks/useUpload";
import { SessionProvider } from "next-auth/react";
import { useRef, useState } from "react";
import * as tf from '@tensorflow/tfjs'
import Image from "next/image"
import axios from "axios";
import { combineImage } from "@/lib/combineImage";

function SessionProvided() {
  return <SessionProvider>
    <Page></Page>
  </SessionProvider>
}

function Page() {
  const [ contentImage, setContentImage ] = useState('upload.jpg');
  const [ styleImage, setStyleImage ] = useState('upload.jpg');
  const contentImageElem = useRef<HTMLImageElement>(null);
  const styleImageElem = useRef<HTMLImageElement>(null);
  const resultImageElem = useRef<HTMLCanvasElement>(null);
  
  const combine = async () => {
    if (!contentImageElem.current) return;
    if (!styleImageElem.current) return;
    if (!resultImageElem.current) return;
    // const result = await axios.post("/api/combine", {
    //   contentImage: tf.browser.fromPixels(contentImageElem.current), 
    //   styleImage: tf.browser.fromPixels(styleImageElem.current)
    // }).then(res => res.data) as tf.Tensor3D

    const result = await combineImage(
      tf.browser.fromPixels(contentImageElem.current),
      tf.browser.fromPixels(styleImageElem.current)
    );
    console.log(result)
    tf.browser.toPixels(result, resultImageElem.current);
    // console.log(await axios.get('https://cdn.jsdelivr.net/gh/polsss/demoimg/saved_model_style_inception_js/model.json').then(res => res.data))
  }
  return (<>
    <h1>Combine 2 image using AI</h1>
    <main>
      <div className="flex justify-around">
        <div className="max-w-[50%]">
          <button className="block">
            <img src={'/combineImage/' + contentImage} className="max-h-[256px]" 
              ref={contentImageElem} 
              // width={256} height={512}
              alt="Content image"
            ></img>
          </button>
          <select value={contentImage} onChange={(e) => setContentImage(e.target.value)}>
            <ContentImageOptions></ContentImageOptions>
          </select>
        </div>
        <div className="max-w-[50%]">
          <button className="block">
            <img src={'/combineImage/' + styleImage} className="max-h-[256px]" 
              ref={styleImageElem} 
              // width={256} height={512}
              alt="Style image"
            ></img>
          </button>
          <select value={styleImage} onChange={e => setStyleImage(e.target.value)}>
            <StyleImageOptions></StyleImageOptions>
          </select>
        </div>
      </div>
      <canvas ref={resultImageElem}></canvas>
      <button onClick={combine}>Combine images</button>
    </main>
  </>)
}

function ContentImageOptions() {
  return (<>
    <option value="upload.jpg">Pick an image file</option>
    <option value="stata.jpg">Stata building</option>
    <option value="hoa_minzy.jpg">Hoa Minzy</option>
    <option value="golden_bridge.jpg">Golden bridge</option>
    <option value="beach.jpg">Beach</option>
    <option value="chicago.jpg">Chicago</option>
  </>)
}

function StyleImageOptions() {
  return (<>
    <option value="upload.jpg">Pick an image file</option>
    <option value="udnie.jpg">Udnie style</option>
    <option value="DemDaySao_VanGogh.jpg">Van Gogh - Starry night</option>
    <option value="RoiLoanLoAu.jpg">The scream</option>
    <option value="clouds.jpg">Red clouds</option>
    <option value="towers.jpg">Towers</option>
    <option value="red_circles.jpg">Red circles</option>
  </>)
}

SessionProvided.requiredAuth = true;
export default SessionProvided;
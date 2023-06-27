import { NextApiHandler } from "next";
import * as tf from '@tensorflow/tfjs';
import { combineImage } from "@/lib/combineImage";

const handle: NextApiHandler = async (req, res) => {
  try {
    const contentImage = req.body.contentImage as tf.Tensor3D;
    const styleImage = req.body.styleImage as tf.Tensor3D;
    const result = await combineImage(contentImage, styleImage);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
}

export default handle;
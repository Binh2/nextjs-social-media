import * as tf from '@tensorflow/tfjs';

const basePath = 'https://cdn.jsdelivr.net/gh/polsss/demoimg/'
let mobileStyleNet: any, inceptionStyleNet: any, originalTransformerModel: any, separableTransformerModel: any;
async function loadMobileNetStyleModel() {
  if (!mobileStyleNet) mobileStyleNet = await tf.loadGraphModel(basePath + 'saved_model_style_js/model.json');
  return mobileStyleNet;
}
async function loadInceptionStyleModel() {
  if (!inceptionStyleNet) inceptionStyleNet = await tf.loadGraphModel(basePath + 'saved_model_style_inception_js/model.json');
  return inceptionStyleNet;
}
async function loadOriginalTransformerModel() {
  if (!originalTransformerModel) originalTransformerModel = await tf.loadGraphModel(basePath + 'saved_model_transformer_js/model.json');
  return originalTransformerModel;
}
async function loadSeparableTransformerModel() {
  if (!separableTransformerModel) separableTransformerModel = await tf.loadGraphModel(basePath + 'saved_model_transformer_separable_js/model.json');
  return separableTransformerModel;
}

export async function combineImage(contentImg: tf.Tensor3D, styleImg: tf.Tensor3D, styleRatio = 0.5) {
  const styleNet = await loadMobileNetStyleModel();
  const transformNet = await loadOriginalTransformerModel();
  await tf.nextFrame();
  let bottleneck = await tf.tidy(() => {
    return styleNet.predict(styleImg.toFloat().div(tf.scalar(255)).expandDims());
  })
  if (styleRatio !== 1.0) {
    await tf.nextFrame();
    const identityBottleneck = await tf.tidy(() => {
      return styleNet.predict(contentImg.toFloat().div(tf.scalar(255)).expandDims());
    })
    const styleBottleneck = bottleneck;
    bottleneck = await tf.tidy(() => {
      const styleBottleneckScaled = styleBottleneck.mul(tf.scalar(styleRatio));
      const identityBottleneckScaled = identityBottleneck.mul(tf.scalar(1.0 - styleRatio));
      return styleBottleneckScaled.addStrict(identityBottleneckScaled)
    })
    styleBottleneck.dispose();
    identityBottleneck.dispose();
  }
  await tf.nextFrame();
  const stylized = await tf.tidy(() => {
    return transformNet.predict([contentImg.toFloat().div(tf.scalar(255)).expandDims(), bottleneck]).squeeze();
  })
  console.log(stylized)
  return stylized
  const result = await tf.browser.toPixels(stylized);
  console.log(result)
  bottleneck.dispose();
  return result;
  // console.log(stylized)
  // stylized.dispose();
}
// async function startCombining(combStyleImg1, combStyleImg2, combStyleRatio, combContentImg) {
//   const styleNet = mobileStyleNet;
//   const transformNet = originalTransformerModel;
//   await tf.nextFrame();
//   console.log('Đang xử lý ảnh 1. Vui lòng chờ ...');
//   await tf.nextFrame();
//   const bottleneck1 = await tf.tidy(() => {
//     return styleNet.predict(tf.browser.fromPixels(combStyleImg1).toFloat().div(tf.scalar(255)).expandDims());
//   })

//   await tf.nextFrame();
//   const bottleneck2 = await tf.tidy(() => {
//     return styleNet.predict(tf.browser.fromPixels(combStyleImg2).toFloat().div(tf.scalar(255)).expandDims());
//   });

//   await tf.nextFrame();
//   const combinedBottleneck = await tf.tidy(() => {
//     const scaledBottleneck1 = bottleneck1.mul(tf.scalar(1 - combStyleRatio));
//     const scaledBottleneck2 = bottleneck2.mul(tf.scalar(combStyleRatio));
//     return scaledBottleneck1.addStrict(scaledBottleneck2);
//   });

//   const stylized = await tf.tidy(() => {
//     return transformNet.predict([tf.browser.fromPixels(combContentImg).toFloat().div(tf.scalar(255)).expandDims(), combinedBottleneck]).squeeze();
//   })
//   await tf.browser.toPixels(stylized, combStylized);
//   bottleneck1.dispose();  
//   bottleneck2.dispose();
//   combinedBottleneck.dispose();
//   combdisplayModal = stylized
//   console.log(combdisplayModal)
//   // stylized.dispose();
// }
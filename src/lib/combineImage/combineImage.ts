import * as tf from '@tensorflow/tfjs';

let mobileStyleNet: any, inceptionStyleNet: any, originalTransformerModel: any, separableTransformerModel: any: any;
async function loadMobileNetStyleModel() {
  if (!mobileStyleNet) mobileStyleNet = await tf.loadGraphModel('saved_model_style_js/model.json');
  return mobileStyleNet;
}
async function loadInceptionStyleModel() {
  if (!inceptionStyleNet) inceptionStyleNet = await tf.loadGraphModel('saved_model_style_inception_js/model.json');
  return inceptionStyleNet;
}
async function loadOriginalTransformerModel() {
  if (!originalTransformerModel) originalTransformerModel = await tf.loadGraphModel('saved_model_transformer_js/model.json');
  return originalTransformerModel;
}
async function loadSeparableTransformerModel() {
  if (!separableTransformerModel) separableTransformerModel = await tf.loadGraphModel('saved_model_transformer_separable_js/model.json');
  return separableTransformerModel;
}


async function initModel(modelName: 'mobilenet' | 'inception', model2Name: 'original' | 'separable') {
  let model;
  if (modelName === 'mobilenet') {
    model = loadMobileNetStyleModel();
  } else if (modelName === 'inception') {
      model = loadInceptionStyleModel();
  }

  let model2;
  if (model2Name === 'original') {
    model2 = await loadOriginalTransformerModel()
  }
  else if (model2Name === 'separable') {
    model2 = await loadSeparableTransformerModel()
  }

  // this.initalizeWebcamVariables();
  // this.initializeStyleTransfer();
  // this.initializeCombineStyles();

  Promise.all([
    this.loadMobileNetStyleModel(),
    this.loadSeparableTransformerModel(),
  ]).then(([styleNet, transformNet]) => {
    console.log('Loaded styleNet');
    this.styleNet = styleNet;
    this.transformNet = transformNet;
    this.enableStylizeButtons()
  });
}

async function startCombining() {
  await tf.nextFrame();
  console.log('Đang xử lý ảnh 1. Vui lòng chờ ...');
  await tf.nextFrame();
  const bottleneck1 = await tf.tidy(() => {
    return this.styleNet.predict(tf.browser.fromPixels(this.combStyleImg1).toFloat().div(tf.scalar(255)).expandDims());
  })

  this.combineButton.textContent = 'Đang xử lý ảnh 2. Vui lòng chờ ...';
  await tf.nextFrame();
  const bottleneck2 = await tf.tidy(() => {
    return this.styleNet.predict(tf.browser.fromPixels(this.combStyleImg2).toFloat().div(tf.scalar(255)).expandDims());
  });

  this.combineButton.textContent = 'Đang tạo ảnh ...';
  await tf.nextFrame();
  const combinedBottleneck = await tf.tidy(() => {
    const scaledBottleneck1 = bottleneck1.mul(tf.scalar(1 - this.combStyleRatio));
    const scaledBottleneck2 = bottleneck2.mul(tf.scalar(this.combStyleRatio));
    return scaledBottleneck1.addStrict(scaledBottleneck2);
  });

  const stylized = await tf.tidy(() => {
    return this.transformNet.predict([tf.browser.fromPixels(this.combContentImg).toFloat().div(tf.scalar(255)).expandDims(), combinedBottleneck]).squeeze();
  })
  await tf.browser.toPixels(stylized, this.combStylized);
  bottleneck1.dispose();  
  bottleneck2.dispose();
  combinedBottleneck.dispose();
  this.combdisplayModal = stylized
  console.log(this.combdisplayModal)
  // stylized.dispose();
}
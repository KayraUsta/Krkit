import LocalVisionCamera from 'components/VisionCamera.vue'
const install = (app) => {
  app.component('vision-camera', LocalVisionCamera);
}

export {
  LocalVisionCamera
}

const plugin = {
  install
}
export default plugin;




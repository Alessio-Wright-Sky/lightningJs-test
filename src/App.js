import { Lightning, Utils } from '@lightningjs/sdk';

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xff221011,
        rect: true
      },


      Cloud: {
        x: 960,
        y: 300,
        mount: 0.5,
        scale: 0.9,

        w: 540,
        h: 300,
        color: 0xffeeddee,
        src: Utils.asset('images/cloud.png'),
        zIndex: 2,
        shader: { type: Lightning.shaders.Pixelate, size: 80 },
      },

      RainBox: {

        w: 500,
        h: 1080,

        x: 960,
        y: 400,
        mountX: 0.5,
        zIndex: 0,
      },

      Text: {
        x: 970,
        y: 50,

        w: 500,
        h: 200,

        color: 0x88ffffff,

        mountX: 0.5,
        text: {
          text: "Press Enter to Start Raining"
        },
        zIndex: 2
      }

    }
  }


  async _handleEnter() {

    this.tag('Text')
      .animation({
        duration: 7,
        repeat: 0,
        stopMethod: 'immediate',
        actions: [
          { p: 'color', v: { 0.0: 0x88ffffff, 0.1: 0xffffffff, 0.9: 0xffffffff, 1: 0x88ffffff } }
        ]
      }).start()

    this.tag('Cloud')
      .animation({
        duration: 7,
        repeat: 0,
        stopMethod: 'immediate',
        actions: [
          { p: 'color', v: { 0.0: 0xffeeddee, 0.1: 0xffffffff, 0.9: 0xffffffff, 1: 0xffeeddee } }
        ]
      }).start()

    for (let i = 0; i < 500; i++) {

      let distance = Math.random()
      let width = 13 - distance
      let height = 40 - distance * 20

      this.tag('RainBox').add(
        {
          w: width,
          h: height,
          tag: 'drop' + i,

          x: 80 + Math.floor(Math.random() * 350),
          y: 20,
          mountX: 0.5,
          mountY: 1,
          zIndex: 0,
          rect: true,
          color: 0xff0000ff,
          //shader: { type: Lightning.shaders.Pixelate, size: 80 }
        }
      )

      this.tag('drop' + i)
        .animation({
          duration: 1,
          repeat: 0,
          stopMethod: 'immediate',
          actions: [
            { p: 'y', v: { 0.0: 20, 0.5: 200, 0.95: 400 - distance * 40 } },
            { p: 'color', v: { 0.0: 0xff0000ff, 0.95: 0xff0000ff, 1: 0x000000ff } },
            { p: 'w', v: { 0.0: width, 0.9: width, 0.94: width * 5 } },
            { p: 'h', v: { 0.0: height, 0.5: height + 30 - distance * 5, 0.9: height, 0.95: 7 - distance * 4 } }
          ]
        }).start()
      await new Promise(r => setTimeout(r, 10));
    }

  }
}
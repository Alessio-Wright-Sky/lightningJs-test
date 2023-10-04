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


      // if (Math.random() > 0.75) {
      //   lngRects = []
      //   lightning(400, 40, Math.floor(Math.random() * 350), 0, 3)
      //   for (let lngRect of lngRects) {
      //     console.log(lngRect)
      //     let xDiff = lngRect.xEnd - lngRect.xStart
      //     let yDiff = lngRect.yEnd - lngRect.yStart
      //     this.tag('RainBox').add(
      //       {
      //         tag: 'lng' + i,

      //         x: 80 + Math.floor(Math.random() * 350),
      //         y: 20,
      //         w: 5,
      //         h: Math.sqrt(((xDiff) ** 2) + ((yDiff) ** 2)),
      //         mountX: 0.5,

      //         pivotY: 0,
      //         pivotX: 0.5,
      //         //rotation: (Math.PI / (Math.tanh(xDiff / yDiff))),

      //         zIndex: 0,
      //         rect: true,
      //         color: 0xffffff00,
      //       }
      //     )
      //   }
      // }
      await new Promise(r => setTimeout(r, 10));
    }

  }
}

var lngRects = []
function lightning(yMax, yCur, xCur, depth, maxDepth) {
  if (depth > maxDepth) {
    return
  }

  let branch = Math.random() > 0.5 ? true : false
  if (branch === true) {

    let xEnd = Math.floor(Math.random() * 350)
    let yEnd = yMax - ((yMax - yCur) / 2)
    if (yEnd > yMax) {
      yEnd = yMax
    }

    let lngObj = {
      xStart: xCur,
      xEnd: xEnd,
      yStart: yCur,
      yEnd: yEnd,
      tag: "lng-" + (lngRects.length + 1)
    }
    lngRects.push(lngObj)

    lightning(yMax, yEnd, xEnd, depth + 1, maxDepth)
    lightning(yMax, yEnd, xEnd, depth + 1, maxDepth)

  } else {
    let xEnd = Math.floor(Math.random() * 350)
    let yEnd = yMax
    let lngObj = {
      xStart: xCur,
      xEnd: xEnd,
      yStart: yCur,
      yEnd: yEnd,
      tag: "lng-" + (lngRects.length + 1)
    }
    lngRects.push(lngObj)
  }
}
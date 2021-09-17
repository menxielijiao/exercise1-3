import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.spotLight = null
    this.renderer = null

    this.size = {
      windowW: null,
      windowH: null
    }

    this.clock = null

    this.time = {
      total: null,
      delta: null
    }
    this.stats = null

    this.group = new THREE.Group()
  }

  init() {
    this.setSize()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      0.1,
      1000
    )
    this.camera.position.set(0,0,-25)
    this.camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0x000000)
    this.renderer.setSize(this.size.windowW, this.size.windowH)

    document.getElementById('app').appendChild( this.renderer.domElement )

    this.clock = new THREE.Clock()
    this.clock.start()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.scene.add(this.group)
  }

  setSize() {
    this.size = {
      windowW: window.innerWidth,
      windowH: window.innerHeight
    }
  }

  resize(){
    this.setSize();
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  render(){
    this.time.delta = this.clock.getDelta()
    this.time.total += this.time.delta
    this.renderer.render(this.scene, this.camera)
  }

}

export default new Common()

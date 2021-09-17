import './style.css'
import Common from './Common'
import * as THREE from "three"

let cube,icos
const speed = 0.01
const icosRad = 1
const cRad = 5
let locatin = new THREE.Vector3(cRad, cRad, -cRad)
let velocity = new THREE.Vector3(-0.05, -0.09, -0.03)

window.addEventListener('DOMContentLoaded', function() {
  Common.init()
  window.addEventListener('resize', function() {
    Common.resize()
  })

  createCube()
  createIcosahedron()
  loop()
})

function createCube() {
  const n = 10 + icosRad * 2
  const geo = new THREE.BoxGeometry(n, n, n, 10, 10, 10)
  const mat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  })
  cube = new THREE.Mesh( geo, mat)
  Common.group.add(cube)
}

function createIcosahedron() {
  const geo = new THREE.IcosahedronGeometry(icosRad, 2)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
  })
  icos = new THREE.Mesh(geo, mat)
  Common.group.add(icos)
  icos.position.set(locatin.x, locatin.y, locatin.z)
}

function loop() {
  requestAnimationFrame(loop)

  Common.render()

  Common.group.rotation.y += speed * 0.2
  Common.group.rotation.x += speed * 0.2
  Common.group.rotation.z += speed * 0.2

  icos.rotation.x += speed
  icos.rotation.y += speed
  icos.rotation.z += speed

  checkEdgges()
}

function checkEdgges() {
  let iPos = icos.position

  if(iPos.x > cRad || iPos.x < -cRad) velocity.x *= -1
  if(iPos.y > cRad || iPos.y < -cRad) velocity.y *= -1
  if(iPos.z > cRad || iPos.z < -cRad) velocity.z *= -1

  // if(iPos.x > cRad) {
  //   iPos.x = -cRad
  // } else if(iPos.x < -cRad) {
  //   iPos.x = cRad
  // }
  // if(iPos.y > cRad) {
  //   iPos.y = -cRad
  // } else if(iPos.y < -cRad) {
  //   iPos.y = cRad
  // }
  // if(iPos.z > cRad) {
  //   iPos.z = -cRad
  // } else if(iPos.z < -cRad) {
  //   iPos.z = cRad
  // }

  iPos.add(velocity)
}

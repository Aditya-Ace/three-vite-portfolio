import "./style.css"
import spaceURL from "./space.jpg"
import adityaURL from "./aditya.jpg"
import moonURL from "./moon.jpg"
import earthURL from "./earth.jpg"
import normalURL from "./normal.jpg"
import * as THREE from "three"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
})

const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff) //0x is hexadecimal literal 16777215
pointLight.position.set(20, 20, 20)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load(spaceURL)
scene.background = spaceTexture

//Avatar
const adityaTexture = new THREE.TextureLoader().load(adityaURL)

const aditya = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ map: adityaTexture })
)
scene.add(aditya)

//Moon
const moonTexture = new THREE.TextureLoader().load(moonURL)
const normalTexture = new THREE.TextureLoader().load(normalURL)

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
)
scene.add(moon)
moon.position.z = 20
moon.position.setX(-10)

//Moon
const earthTexture = new THREE.TextureLoader().load(earthURL)
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(20, 22, 52),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
)
scene.add(earth)
earth.position.z = -30
earth.position.setX(-10)

function moveCamera() {
  const currentTopPosition = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  aditya.rotation.y += 0.01
  aditya.rotation.z += 0.01

  earth.rotation.x += 0.05
  earth.rotation.y += 0.075
  earth.rotation.z += 0.05

  camera.position.z = currentTopPosition * -0.01
  camera.position.x = currentTopPosition * -0.0002
  camera.position.y = currentTopPosition * -0.0002
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.023
  controls.update()
  renderer.render(scene, camera)
}

animate()

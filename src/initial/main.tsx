import './index.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'




const stats = new Stats()



const gui = new GUI()

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })


const canvas = document.getElementById("canvas") as HTMLElement
// we can pass our canvas inside renderer 


// antialias prop
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
// with our canvas don't need append

document.body.appendChild(stats.dom)


// SCENES
const sceneSky = new THREE.Scene()
const sceneBlue = new THREE.Scene()
sceneBlue.add(new THREE.GridHelper())
sceneBlue.background = new THREE.Color(0x123456)
sceneSky.background = new THREE.CubeTextureLoader().setPath("https://sbcode.net/img/").load(['px.png','nx.png','py.png','ny.png','pz.png','nz.png'])
//sceneSky.backgroundBlurriness = 0.5
// END SCENES


// CAMERA

const camera2 = new THREE.OrthographicCamera(-4, 4, 4, -4, -5, 10)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// camera initial 
camera.position.set(0,2,1)
camera.lookAt(0,0.5,0)
camera.position.z = 1.5

camera2.position.set(1, 1, 1)
camera2.lookAt(0,0.5,0)

// to resize camera according the window size
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera2.updateProjectionMatrix()
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

// END CAMERA



// HELPER FUNCTIONS

let activeScene = sceneBlue

const setScene = {
  sceneA: () => {
    sceneSky.add(cube)
    activeScene = sceneSky
  },
  sceneB: () => {
    
    sceneBlue.add(cube)
    activeScene = sceneBlue
  },
}

// END HELPER FUNCTIONS


const controls = new OrbitControls(camera, renderer.domElement)
// render by demand
controls.addEventListener('change', () => {
  renderer.render(activeScene, camera) // render whenever the OrbitControls changes
})




const cube = new THREE.Mesh(geometry, material)
cube.position.y = 0.5
sceneBlue.add(cube)
sceneBlue.add(new THREE.AxesHelper(5))

// GUI

gui.add(setScene, 'sceneA').name('Scene A')
gui.add(setScene, 'sceneB').name('Scene B')



const cubeFolder = gui.addFolder('Cube')

const positionFolder = cubeFolder.addFolder('Position')
positionFolder.add(cube.position, 'x', -5, 5)
positionFolder.add(cube.position, 'y', -5, 5)
positionFolder.add(cube.position, 'z', -5, 5)
positionFolder.open()


const scaleFolder = cubeFolder.addFolder('Scale')
scaleFolder.add(cube.scale, 'x', -5, 5)
scaleFolder.add(cube.scale, 'y', -5, 5)
scaleFolder.add(cube.scale, 'z', -5, 5)
scaleFolder.open()

const rotationFolder = cubeFolder.addFolder('Rotation')
rotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
rotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
rotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
rotationFolder.open()

//CAMERA GUI

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', -10, 10)
cameraFolder.add(camera.position, 'y', -10, 10)
cameraFolder.add(camera.position, 'z', -10, 10)
cameraFolder.add(camera, 'fov', 0, 180, 0.01).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'aspect', 0.00001, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'near', 0.01, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'far', 0.01, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.open()

// END CAMERA GUI


// CAMERA GUI 2
const camera2Folder = gui.addFolder('Camera2')

camera2Folder.add(camera2, 'left', -10, 0).onChange(() => {
  camera2.updateProjectionMatrix()
})
camera2Folder.add(camera2, 'right', 0, 10).onChange(() => {
  camera2.updateProjectionMatrix()
})
camera2Folder.add(camera2, 'top', 0, 10).onChange(() => {
  camera2.updateProjectionMatrix()
})
camera2Folder.add(camera2, 'bottom', -10, 0).onChange(() => {
  camera2.updateProjectionMatrix()
})
camera2Folder.add(camera2, 'near', -5, 5).onChange(() => {
  camera2.updateProjectionMatrix()
})
camera2Folder.add(camera2, 'far', 0, 10).onChange(() => {
  camera2.updateProjectionMatrix()
})
camera2Folder.open()

// END  CAMERA GUI 2

// END GUI



const clock = new THREE.Clock()

function animate() {

  requestAnimationFrame(animate)

  let delta = clock.getDelta()

  //camera look
  camera.lookAt(0,0.5,0)

  //cube animation
  //cube.rotation.x +=  delta
  //cube.rotation.y +=  delta

  // render
  renderer.render(activeScene, camera)

  //frames and status
  stats.update()
}

animate()
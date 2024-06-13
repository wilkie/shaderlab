import {CodeOrg, BlockWorkspace, Header} from 'libprotolab/layout/CodeOrg'
import {blocklyOptions} from './blocks/'
import {Save, Load, Reset} from 'libprotolab/blockly/workspace/buttons'
import {glslGenerator} from './generators/glslGenerator'
import {getWorkspace} from 'libprotolab/blockly/workspace/workspace'

import texture from '../public/texture.jpg'

import * as Blockly from "blockly";

// @ts-ignore 
import { Canvas } from 'glsl-canvas-js';

function run() {
  const canvas = document.querySelector('canvas');
  const options = {
  };
  const glsl = new Canvas(canvas, options);
  const workspace = getWorkspace()
  glslGenerator.init(workspace);
  if (!glslGenerator.nameDB_) {
    glslGenerator.nameDB_ = new Blockly.Names('');
  }
  const code = glslGenerator.workspaceToCode(workspace);
  console.log("code:", code);
  try {
    glsl.load(code);
  } catch (e) {
    alert(e);
  }
}

const Run = () => (
  <button onClick={() => run()}>Run</button>
)

export const LAB_NAME = "Shaderlab"

const Toolbar = () =>
  <div style={{
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 4,
  }}>
    <Run />
    <Reset />
    <Save />
    <Load />
  </div>

const Output = () =>
  <canvas style={{
    width: '100%',
    height: '100%',
  }} data-textures={texture}></canvas>

const Instructions = () =>
  <div>Instructions</div>

export const Lab = () =>
  <CodeOrg
    header={<Header toolbar=<Toolbar/> />}
    workspace={<BlockWorkspace blocklyOptions={blocklyOptions} />}
    output={<Output/>}
    instructions={<Instructions/>}
  />

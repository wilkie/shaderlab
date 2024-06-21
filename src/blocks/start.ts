import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

import { getWorkspace } from 'libprotolab/blockly/workspace/workspace'

import * as Blockly from "blockly";

export const startBlock = defineBlock({
  type: "start",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "for each pixel",
    colour: 160,
    nextStatement: null,
  }
});

glslGenerator.forBlock['start'] = (
  block: Blockly.Block,
  generator: Blockly.Generator,
): string => {
  // The initial GLSL code
  const nextBlock =
    block.nextConnection && block.nextConnection.targetBlock();

  const nextBlockCode = generator.blockToCode(nextBlock);

  const workspace = getWorkspace();

  const variables = workspace.getAllVariables();
  let declarations = '';
  for (const variable of variables) {
    console.log(variable);
    //console.log(glslGenerator.getVariableName(variable));
    // @ts-ignore
    declarations += (variable.knownType || 'float') + ' ' + variable.name + '; '
  }

  let functions = '';
  if (workspace.getBlocksByType('polarize').length > 0) {
    functions += `
vec2 polarize(vec2 uv) {
  vec2 centered = (uv - 0.5) * 2.0;
  return vec2(length(centered), atan(centered.y, centered.x));
}
`
  }

  if (workspace.getBlocksByType('cartesianize').length > 0) {
    functions += `
vec2 cartesianize(vec2 polar) {
  vec2 centered = vec2(cos(polar.x), sin(polar.x)) * polar.y;
  return (centered / 2.0) + 0.5;
}
`
  }

  if (nextBlock) {
    return '#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution; uniform float u_time; uniform sampler2D u_texture_0; uniform sampler2D u_video; ' + functions + ' void main() { ' + declarations + 'gl_FragColor = vec4(1.0); ' + nextBlockCode + ' }';
  }

  return '';
};

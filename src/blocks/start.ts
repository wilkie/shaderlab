import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

import { getWorkspace } from 'libprotolab/blockly/workspace/workspace'

export const startBlock = defineBlock({
  type: "start",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "for each pixel",
    colour: 160,
    nextStatement: null,
  }
});

glslGenerator.forBlock['start'] = (block, generator) => {
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

  if (nextBlock) {
    return '#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution; uniform float u_time; uniform sampler2D u_texture_0; void main() { ' + declarations + 'gl_FragColor = vec4(1.0); ' + nextBlockCode + ' }';
  }

  return '';
};

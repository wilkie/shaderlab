import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

export const uvBlock = defineBlock({
  type: "uv",
  glslGenerator: (block, generator) => {
  },
  blocklyJSON: {
    message0: 'UV',
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['uv'] = (block, generator) => {
  return ["vec2:(gl_FragCoord.xy / u_resolution.xy)", 0];
};

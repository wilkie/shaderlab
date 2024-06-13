import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

export const uvBlock = defineBlock({
  type: "uv",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: 'UV',
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['uv'] = (_block, _generator) => {
  return ["vec2:(gl_FragCoord.xy / u_resolution.xy)", 0];
};

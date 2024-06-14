import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

export const cameraBlock = defineBlock({
  type: "camera",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "camera",
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['camera'] = (_block, _generator) => {
  return ['sampler2D:u_video', 0];
};

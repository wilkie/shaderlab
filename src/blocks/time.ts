import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

export const timeBlock = defineBlock({
  type: "time",
  glslGenerator: (block, generator) => {
  },
  blocklyJSON: {
    message0: 'TIME',
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['time'] = (block, generator) => {
  return ["float:u_time", 0];
};

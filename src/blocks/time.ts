import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

export const timeBlock = defineBlock({
  type: "time",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: 'TIME',
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['time'] = (_block, _generator) => {
  return ["float:u_time", 0];
};

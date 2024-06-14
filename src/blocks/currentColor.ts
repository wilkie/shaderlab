import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

export const currentColorBlock = defineBlock({
  type: "current_color",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    kind: 'block',
    message0: 'current color',
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['current_color'] = (_block, _generator) => {
  return [`vec4:gl_FragColor`, 0];
};

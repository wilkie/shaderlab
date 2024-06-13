import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue } from '../generators/glslGenerator'

export const setColorBlock = defineBlock({
  type: "set_color",
  glslGenerator: (block, generator) => {
  },
  blocklyJSON: {
    message0: "set color %1",
    args0: [{
      type: 'input_value',
      name: 'SET_COLOR_INPUT',
    }],
    colour: 160,
    previousStatement: null,
    nextStatement: null,
  }
});

glslGenerator.forBlock['set_color'] = (block, generator) => {
  // Pull out the value as a vec4
  const value = getValue(generator.valueToCode(block, 'SET_COLOR_INPUT', 0));
  if (value) {
    return `gl_FragColor = ${value};`;
  }

  // Default to white
  return 'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);';
};

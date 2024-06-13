import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue } from '../generators/glslGenerator'

export const lengthBlock = defineBlock({
  type: "length",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "length of %1",
    args0: [{
      type: 'input_value',
      name: 'LENGTH_VECTOR_INPUT',
    }],
    colour: 160,
    previousStatement: null,
    output: null,
    nextStatement: null,
  }
});

glslGenerator.forBlock['length'] = (block, generator) => {
  // Pull out the value as a vec*
  const coord = getValue(generator.valueToCode(block, 'LENGTH_VECTOR_INPUT', 0)) || 'vec2:vec2(0.0, 0.0)';
  return [`float:length(${coord})`, 0];
};

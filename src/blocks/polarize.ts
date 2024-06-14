import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue } from '../generators/glslGenerator'

export const polarizeBlock = defineBlock({
  type: "polarize",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: 'polarize %1',
    args0: [{
      type: 'input_value',
      name: 'POLARIZE_VECTOR_INPUT',
    }],
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['polarize'] = (block, generator) => {
  // Pull out the value as a vec2
  const value = generator.valueToCode(block, 'POLARIZE_VECTOR_INPUT', 0) || 'vec2:vec2(0.0, 0.0)';
  const coord = getValue(value);
  return [`vec2:polarize(${coord})`, 0];
};

import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue, getType } from '../generators/glslGenerator'

export const normalizeBlock = defineBlock({
  type: "normalize",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "normalize %1",
    args0: [{
      type: 'input_value',
      name: 'NORMALIZE_VECTOR_INPUT',
    }],
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['normalize'] = (block, generator) => {
  // Pull out the value as a vec*
  const value = generator.valueToCode(block, 'NORMALIZE_VECTOR_INPUT', 0) || 'vec2:vec2(0.0, 0.0)';
  const coord = getValue(value);
  const type = getType(value);
  return [`${type}:normalize(${coord})`, 0];
};

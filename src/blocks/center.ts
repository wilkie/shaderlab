import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue, getType } from '../generators/glslGenerator'

export const centerBlock = defineBlock({
  type: "center",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: 'center %1',
    args0: [{
      type: 'input_value',
      name: 'CENTER_VECTOR_INPUT',
    }],
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['center'] = (block, generator) => {
  // Pull out the value as a vec*
  const value = generator.valueToCode(block, 'CENTER_VECTOR_INPUT', 0) || 'vec2:vec2(0.0, 0.0)';
  const coord = getValue(value);
  const type = getType(value);
  return [`${type}:mix(${type}(-1.0), ${type}(1.0), ${coord})`, 0];
};

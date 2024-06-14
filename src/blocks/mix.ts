import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue, getType } from '../generators/glslGenerator'

export const mixBlock = defineBlock({
  type: "mix",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "mix %1 %2 by %3",
    args0: [{
      type: 'input_value',
      name: 'MIX_INPUT_A',
    },{
      type: 'input_value',
      name: 'MIX_INPUT_B',
    },{
      type: 'input_value',
      name: 'MIX_AMOUNT',
    }],
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['mix'] = (block, generator) => {
  // Pull out the value as a vec*
  const a = generator.valueToCode(block, 'MIX_INPUT_A', 0) || 'vec4:vec4(0.0, 0.0, 0.0, 0.0)';
  const b = generator.valueToCode(block, 'MIX_INPUT_B', 0) || 'vec4:vec4(0.0, 0.0, 0.0, 0.0)';
  const c = generator.valueToCode(block, 'MIX_AMOUNT', 0) || 'float:0.5';
  const result_type = getType(a) || getType(b);
  return [`${result_type}:mix(${getValue(a)}, ${getValue(b)}, ${getValue(c)})`, 0];
};

import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue } from '../generators/glslGenerator'

export const cartesianizeBlock = defineBlock({
  type: "cartesianize",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: 'cartesianize angle: %1 length: %2',
    args0: [{
      type: 'input_value',
      name: 'CARTESIANIZE_ANGLE',
    },{
      type: 'input_value',
      name: 'CARTESIANIZE_LENGTH',
    }],
    inputsInline: true,
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['cartesianize'] = (block, generator) => {
  // Pull out the value as a vec2
  const angle = getValue(generator.valueToCode(block, 'CARTESIANIZE_ANGLE', 0) || 'float:0.0');
  const length = getValue(generator.valueToCode(block, 'CARTESIANIZE_LENGTH', 0) || 'float:0.0');
  return [`vec2:cartesianize(vec2(${angle}, ${length}))`, 0];
};

import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue } from '../generators/glslGenerator'

export const truncateBlock = defineBlock({
  type: "truncate",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "%1 %2",
    args0: [{
      type: 'input_value',
      name: 'TRUNCATE_VECTOR_INPUT',
    },{
      type: 'field_dropdown',
      name: 'TRUNCATE_TYPE',
      options: [
        ['x', 'X'],
        ['y', 'Y'],
        ['xy', 'XY'],
        ['r', 'R'],
        ['g', 'G'],
        ['b', 'B'],
        ['a', 'A'],
        ['rg', 'RG'],
        ['rgb', 'RGB'],
        ['rb', 'RB'],
        ['gb', 'GB'],
      ],
    }],
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['truncate'] = (block, generator) => {
  // Pull out the value as a vec*
  const value = generator.valueToCode(block, 'TRUNCATE_VECTOR_INPUT', 0) || 'vec4:vec4(0.0, 0.0, 0.0, 0.0)';
  const coord = getValue(value);
  //const type = getType(value);
  // TODO: expand value to fit desired type

  const operator = block.getFieldValue('TRUNCATE_TYPE');
  const truncation = operator.toLowerCase();
  const result_type = truncation.length == 1 ? 'float' : `vec${truncation.length}`;

  return [`${result_type}:${coord}.${truncation}`, 0];
};

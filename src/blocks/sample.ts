import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue } from '../generators/glslGenerator'

export const sampleBlock = defineBlock({
  type: "sample",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "sample %1 at %2",
    args0: [{
      type: 'input_value',
      name: 'SAMPLE_TEXTURE_INPUT',
    }, {
      type: 'input_value',
      name: 'SAMPLE_COORD_INPUT',
    }],
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['sample'] = (block, generator) => {
  // Pull out the value as a vec4
  const texture = getValue(generator.valueToCode(block, 'SAMPLE_TEXTURE_INPUT', 0));
  console.log('vtc', generator.valueToCode(block, 'SAMPLE_COORD_INPUT', 0));
  const coord = getValue(generator.valueToCode(block, 'SAMPLE_COORD_INPUT', 0));
  console.log('coord: ', coord);
  if (texture && coord) {
    return [`vec4:texture2D(${texture}, fract(${coord}))`, 0];
  }

  // Default to white
  return ['vec4:vec4(1.0, 1.0, 1.0, 1.0)', 0];
};

import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

export const colorBlock = defineBlock({
  type: "color",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    kind: 'block',
    message0: 'color: %1',
    args0: [{
      type: 'field_colour',
      name: 'COLOR',
      colour: '#ff4040',
    }],
    output: null,
    colour: 160,
  }
});

glslGenerator.forBlock['color'] = (block, _generator) => {
  const color = block.getFieldValue('COLOR');
  // Convert #rrggbb to vec4(...)
  const r = parseInt(color.substring(1, 3), 16) / 255.0;
  const g = parseInt(color.substring(3, 5), 16) / 255.0;
  const b = parseInt(color.substring(5, 7), 16) / 255.0;
  return [`vec4:vec4(${r}, ${g}, ${b}, 1.0)`, 0];
};

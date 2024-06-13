import { defineBlock } from "libprotolab/blockly";

import { glslGenerator } from '../generators/glslGenerator'

export const textureBlock = defineBlock({
  type: "texture",
  glslGenerator: (block, generator) => {
  },
  blocklyJSON: {
    message0: "texture %1",
    args0: [{
      type: 'field_dropdown',
      name: 'TEXTURE',
      options: [
        ['rocks', 'ROCKS'],
      ],
    }],
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['texture'] = (block, generator) => {
  return ['sampler2D:u_texture_0', 0];
};

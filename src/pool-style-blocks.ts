import {
  defineBlocksInPoolStyle,
  InputTypes,
  BlockDefinition,
} from "libprotolab/blockly";

import Blockly from "blockly";

const customInputTypes: InputTypes = {
  spritePicker: {
    addInput(_blockly, block, inputConfig, currentInputRow) {
      block.getVars = function () {
        return {
          ["SPRITE"]: [block.getFieldValue(inputConfig.name)],
        };
      };

      currentInputRow
        .appendField(inputConfig.label)
        .appendField(
          new Blockly.FieldVariable(
            null,
            undefined,
            undefined,
            "SPRITE",
            undefined
          ),
          inputConfig.name
        );
    },
    generateCode(block, arg) {
      return `'${block.getFieldValue(arg.name)}'`;
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const blockDefinitions: BlockDefinition[] = [
  {
    category: "Logic",
    // name: "makeBurst",
    pool: "protolab",
    // helperCode: "makeBurst",
    config: {
      func: "makeBurst",
      inline: true,
      blockText: "create {EFFECT} effect with {NUM} {ANIMATION_NAME} sprites",
      style: "sprite_blocks",
      args: [
        {
          name: "NUM",
          type: "Number",
        },
        {
          name: "ANIMATION_NAME",
          customInput: "spritePicker",
        },
        {
          name: "EFFECT",
          options: [
            ["burst", '"burst"'],
            ["pop", '"pop"'],
            ["rain", '"rain"'],
            ["spiral", '"spiral"'],
          ],
        },
      ],
    },
  },
];

console.log("Loading pool-style-blocks");

const categoryToBlockName = defineBlocksInPoolStyle({blockDefinitions, customInputTypes});
export default categoryToBlockName;

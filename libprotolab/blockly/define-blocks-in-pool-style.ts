import { installCustomBlocks } from "./from-cdo/block_utils";
import type { InputTypes, BlockDefinition, BlockNamesByCategory } from "./from-cdo/block_utils";

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

const blockDefinitions: BlockDefinition[] = [
  {
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
        customInput: "costumePicker",
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
];

export function defineBlocksInPoolStyle({blockDefinitions, customInputTypes}: {
  blockDefinitions: BlockDefinition[];
  customInputTypes: InputTypes;
}) : BlockNamesByCategory {
  return installCustomBlocks({
    blockly: Blockly,
    blockDefinitions,
    customInputTypes,
  });
}

// FIXME: remove debug code
(window as any).defineBlocksInPoolStyle = defineBlocksInPoolStyle;

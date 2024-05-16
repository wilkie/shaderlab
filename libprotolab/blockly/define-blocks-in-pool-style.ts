import { installCustomBlocks } from "./from-cdo/block_utils";
import type { InputTypes, BlockDefinition } from "./from-cdo/block_utils";

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

];

export function defineBlocksInPoolStyle() {
  const blocksByCategory = installCustomBlocks({
    blockly: Blockly,
    blockDefinitions,
    customInputTypes,
  });
  return blocksByCategory;
}

// FIXME: remove debug code
(window as any).defineBlocksInPoolStyle = defineBlocksInPoolStyle;

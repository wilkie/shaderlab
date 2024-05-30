import { installCustomBlocks } from "./from-cdo/block_utils";
import type { InputTypes, BlockDefinition, BlockNamesByCategory } from "./from-cdo/block_utils";

import Blockly from "blockly";

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
import Blockly, { Block } from "blockly";
import { JavascriptGenerator, javascriptGenerator, Order } from "blockly/javascript";
export { defineBlocksInPoolStyle } from "./define-blocks-in-pool-style";

export function defineBlock({
  type,
  jsGenerator,
  blocklyJSON,
  init: init,
}: {
  type: string;
  jsGenerator: (
    block: Block,
    generator: JavascriptGenerator
  ) => string | [string, Order];
  blocklyJSON?: object;
  init?: (block: Block) => void;
}) {
  if (init) {
    Blockly.Blocks[type] = {
      init: function () {
        init.bind(this)(this);
      },
    };
  } else {
    blocklyJSON = { ...blocklyJSON, type: type };
    Blockly.Blocks[type] = {
      init: function () {
        this.jsonInit(blocklyJSON);
      },
    };
  }
  javascriptGenerator[type] = jsGenerator;

  return {
    kind: "block",
    type: type,
  };
}

import Blockly, { Block } from "blockly";
import { JavascriptGenerator, javascriptGenerator } from "blockly/javascript";

type BlocklyJSGenerator = (block: Block, generator: JavascriptGenerator) => any;

export function defineBlock(
  blockType: string,
  jsGenerator: BlocklyJSGenerator,
  blockJSON: object,
) {
  blockJSON = { ...blockJSON, type: blockType };
  Blockly.Blocks[blockType] = {
    init: function () {
      this.jsonInit(blockJSON);
    },
  };
  javascriptGenerator[blockType] = jsGenerator;

  return {
    kind: "block",
    type: blockType,
  }
}

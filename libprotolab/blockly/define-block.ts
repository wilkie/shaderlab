import Blockly, { Block } from "blockly";
import { JavascriptGenerator, javascriptGenerator, Order } from "blockly/javascript";
export { defineBlocksInPoolStyle } from "./define-blocks-in-pool-style";

type JSCodeString = string;
type Precedence = Order;

// For generating JS values, see: https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/values/basic-implementation
type JSValue = [JSCodeString, Precedence];

// For generating JS statements, see: https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/statements/basic-implementation
type JSStatement = JSCodeString;

// Generates the JS code for a given custom block, the JS code can either
// define a JS statement, or a JS value.
type BlocklyJSGenerator = (block: Block, generator: JavascriptGenerator) => JSValue | JSStatement;

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

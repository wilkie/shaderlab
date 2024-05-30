import Blockly, { Block } from "blockly";
import { JavascriptGenerator, javascriptGenerator, Order } from "blockly/javascript";
export { defineBlocksInPoolStyle } from "./define-blocks-in-pool-style";

export type JSCodeString = string;

// For generating JS values, see: https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/values/basic-implementation
export type JSValue = [JSCodeString, Order];

// For generating JS statements, see: https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/statements/basic-implementation
export type JSStatement = JSCodeString;

// Generates the JS code for a given custom block, the JS code can either
// define a JS statement, or a JS value.
export type BlocklyJSGenerator = (block: Block, generator: JavascriptGenerator) => JSValue | JSStatement;

export type BlockJSON = object;
export type InitializerFunc = (block: Block) => void;

export function defineBlock(
  type: string,
  jsGenerator: BlocklyJSGenerator,
  definition: BlockJSON | InitializerFunc
) {
  if (definition instanceof Function) {
    Blockly.Blocks[type] = {
      init: function () {
        definition(this);
      },
    };
  } else {
    const blockJSON = { ...definition, type: type };
    Blockly.Blocks[type] = {
      init: function () {
        this.jsonInit(blockJSON);
      },
    };
  }
  javascriptGenerator[type] = jsGenerator;

  return {
    kind: "block",
    type: type,
  };
}

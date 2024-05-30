import { defineBlock } from "libprotolab/blockly";

// This is an example of a `statement` block with one input:
// https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/statements/basic-implementation
export const alertBlock = defineBlock({
  type: "alert",
  jsGenerator: (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);

    // Statement blocks are just a string of the JS you want to generate:
    return `alert(${value})`;
  },
  init: function (block) {
    block.appendValueInput("VALUE").setCheck("String").appendField("alert");

    block.setPreviousStatement(true);
    block.setNextStatement(true);

    block.setColour(160);
    block.setTooltip("Display an alert box with the provided text.");
  },
});

import { defineBlock, Order } from "libprotolab/blockly";

// This is an example of a `value` block with one input:
// https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/values/basic-implementation
export const toUpperCaseBlock = defineBlock({
  type: "toUpperCase",
  jsGenerator: (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);

    // Value blocks are the string of the JS you want to generate, AND an operator precedence:
    // https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/values/operator-precedence
    return [`(${value}).toUpperCase()`, Order.NONE];
  },
  init: function (block) {
    block
      .appendValueInput("VALUE")
      .setCheck("String")
      .appendField("toUpperCase");

    block.setOutput(true, "String");

    block.setColour(160);
    block.setTooltip("Display an alert box with the provided text.");
  },
});

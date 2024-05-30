import { defineBlock, Order } from "libprotolab/blockly";

import "./pool-style-blocks";

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
    block.appendValueInput("VALUE")
      .setCheck("String")
      .appendField("alert");

    block.setPreviousStatement(true);
    block.setNextStatement(true);

    block.setColour(160);
    block.setTooltip("Display an alert box with the provided text.");
  }
});

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
    block.appendValueInput("VALUE")
      .setCheck("String")
      .appendField("toUpperCase");

    block.setColour(160);
    block.setTooltip("Display an alert box with the provided text.");
  }
});

// You can also define blocks using blocklyJSON instead of an init function:
export const alertBlock2 = defineBlock({
  type: "alert2",
  jsGenerator: (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);

    // Statement blocks are just a string of the JS you want to generate
    return `alert(${value})`;
  },
  blocklyJSON: {
    message0: "alert2 %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "String",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    colour: 160,
    tooltip: "Display an alert box with the provided text.",
  }
});

export const here = defineBlock(
  "here",
  (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);
    return [`(${value}).length`, 0];
  },
  {
    message0: "here %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "String",
      },
    ],
    output: "Number",
    colour: 160,
    tooltip: "Returns number of letters in the provided text.",
  }
);

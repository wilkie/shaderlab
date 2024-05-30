import { defineBlock, Order } from "libprotolab/blockly";

import "./pool-style-blocks";

// This is an example of a `statement` block with one input:
// https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/statements/basic-implementation
export const alertBlock = defineBlock(
  "alert",
  (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);

    // Statement blocks are just a string of the JS you want to generate
    return `alert(${value})`;
  },
  {
    message0: "alert %1",
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
);

// This is an example of a `value` block with one input:
// https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/values/basic-implementation
export const toUpperCaseBlock = defineBlock(
  "toUpperCase",
  (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);

    // Value blocks require both the generated JS, and specifying an operator precedence:
    // https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/values/operator-precedence
    return [`(${value}).toUpperCase()`, Order.NONE];
  },
  {
    message0: "toUpperCase %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "String",
      },
    ],
    output: "String",
    colour: 160,
    tooltip: "Converts the provided text to uppercase.",
  }
);

export const blocks = defineBlock(
  "blocks",
  (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);
    return [`(${value}).length`, 0];
  },
  {
    message0: "blocks %1",
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

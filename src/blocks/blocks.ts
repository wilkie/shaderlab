import { defineBlock } from "libprotolab/blockly";

import "./pool-style-blocks";

export const alert = defineBlock(
  "alert",
  (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);
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

export const custom = defineBlock(
  "custom",
  (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);
    return [`(${value}).length`, 0];
  },
  {
    message0: "custom %1",
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

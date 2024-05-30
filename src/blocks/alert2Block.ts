import { defineBlock } from "libprotolab/blockly";

// You can also define blocks using blocklyJSON instead of an init function:
export const alert2Block = defineBlock({
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
  },
});

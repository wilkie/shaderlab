import { defineBlock, BlocklyOptions, ToolboxDefinition } from "libprotolab/blockly";

import {
  includeStockCategories,
  StockCategory,
} from "libprotolab/blockly/stockBlocks";
import { getLabName } from "libprotolab/lab-name";

import './pool-style-blocks'

const your = defineBlock(
  "your",
  (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", 0);
    return [`(${value}).length`, 0];
  },
  {
    message0: "your %1",
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
    tooltip: "Returns number of letters in the provided text.",
  }
);

const custom = defineBlock(
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

const blocks = defineBlock(
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

const here = defineBlock(
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

export const toolbox: ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: getLabName(),
      categorystyle: "logic_category",
      contents: [
        your,
        custom,
        blocks,
        here,
      ],
    },
    ...includeStockCategories([
      StockCategory.Logic,
      StockCategory.Loops,
      StockCategory.Math,
      StockCategory.Text,
      StockCategory.Lists,
      StockCategory.Variables,
      StockCategory.Functions,
    ]),
  ],
};

// For options, see: https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface
export const blocklyOptions: BlocklyOptions = {
  toolbox,
};

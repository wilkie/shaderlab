import { BlocklyOptions } from "blockly";
import { ToolboxDefinition } from "blockly/core/utils/toolbox";
import {
  includeStockCategories,
  StockCategory,
} from "libprotolab/blockly/stockBlocks";
import { getLabName } from "libprotolab/lab-name";

export const toolbox: ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: getLabName(),
      categorystyle: "logic_category",
      contents: [
        {
          kind: "block",
          type: "controls_if",
        },
        {
          kind: "block",
          type: "logic_compare",
        },
        {
          kind: "block",
          type: "controls_whileUntil",
        },
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

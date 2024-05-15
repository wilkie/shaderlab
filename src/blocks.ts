import { BlocklyOptions } from "blockly";
import { ToolboxDefinition } from "blockly/core/utils/toolbox";
import {
  includeStockCategories,
  StockCategory,
} from "libprotolab/blockly/stockBlocks";

export const toolbox: ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "My Blocks",
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


// See: https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface
export const blocklyOptions: BlocklyOptions = {
  toolbox,
  trashcan: false,
};

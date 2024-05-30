import { alertBlock, toUpperCaseBlock, blocks, here } from "./blocks";

import { ToolboxDefinition } from "libprotolab/blockly";
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
      contents: [alertBlock, toUpperCaseBlock, blocks, here],
    },
    // You can add/remove specific stock block categories here
    // or remove this line to disable all stock blocks
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

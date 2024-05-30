// Organize blocks as category folders
import category1Blocks from "./category1";

// Or import block by block
import {alert2Block} from "./alert2Block";

import "./pool-style-blocks";

import { ToolboxDefinition } from "libprotolab/blockly";
import {
  includeStockCategories,
  StockCategory,
} from "libprotolab/blockly/stockBlocks";

export const toolbox: ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Category 1",
      categorystyle: "logic_category",
      contents: category1Blocks,
    },
    {
      kind: "category",
      name: "Category 2",
      categorystyle: "logic_category",
      contents: [
        alert2Block,
      ],
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

// Organize blocks as category folders
//import category1Blocks from "./category1";

// Or import block by block
//import {alert2Block} from "./alert2Block";

import "./pool-style-blocks";

import { ToolboxDefinition } from "libprotolab/blockly";
import {
  includeStockCategories,
  StockCategory,
} from "libprotolab/blockly/stockBlocks";

import {registerFieldColour} from '@blockly/field-colour';
registerFieldColour();

import { startBlock } from "./start";
import { setColorBlock } from "./setColor";
import { colorBlock } from "./color";
import { currentColorBlock } from "./currentColor";
import { sampleBlock } from "./sample";
import { lengthBlock } from "./length";
import { normalizeBlock } from "./normalize";
import { truncateBlock } from "./vectors";
import { mixBlock } from "./mix";
import { textureBlock } from "./texture";
import { uvBlock } from "./uv";
import { timeBlock } from "./time";

export const toolbox: ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Basic",
      categorystyle: "logic_category",
      contents: [
        startBlock,
        setColorBlock,
        colorBlock,
        currentColorBlock,
        sampleBlock,
        textureBlock,
        uvBlock,
        timeBlock,
      ],
    },
    {
      kind: "category",
      name: "Vector",
      categorystyle: "logic_category",
      contents: [
        lengthBlock,
        normalizeBlock,
        truncateBlock,
        mixBlock,
      ],
    },
    /*
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
    },*/
    // You can add/remove specific stock block categories here
    // or remove this line to disable all stock blocks
    ...includeStockCategories([
      StockCategory.Logic,
      //StockCategory.Loops,
      StockCategory.Math,
      //StockCategory.Text,
      //StockCategory.Lists,
      StockCategory.Variables,
      //StockCategory.Functions,
    ]),
  ],
};

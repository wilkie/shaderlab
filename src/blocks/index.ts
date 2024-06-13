import {BlocklyOptions} from "libprotolab/blockly";
import {toolbox} from "./toolbox";

import Blockly from "blockly";

class GLSLConstantProvider extends Blockly.blockRendering.ConstantProvider {
  constructor() {
    // Set up all of the constants from the base provider.
    super();
    
    // Add hats
    this.ADD_START_HATS = true;
  }
}

class GLSLRenderer extends Blockly.blockRendering.Renderer {
  constructor() {
    super();
  }

  /**
   * @override
   */
  makeConstants_() {
    return new GLSLConstantProvider();
  }
}

Blockly.blockRendering.unregister('glsl_renderer');
Blockly.blockRendering.register('glsl_renderer', GLSLRenderer);

// For options, see: https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface
export const blocklyOptions: BlocklyOptions = {
  renderer: 'glsl_renderer',
  toolbox,
};

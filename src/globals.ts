// This file is a good place to set global variables (window.whatever)
// very useful for debugging in the JS console.

import Blockly from 'blockly';

const _window = window as any;

// Set window.Blockly for easy debugging / hacking
_window.Blockly = Blockly;

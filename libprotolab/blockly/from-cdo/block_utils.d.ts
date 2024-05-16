
// This type was derived from a JSDoc for InputConfig in block_utils.js:
type InputConfig = {
  name: string; // Input name, conventionally all-caps
  options: string[][] | (() => string[][]); // For dropdowns, list of options or function that generates them, each entry is a 2-element string array with the display name first and the codegen-compatible value second (i.e., strings should be doubly-quoted)
  type: Blockly.BlockValueType; // For value inputs, the type required. Use Blockly.BlockValueType.NONE to accept any block
  statement: boolean; // Indicates that an input is a statement input, which is passed as a callback function
  customInput?: string; // Use the customInput type under this name to add this input to the block
  field: boolean; // Indicates that an input is a field input, i.e., a textbox. The generated code will be wrapped in quotes if the arg has type "String"
  dummy: boolean; // Indicates that an input should be a dummy input, does not render a connection or generate code. Useful as a line break or to add an image to a block
  assignment: boolean; // Indicates that this block should generate an assignment statement, with this input yielding the variable name
  defer: boolean; // Indicates that this input should be wrapped in a function before being passed into func, so that evaluation can be deferred until later
  variableInput: boolean; // Indicates that an input is a variable. The block will have a dropdown selector populated with all the variables in the program. The generated code will be the variable, which will be defined as a global variable in the program

  // Added manually to make this a LabeledInputConfig?
  label: string;
};

// For examples of this type, see STANDARD_INPUT_TYPES in block_utils.js
type InputType = {
  addInputRow?: (
    blockly: typeof Blockly,
    block: Blockly.Block,
    inputConfig: InputConfig
  ) => Blockly.Input;
  addInput?: (
    blockly: typeof Blockly,
    block: Blockly.Block,
    inputConfig: InputConfig,
    currentInputRow: Blockly.Input
  ) => void;
  generateCode: (block: any, arg: { name: string }) => string;
};

type InputTypes = {
  [key: string]: InputType;
};

type BlockDefinition = {
  color: number[]; // HSV block color as a 3-element number array
  func?: string; // For function/method calls, the function name
  expression?: string; // Instead of specifying func, use this param to specify an arbitrary javascript expression
  orderPrecedence?: number; // For expressions, the minimum binding strength of any operators in the expression. Code generator will just wrap the expression in parens if omitted
  name?: string; // Block name, defaults to func
  blockText: string; // Human-readable text to show on the block, with params specified in curly braces
  args: InputConfig[]; // List of block inputs
  returnType?: Blockly.BlockValueType; // Type of value returned by this block, omit if you want a block with no output
  strictOutput?: boolean; // Whether to enforce strict type checking on the output
  methodCall?: boolean; // Generate a method call. The blockText should contain '{THIS}' in order to create an input for the instance
  objectType?: string; // Type used for the 'THIS' input in a method call block
  thisObject?: string; // Specify an explicit `this` for method call
  eventBlock?: boolean; // Generate an event block, which is just a block without a previous statement connector
  eventLoopBlock?: boolean; // Generate an "event loop" block, which looks like a loop block but without previous or next statement connectors
  inline?: boolean; // Render inputs inline, defaults to false
  simpleValue?: boolean; // Just return the field value of the block
  extraArgs?: string[]; // Additional arguments to pass into the generated function
  callbackParams?: string[]; // Parameters to add to the generated callback function
  miniToolboxBlocks?: string[]; // List of blocks for a mini toolbox
  helperCode?: string; // The block's helper code, to verify the func
};

export function installCustomBlocks(args: {
  blockly: typeof Blockly;
  blockDefinitions: BlockDefinition[];
  customInputTypes: InputTypes;
}): any;

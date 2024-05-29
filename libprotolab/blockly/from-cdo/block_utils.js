/* eslint-disable @typescript-eslint/no-unused-vars */

import Blockly from "blockly";
import cdoBlockStyles from './cdoBlockStyles';

import { javascriptGenerator } from "blockly/javascript";
Blockly.JavaScript = javascriptGenerator;

export const EMPTY_OPTION = '???';

const styleTypes = Object.keys(cdoBlockStyles);

const DROPDOWN_INPUT = 'dropdown';
const VALUE_INPUT = 'value';
const INLINE_DUMMY_INPUT = 'inlineDummy';
const DUMMY_INPUT = 'dummy';
const STATEMENT_INPUT = 'statement';
const FIELD_INPUT = 'field';
const VARIABLE_INPUT = 'variable';

/**
 * Splits a blockText into labelled inputs, each match will a label followed by
 * an input. The label is an arbitrary (possibly empty) string. The input is
 * either a real named input like '{VALUE}', a newline, or if it matched a
 * trailing label, nothing.
 */
const LABELED_INPUTS_REGEX = /.*?({[^}]*}|\n|$)/gm;

/**
 * Splits a labeled input into its parts. The resulting groups are:
 * 1: the label
 * 2: the input (a named input like '{VALUE}', a newline, or nothing)
 * 3: the input's name (e.g. 'VALUE')
 */
const LABELED_INPUT_PARTS_REGEX = /(.*?)({([^}]*)}|\n|$)/m;

/**
 * Finds the input config for the given input name, and removes it from args.
 * @param {InputConfig[]} args List of configs to search through
 * @param {string} inputName name of input to find and remove
 * @param {string} blockText original block text used for metrics reporting in the case of a missing input
 * @returns InputConfig the input config with name `inputName`
 */
const findAndRemoveInputConfig = (args, inputName, blockText) => {
  if (args.length === 0) {
    console.log({
      event: 'BLOCK_MISSING_INPUT',
      message: `${inputName} not found in args. No args remaining.`,
      blockText,
    });
    return null;
  }

  let argIndex = args.findIndex(arg => arg.name === inputName);
  if (argIndex === -1) {
    // In the case of a missing input, default to the first available arg.
    // We're assuming that the order of the inputs in args matches the order in the block text.
    argIndex = 0;
    console.log({
      event: 'BLOCK_MISSING_INPUT',
      message: `${inputName} not found in args. Defaulting to ${args[argIndex].name}`,
      blockText,
    });
  }
  return args.splice(argIndex, 1)[0];
};

/**
 * Given block text with input names specified in curly braces, returns a list
 * of labeled inputs that should be added to the block.
 *
 * @param {string} text The complete message shown on the block with inputs in
 *   curly braces, e.g. "Move the {SPRITE} {PIXELS} to the {DIR}"
 * @param {InputConfig[]} args Define the type/options of the block's inputs.
 * @params {string[]} strictTypes Input/output types that are always configerd
 *   with strict type checking.
 *
 * @returns {LabeledInputConfig[]} a list of labeled inputs
 */
const determineInputs = function (text, args, strictTypes = []) {
  const tokens = text.match(LABELED_INPUTS_REGEX);
  if (tokens.length && tokens[tokens.length - 1] === '') {
    tokens.pop();
  }
  const inputs = tokens.map(token => {
    const parts = token.match(LABELED_INPUT_PARTS_REGEX);
    const label = parts[1];
    const inputName = parts[3];
    if (inputName) {
      const arg = findAndRemoveInputConfig(args, inputName, text);
      if (arg === null) {
        // If no valid arg was found, just use the label.
        return {
          mode: DUMMY_INPUT,
          label,
        };
      }
      const strict = arg.strict || strictTypes.includes(arg.type);
      let mode;
      if (arg.options) {
        mode = DROPDOWN_INPUT;
      } else if (arg.field) {
        mode = FIELD_INPUT;
      } else if (arg.customInput) {
        mode = arg.customInput;
      } else if (arg.statement) {
        mode = STATEMENT_INPUT;
      } else if (arg.dummy) {
        mode = arg.inline ? INLINE_DUMMY_INPUT : DUMMY_INPUT;
      } else if (arg.variableInput) {
        mode = VARIABLE_INPUT;
      } else {
        mode = VALUE_INPUT;
      }
      const labeledInput = {
        name: arg.name,
        mode,
        label,
        strict,
        type: arg.type,
        options: arg.options,
        assignment: arg.assignment,
        defer: arg.defer,
        customOptions: arg.customOptions,
      };
      Object.keys(labeledInput).forEach(key => {
        if (labeledInput[key] === undefined) {
          delete labeledInput[key];
        }
      });
      return labeledInput;
    } else {
      return {
        mode: DUMMY_INPUT,
        label,
      };
    }
  });
  const statementInputs = args
    .filter(arg => arg.statement)
    .map(arg => ({
      mode: STATEMENT_INPUT,
      name: arg.name,
    }));
  inputs.push(...statementInputs);
  args = args.filter(arg => !arg.statement);

  /*
  if (args.length > 0) {
    MetricsReporter.logWarning({
      event: 'BLOCK_UNEXPECTED_ARGS',
      args,
      blockText: text,
    });
  }
  */
  return inputs;
};

const groupInputsByRow = function (inputs, inputTypes = STANDARD_INPUT_TYPES) {
  const inputRows = [];
  let lastGroup = [];
  inputRows.push(lastGroup);
  inputs.forEach(input => {
    lastGroup.push(input);
    if (inputTypes[input.mode].addInputRow) {
      lastGroup = [];
      inputRows.push(lastGroup);
    }
  });
  const lastRow = inputRows[inputRows.length - 1];
  if (inputRows[inputRows.length - 1].length) {
    lastRow.push({ mode: DUMMY_INPUT });
  } else {
    inputRows.pop();
  }
  return inputRows;
};

/**
 * Adds the specified inputs to the block
 * @param {Blockly} blockly The Blockly object provided to install()
 * @param {Block} block The block to add the inputs to
 * @param {LabeledInputConfig[][]} inputs The list of inputs to interpolate,
 *   grouped by row.
 * @param {Object.<string, InputType>} inputTypes A map of input type names to
 *   their definitions,
 * @param {boolean} inline Whether inputs are being rendered inline
 */
const interpolateInputs = function (
  blockly,
  block,
  inputRows,
  inputTypes = STANDARD_INPUT_TYPES,
  inline
) {
  inputRows.forEach(inputRow => {
    // Create the last input in the row first
    const lastInputConfig = inputRow[inputRow.length - 1];
    const lastInput = inputTypes[lastInputConfig.mode].addInputRow(
      blockly,
      block,
      lastInputConfig
    );

    // Append the rest of the inputs onto that
    inputRow.slice(0, -1).forEach(inputConfig => {
      inputTypes[inputConfig.mode].addInput(
        blockly,
        block,
        inputConfig,
        lastInput
      );
    });

    // Finally append the last input's label
    lastInput.appendField(lastInputConfig.label);
  });
};

/**
 * @type {Object.<string, InputType>}
 */
const STANDARD_INPUT_TYPES = {
  [VALUE_INPUT]: {
    addInputRow(blockly, block, inputConfig) {
      const inputRow = block
        .appendValueInput(inputConfig.name)
        .setAlign(blockly.ALIGN_RIGHT);
      if (inputConfig.strict) {
        inputRow.setStrictCheck(inputConfig.type);
      } else {
        inputRow.setCheck(inputConfig.type);
      }
      return inputRow;
    },
    generateCode(block, inputConfig) {
      return Blockly.JavaScript.valueToCode(
        block,
        inputConfig.name,
        Blockly.JavaScript.ORDER_COMMA
      );
    },
  },
  [STATEMENT_INPUT]: {
    addInputRow(blockly, block, inputConfig) {
      return block.appendStatementInput(inputConfig.name);
    },
    generateCode(block, inputConfig) {
      const code = Blockly.JavaScript.statementToCode(block, inputConfig.name);
      return `function () {\n${code}}`;
    },
  },
  [INLINE_DUMMY_INPUT]: {
    addInput(blockly, block, inputConfig, currentInputRow) {
      if (inputConfig.customOptions && inputConfig.customOptions.assetUrl) {
        currentInputRow
          .appendField(inputConfig.label)
          .appendField(
            new Blockly.FieldImage(
              Blockly.assetUrl(inputConfig.customOptions.assetUrl),
              inputConfig.customOptions.width,
              inputConfig.customOptions.height
            )
          );
      }
    },
    generateCode(block, inputConfig) {
      return null;
    },
  },
  [DUMMY_INPUT]: {
    addInputRow(blockly, block, inputConfig) {
      return block.appendEndRowInput();
    },
    generateCode(block, inputConfig) {
      return null;
    },
  },
  [DROPDOWN_INPUT]: {
    addInput(blockly, block, inputConfig, currentInputRow) {
      const options = sanitizeOptions(inputConfig.options);
      const dropdown = new blockly.FieldDropdown(options);
      currentInputRow
        .appendField(inputConfig.label)
        .appendField(dropdown, inputConfig.name);
    },
    generateCode(block, inputConfig) {
      let code = block.getFieldValue(inputConfig.name);
      if (
        (inputConfig.type === Blockly.BlockValueType.STRING ||
          code === EMPTY_OPTION) &&
        !code.startsWith('"') &&
        !code.startsWith("'")
      ) {
        // Wraps the value in quotes, and escapes quotes/newlines
        code = JSON.stringify(code);
      }
      return code;
    },
  },
  [VARIABLE_INPUT]: {
    addInput(blockly, block, inputConfig, currentInputRow) {
      // Make sure the variable name gets declared at the top of the program
      block.getVars = function () {
        return {
          [Blockly.Variables.DEFAULT_CATEGORY]: [
            block.getFieldValue(inputConfig.name),
          ],
        };
      };

      // Add the variable field to the block
      currentInputRow
        .appendField(inputConfig.label)
        .appendField(new Blockly.FieldVariable(null), inputConfig.name);
    },
    generateCode(block, inputConfig) {
      return Blockly.JavaScript.translateVarName(
        block.getFieldValue(inputConfig.name)
      );
    },
  },
  [FIELD_INPUT]: {
    addInput(blockly, block, inputConfig, currentInputRow) {
      const { type } = inputConfig;
      const field = Blockly.cdoUtils.getField(type);
      currentInputRow
        .appendField(inputConfig.label)
        .appendField(field, inputConfig.name);
    },
    generateCode(block, inputConfig) {
      let code = block.getFieldValue(inputConfig.name);
      if (inputConfig.type === Blockly.BlockValueType.STRING) {
        // Wraps the value in quotes, and escapes quotes/newlines
        code = JSON.stringify(code);
      }
      return code;
    },
  },
};

/**
 * Create a block generator that creates blocks that directly map to a javascript
 * function call, method call, or other (hopefully simple) expression.
 *
 * @params {Blockly} blockly The Blockly object provided to install()
 * @params {string[]} strictTypes Input/output types that are always configerd
 *   with strict type checking.
 * @params {string} defaultObjectType Default type used for the 'THIS' input in
 *   method call blocks.
 * @param {Object.<string,InputType>} customInputTypes customType input
 *   definitions.
 * @returns {function} A function that takes a bunch of block properties and
 *   adds a block to the blockly.Blocks object. See param documentation below.
 */
export const createJsWrapperBlockCreator = function (
  blockly,
  strictTypes,
  defaultObjectType,
  customInputTypes
) {
  const { ORDER_FUNCTION_CALL, ORDER_MEMBER, ORDER_NONE } = Blockly.JavaScript;

  const generator = javascriptGenerator;

  const inputTypes = {
    ...STANDARD_INPUT_TYPES,
    ...customInputTypes,
  };

  /**
   * Create a block that directly maps to a javascript function call, method
   * call, or other (hopefully simple) expression.
   *
   * @param {Object} opts Block options
   * @param {number[]} opts.color HSV block color as a 3-element number array
   * @param {string} opts.func For function/method calls, the function name
   * @param {string} opts.expression Instead of specifying func, use this param
   *   to specify an arbitrary javascript expression instead
   * @param {number} opts.orderPrecedence For expressions, the minimum binding
   *   strength of any operators in the expression. You can omit this, and the
   *   code generator code will just wrap the expression in parens, see:
   *   https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence
   * @param {string} opts.name Block name, defaults to func.
   * @param {string} opts.blockText Human-readable text to show on the block,
   *   with params specified in curly braces, see determineInputs()
   * @param {InputConfig[]} opts.args List of block inputs.
   * @param {BlockValueType} opts.returnType Type of value returned by this
   *   block, omit if you want a block with no output.
   * @param {boolean} opts.strictOutput Whether to enforce strict type checking
   *   on the output.
   * @param {boolean} opts.methodCall Generate a method call. The blockText
   *   should contain '{THIS}' in order to create an input for the instance
   * @params {string} opts.objectType Type used for the 'THIS' input in a method
   *   call block.
   * @param {string} opts.thisObject Specify an explicit `this` for method call.
   * @param {boolean} opts.eventBlock Generate an event block, which is just a
   *   block without a previous statement connector.
   * @param {boolean} opts.eventLoopBlock Generate an "event loop" block, which
   *   looks like a loop block but without previous or next statement connectors
   * @param {boolean} opts.inline Render inputs inline, defaults to false
   * @param {boolean} opts.simpleValue Just return the field value of the block.
   * @param {string[]} opts.extraArgs Additional arguments to pass into the generated function.
   * @param {string[]} opts.callbackParams Parameters to add to the generated callback function.
   * @param {string[]} opts.miniToolboxBlocks
   * @param {?string} helperCode The block's helper code, to verify the func.
   *
   * @returns {string} the name of the generated block
   */
  return (
    {
      color,
      style,
      func,
      expression,
      orderPrecedence,
      name,
      blockText,
      args,
      returnType,
      strictOutput,
      methodCall,
      objectType,
      thisObject,
      eventBlock,
      eventLoopBlock,
      inline,
      simpleValue,
      extraArgs,
      callbackParams,
      miniToolboxBlocks,
      docFunc,
    },
    helperCode,
    pool
  ) => {
    if (!pool || pool === 'GamelabJr') {
      pool = 'gamelab'; // Fix for users who already have the old blocks saved in their solutions.
      // TODO: when we nuke per-level custom blocks, `throw new Error('No block pool specified');`
    }
    if (!!func + !!expression + !!simpleValue !== 1) {
      throw new Error(
        'Provide exactly one of func, expression, or simpleValue'
      );
    }
    if (
      func &&
      helperCode &&
      !new RegExp(`function ${func}\\W`).test(helperCode)
    ) {
      throw new Error(`func '${func}' not found in helper code`);
    }
    if ((expression || simpleValue) && !name) {
      throw new Error('This block requires a name');
    }
    if (blockText === undefined) {
      throw new Error('blockText must be specified');
    }
    if (
      simpleValue &&
      (!args || args.filter(arg => !arg.assignment).length !== 1)
    ) {
      throw new Error(
        'simpleValue blocks must have exactly one non-assignment argument'
      );
    }
    if (simpleValue && !returnType && !args.some(arg => arg.assignment)) {
      throw new Error(
        'simpleValue blocks must specify a return type or have ' +
        'an assignment input'
      );
    }
    if (inline === undefined) {
      inline = true;
    }

    if (style && !styleTypes.includes(style)) {
      // Attempt to guess the intended styles based on the first three letters.
      const bestGuess =
        styleTypes[
        styleTypes.findIndex(type =>
          type.startsWith(style.toLowerCase().slice(0, 3))
        )
        ];
      throw new Error(
        `"${style}" is not a valid style for ${name || func}. ` +
        (bestGuess
          ? `Did you mean "${bestGuess}"?`
          : `Choose one of [${styleTypes.sort().join(', ')}]`)
      );
    }

    args = args || [];
    if (args.filter(arg => arg.statement).length > 1 && inline) {
      console.warn('blocks with multiple statement inputs cannot be inlined');
      inline = false;
    }
    args.forEach(arg => {
      if (arg.customInput && inputTypes[arg.customInput] === undefined) {
        throw new Error(
          `${arg.customInput} is not a valid input type, ` +
          `choose one of [${Object.keys(customInputTypes).join(', ')}]`
        );
      }
    });
    const blockName = `${pool}_${name || func}`;
    if (eventLoopBlock && args.filter(arg => arg.statement).length === 0) {
      // If the eventloop block doesn't explicitly list its statement inputs,
      // just tack one onto the end.
      let argsCopy = [...args];
      // argsCopy is used to avoid a 'TypeError: Cannot add property 2, object is not extensible'
      // that occurs for lab2 labs since `levelProperties` for lab2 is stored in Redux.
      argsCopy.push({
        name: 'DO',
        statement: true,
      });
      args = argsCopy;
    }
    const inputs = [...args];
    if (methodCall && !thisObject) {
      const thisType =
        objectType || defaultObjectType || Blockly.BlockValueType.NONE;
      inputs.push({
        name: 'THIS',
        type: thisType,
        strict: strictTypes.includes(thisType),
      });
    }
    const inputConfigs = determineInputs(blockText, inputs, strictTypes);
    const inputRows = groupInputsByRow(inputConfigs, inputTypes);
    if (inputRows.length === 1) {
      inline = false;
    }

    blockly.Blocks[blockName] = {
      // helpUrl: getHelpUrl(docFunc), // optional param
      init: function () {
        // Apply style or color to block as needed, based on Blockly version.
        Blockly.cdoUtils.handleColorAndStyle(this, color, style, returnType);

        if (returnType) {
          this.setOutput(
            true,
            returnType,
            strictOutput || strictTypes.includes(returnType)
          );
        } else if (eventLoopBlock) {
          // No previous or next statement connector
        } else if (eventBlock) {
          this.setNextStatement(true);
          this.skipNextBlockGeneration = true;
        } else {
          this.setNextStatement(true);
          this.setPreviousStatement(true);
        }

        // Boolean constant to store when we show mini-toolbox.
        // Use window.appOptions, not global appOptions, because the levelbuilder
        // block page doesn't have appOptions, but we *do* want to show the mini-toolbox
        // there.
        const showMiniToolbox =
          miniToolboxBlocks &&
          (!window.appOptions || window.appOptions.level.miniToolbox);

        let flyoutToggleButton;
        if (showMiniToolbox) {
          flyoutToggleButton =
            Blockly.customBlocks.initializeMiniToolbox.bind(this)(
              miniToolboxBlocks
            );
        }

        Blockly.customBlocks.setUpBlockShadowing.bind(this)();

        interpolateInputs(blockly, this, inputRows, inputTypes, inline);
        this.setInputsInline(inline);

        if (showMiniToolbox) {
          Blockly.customBlocks.appendMiniToolboxToggle.bind(this)(
            miniToolboxBlocks,
            flyoutToggleButton
          );
        }
      },
    };

    generator[blockName] = function () {
      let prefix = '';
      const values = args
        .map(arg => {
          const inputConfig = inputConfigs.find(
            input => input.name === arg.name
          );
          if (!inputConfig) {
            return;
          }
          let inputCode = inputTypes[inputConfig.mode].generateCode(
            this,
            inputConfig
          );
          if (inputConfig.assignment) {
            prefix += `${inputCode} = `;
          }
          if (inputCode === '') {
            // Missing inputs should be passed into func as undefined
            inputCode = 'undefined';
          }
          if (inputConfig.defer) {
            inputCode = `function () {\n  return ${inputCode};\n}`;
          }
          return inputCode;
        })
        .filter(value => value !== null);

      if (extraArgs) {
        values.push(...extraArgs);
      }

      if (simpleValue) {
        const code = prefix + values[args.findIndex(arg => !arg.assignment)];
        if (returnType !== undefined) {
          return [
            code,
            orderPrecedence === undefined ? ORDER_NONE : orderPrecedence,
          ];
        } else {
          return code + ';\n';
        }
      }

      if (methodCall) {
        const object =
          thisObject ||
          Blockly.JavaScript.valueToCode(this, 'THIS', ORDER_MEMBER);
        prefix += `${object}.`;
      }

      if (eventBlock) {
        const nextBlock =
          this.nextConnection && this.nextConnection.targetBlock();
        let handlerCode = Blockly.JavaScript.blockToCode(nextBlock, false);
        handlerCode = Blockly.Generator.prefixLines(handlerCode, '  ');
        if (callbackParams) {
          let params = callbackParams.join(',');
          values.push(`function (${params}) {\n${handlerCode}}`);
        } else {
          values.push(`function () {\n${handlerCode}}`);
        }
      }

      if (
        this.type === 'gamelab_setPrompt' ||
        this.type === 'gamelab_setPromptWithChoices'
      ) {
        const input = this.getInput('VAR');
        if (input) {
          const targetBlock = input.connection.targetBlock();
          if (targetBlock && targetBlock.type === 'variables_get') {
            const varName = Blockly.JavaScript.blockToCode(targetBlock)[0];
            values.push(`function(val) {${varName} = val;}`);
          }
        }
      }

      if (expression) {
        // If the original expression has a value placeholder, replace it
        // with the selected value.
        let valueExpression = expression.replace('VALUE', values[0]);
        if (returnType !== undefined) {
          return [
            `${prefix}${valueExpression}`,
            orderPrecedence === undefined ? ORDER_NONE : orderPrecedence,
          ];
        } else {
          return `${prefix}${valueExpression}`;
        }
      }

      if (returnType !== undefined) {
        return [`${prefix}${func}(${values.join(', ')})`, ORDER_FUNCTION_CALL];
      } else {
        return `${prefix}${func}(${values.join(', ')});\n`;
      }
    };

    return blockName;
  };
};

export const installCustomBlocks = function ({
  blockly,
  blockDefinitions,
  customInputTypes,
}) {
  const createJsWrapperBlock = createJsWrapperBlockCreator(
    blockly,
    [
      // // Strict Types
      // blockly.BlockValueType.SPRITE,
      // blockly.BlockValueType.BEHAVIOR,
      // blockly.BlockValueType.LOCATION,
    ],
    null,
    // blockly.BlockValueType.SPRITE,
    customInputTypes
  );

  const blocksByCategory = {};
  blockDefinitions.forEach(({ name, pool, category, config, helperCode }) => {
    const blockName = createJsWrapperBlock(config, helperCode, pool);
    if (!blocksByCategory[category]) {
      blocksByCategory[category] = [];
    }
    blocksByCategory[category].push(blockName);
    if (name && blockName !== name) {
      console.error(
        `Block config ${name} generated a block named ${blockName}`
      );
    }
  });

  return blocksByCategory;
};

/**
 * Adds a second value to options array elements if a second one does not exist.
 * The second value is used as the generated code for that option.
 * Required for backwards compatibility with existing blocks that are missing the second value.
 *
 * @param  {string[][]| string[]} dropdownOptions
 * @returns {string[][]} Sanitized array of dropdownOptions, ensuring that both a first and second value exist
 */
const sanitizeOptions = function (dropdownOptions) {
  return dropdownOptions.map(option =>
    option.length === 1 ? [option[0], option[0]] : option
  );
};
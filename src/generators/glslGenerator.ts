import * as Blockly from "blockly";

import { getWorkspace } from 'libprotolab/blockly/workspace/workspace'

export const glslGenerator = new Blockly.Generator("GLSL");

export function getType(value: any) {
  if (value && value.indexOf(':') >= 0) {
    if (value[0] == '(') {
      value = value.substring(1);
    }
    return value.split(':')[0];
  }

  return null;
}

export function coerceType(a: any, b: any) {
  const typeA = getType(a);
  const typeB = getType(b);

  return typeA || typeB;
}

export function getValue(value: any) {
  if (value.indexOf(':') >= 0) {
    if (value[0] == '(') {
      return '(' + value.substring(value.indexOf(':') + 1);
    }
    return value.substring(value.indexOf(':') + 1);
  }

  return value;
}

// Order and some of the block generation is borrowed from the JavascriptGenerator
// class and implementation which is part of the Blockly source code.

export enum Order {
  ATOMIC = 0,            // 0 "" ...
  FUNCTION_CALL = 2,     // ()
  INCREMENT = 3,         // ++
  DECREMENT = 3,         // --
  BITWISE_NOT = 4.1,     // ~
  UNARY_PLUS = 4.2,      // +
  UNARY_NEGATION = 4.3,  // -
  LOGICAL_NOT = 4.4,     // !
  VOID = 4.6,            // void
  MULTIPLICATION = 5.1,  // *
  DIVISION = 5.2,        // /
  MODULUS = 5.3,         // %
  SUBTRACTION = 6.1,     // -
  ADDITION = 6.2,        // +
  BITWISE_SHIFT = 7,     // << >> >>>
  RELATIONAL = 8,        // < <= > >=
  EQUALITY = 9,          // == !=
  BITWISE_AND = 10,      // &
  BITWISE_XOR = 11,      // ^
  BITWISE_OR = 12,       // |
  LOGICAL_AND = 13,      // &&
  LOGICAL_OR = 14,       // ||
  CONDITIONAL = 15,      // ?:
  ASSIGNMENT = 16,       // = += -= **= *= /= %= <<= >>= ...
  COMMA = 18,            // ,
  NONE = 99,             // (...)
};

// @ts-ignore
glslGenerator.scrub_ = function(block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();

  if (block.type == 'start') {
    thisOnly = true;
  }

  if (nextBlock && !thisOnly) {
    return code + glslGenerator.blockToCode(nextBlock);
  }

  return code;
}

export function math_single(
  block: Blockly.Block,
  generator: Blockly.Generator,
): [string, Order] {
  // Math operators with single operand.
  const operator = block.getFieldValue('OP');
  let code;
  let arg;
  if (operator === 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = generator.valueToCode(block, 'NUM', Order.UNARY_NEGATION) || '0.0';
    if (arg[0] === '-') {
      // --3 is not legal in JS.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Order.UNARY_NEGATION];
  }
  if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
    arg = generator.valueToCode(block, 'NUM', Order.DIVISION) || '0.0';
  } else {
    arg = generator.valueToCode(block, 'NUM', Order.NONE) || '0.0';
  }

  arg = getValue(arg);

  // Ensure it is a float
  if (arg && arg.indexOf('.') == -1 && arg.match(/^[-]?\d+$/)) {
    arg = arg + '.0';
  }

  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'log(' + arg + ')';
      break;
    case 'EXP':
      code = 'exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'pow(10.0, ' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'sin(' + arg + ')';
      break;
    case 'COS':
      code = 'cos(' + arg + ')';
      break;
    case 'TAN':
      code = 'tan(' + arg + ')';
      break;
  }
  if (code) {
    return [code, Order.FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'LOG10':
      code = 'log(' + arg + ') / log(10.0)';
      break;
    case 'ASIN':
      code = 'asin(' + arg + ')';
      break;
    case 'ACOS':
      code = 'acos(' + arg + ')';
      break;
    case 'ATAN':
      code = 'atan(' + arg + ')';
      break;
    default:
      throw Error('Unknown math operator: ' + operator);
  }
  return [code, Order.DIVISION];
}

glslGenerator.forBlock['math_trig'] = math_single;
glslGenerator.forBlock['math_round'] = math_single;
glslGenerator.forBlock['math_single'] = math_single;

glslGenerator.forBlock['math_number'] = (
  block: Blockly.Block,
  _generator: Blockly.Generator,
): [string, Order] => {
  // Numeric value.
  const number = Number(block.getFieldValue('NUM'));
  const order = number >= 0 ? Order.ATOMIC : Order.UNARY_NEGATION;
  let ret = String(number);
  if (ret && ret.indexOf('.') == -1 && ret.match(/^[-]?\d+$/)) {
    ret = ret + '.0';
  }
  return [ret, order];
};

glslGenerator.forBlock['math_arithmetic'] = (
  block: Blockly.Block,
  generator: Blockly.Generator,
): [string, Order] => {
  // Basic arithmetic operators, and power.
  const OPERATORS: Record<string, [string | null, Order]> = {
    'ADD': [' + ', Order.ADDITION],
    'MINUS': [' - ', Order.SUBTRACTION],
    'MULTIPLY': [' * ', Order.MULTIPLICATION],
    'DIVIDE': [' / ', Order.DIVISION],
    'POWER': [null, Order.NONE], // Handle power separately.
  };
  type OperatorOption = keyof typeof OPERATORS;
  const tuple = OPERATORS[block.getFieldValue('OP') as OperatorOption];
  const operator = tuple[0];
  const order = tuple[1];
  const argument0 = generator.valueToCode(block, 'A', order) || 'float:0.0';
  const argument1 = generator.valueToCode(block, 'B', order) || 'float:0.0';
  let code;
  // Power in GLSL requires a special case since it has no operator.
  if (!operator) {
    code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Order.FUNCTION_CALL];
  }
  code = coerceType(argument0, argument1) + ':' + getValue(argument0) + operator + getValue(argument1);
  return [code, order];
};

glslGenerator.forBlock['math_constant'] = (
  block: Blockly.Block,
  _generator: Blockly.Generator,
): [string, Order] => {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  const CONSTANTS: Record<string, string> = {
    'PI': String(Math.PI),
    'TAU': String(Math.PI * 2.0),
    'HALF_PI': String(Math.PI / 2.0),
    'E': String(Math.E),
    'GOLDEN_RATIO': String((1 + Math.sqrt(5)) / 2),
    'SQRT2': String(Math.SQRT2),
    'SQRT1_2': String(Math.SQRT1_2),
    'INFINITY': '(1. / 0.)',
  };
  type ConstantOption = keyof typeof CONSTANTS;
  return ['float:' + CONSTANTS[block.getFieldValue('CONSTANT') as ConstantOption], Order.ATOMIC];
};

glslGenerator.forBlock['variables_set'] = (
  block: Blockly.Block,
  generator: Blockly.Generator,
): string => {
  const workspace = getWorkspace();

  // Variable setter.
  const argument0 =
    generator.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || 'float:0.0';
  const type0 = getType(argument0);
  const varID = block.getFieldValue('VAR');

  console.log(varID);
  let variable = workspace.getVariableById(varID);
  const varName = variable?.name;

  // @ts-ignore 
  variable.knownType = type0;

  console.log(varName);
  console.log(block.getFieldValue('VAR'));
  return varName + ' = ' + getValue(argument0) + ';\n';
};

glslGenerator.forBlock['variables_get'] = (
  block: Blockly.Block,
  _generator: Blockly.Generator,
): [string, Order] => {
  const workspace = getWorkspace();

  // Variable setter.
  const varID = block.getFieldValue('VAR');
  let variable = workspace.getVariableById(varID);
  // @ts-ignore
  const type0 = variable.knownType || 'float';
  const varName = variable?.name;
  return [type0 + ':' + varName, Order.ATOMIC];
}

glslGenerator.forBlock['controls_if'] = (
  block: Blockly.Block,
  generator: Blockly.Generator,
): string => {
  // If/elseif/else condition.
  let n = 0;
  let code = '';
  if (generator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += generator.injectId(generator.STATEMENT_PREFIX, block);
  }
  do {
    const conditionCode =
      generator.valueToCode(block, 'IF' + n, Order.NONE) || 'false';
    let branchCode = generator.statementToCode(block, 'DO' + n);
    if (generator.STATEMENT_SUFFIX) {
      branchCode =
        generator.prefixLines(
          generator.injectId(generator.STATEMENT_SUFFIX, block),
          generator.INDENT,
      ) + branchCode;
    }
    code +=
      (n > 0 ? ' else ' : '') +
      'if (' +
      conditionCode +
      ') {\n' +
      branchCode +
      '}';
    n++;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || generator.STATEMENT_SUFFIX) {
    let branchCode = generator.statementToCode(block, 'ELSE');
    if (generator.STATEMENT_SUFFIX) {
      branchCode =
        generator.prefixLines(
          generator.injectId(generator.STATEMENT_SUFFIX, block),
          generator.INDENT,
      ) + branchCode;
    }
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

glslGenerator.forBlock['controls_ifelse'] = glslGenerator.forBlock['controls_if'];

glslGenerator.forBlock['logic_compare'] = (
  block: Blockly.Block,
  generator: Blockly.Generator,
): [string, Order] => {
  // Comparison operator.
  const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>=',
  };
  type OperatorOption = keyof typeof OPERATORS;
  const operator = OPERATORS[block.getFieldValue('OP') as OperatorOption];
  const order =
    operator === '==' || operator === '!=' ? Order.EQUALITY : Order.RELATIONAL;
  const argument0 = generator.valueToCode(block, 'A', order) || '0';
  const argument1 = generator.valueToCode(block, 'B', order) || '0';
  const code = getValue(argument0) + ' ' + operator + ' ' + getValue(argument1);
  return [code, order];
};

export function math_modulo(
  block: Blockly.Block,
  generator: Blockly.Generator,
): [string, Order] {
  // Remainder computation.
  const argument0 =
    generator.valueToCode(block, 'DIVIDEND', Order.MODULUS) || '0';
  const argument1 =
    generator.valueToCode(block, 'DIVISOR', Order.MODULUS) || '0';
  const code = `mod(${getValue(argument0)}, ${getValue(argument1)})`;
  return [code, Order.MODULUS];
}

glslGenerator.forBlock['math_modulo'] = math_modulo;

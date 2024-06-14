import { defineBlock } from "libprotolab/blockly";

import { glslGenerator, getValue } from '../generators/glslGenerator'

export const truncateBlock = defineBlock({
  type: "truncate",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "%1 %2",
    args0: [{
      type: 'input_value',
      name: 'TRUNCATE_VECTOR_INPUT',
    },{
      type: 'field_dropdown',
      name: 'TRUNCATE_TYPE',
      options: [
        ['x', 'X'],
        ['y', 'Y'],
        ['xy', 'XY'],
        ['r', 'R'],
        ['g', 'G'],
        ['b', 'B'],
        ['a', 'A'],
        ['rg', 'RG'],
        ['rgb', 'RGB'],
        ['rb', 'RB'],
        ['gb', 'GB'],
      ],
    }],
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['truncate'] = (block, generator) => {
  // Pull out the value as a vec*
  const value = generator.valueToCode(block, 'TRUNCATE_VECTOR_INPUT', 0) || 'vec4:vec4(0.0, 0.0, 0.0, 0.0)';
  const coord = getValue(value);
  //const type = getType(value);
  // TODO: expand value to fit desired type

  const operator = block.getFieldValue('TRUNCATE_TYPE');
  const truncation = operator.toLowerCase();
  const result_type = truncation.length == 1 ? 'float' : `vec${truncation.length}`;

  return [`${result_type}:${coord}.${truncation}`, 0];
};

export const buildVec2Block = defineBlock({
  type: "build_vec2",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "vector x: %1 y: %2",
    args0: [{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_X',
    },{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_Y',
    }],
    inputsInline: true,
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['build_vec2'] = (block, generator) => {
  const a = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_X', 0) || 'float:0.0'
  const b = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_Y', 0) || 'float:0.0'

  return [`vec2:vec2(${getValue(a)}, ${getValue(b)})`, 0];
};

export const buildVec3Block = defineBlock({
  type: "build_vec3",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "vector r: %1 g: %2 b: %3",
    args0: [{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_R',
    },{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_G',
    },{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_B',
    }],
    inputsInline: true,
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['build_vec3'] = (block, generator) => {
  const a = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_R', 0) || 'float:0.0'
  const b = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_G', 0) || 'float:0.0'
  const c = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_B', 0) || 'float:0.0'

  return [`vec3:vec3(${getValue(a)}, ${getValue(b)}, ${getValue(c)})`, 0];
};

export const buildVec4Block = defineBlock({
  type: "build_vec4",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "vector r: %1 g: %2 b: %3 a: %4",
    args0: [{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_R',
    },{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_G',
    },{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_B',
    },{
      type: 'input_value',
      name: 'BUILD_VECTOR_INPUT_A',
    }],
    inputsInline: true,
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['build_vec4'] = (block, generator) => {
  const a = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_R', 0) || 'float:0.0'
  const b = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_G', 0) || 'float:0.0'
  const c = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_B', 0) || 'float:0.0'
  const d = generator.valueToCode(block, 'BUILD_VECTOR_INPUT_A', 0) || 'float:0.0'

  return [`vec4:vec4(${getValue(a)}, ${getValue(b)}, ${getValue(c)}, ${getValue(d)})`, 0];
};

export const rotateBlock = defineBlock({
  type: "rotate",
  jsGenerator: (_b, _g) => {return '';},
  blocklyJSON: {
    message0: "rotate %1 by %2",
    args0: [{
      type: 'input_value',
      name: 'ROTATE_VECTOR',
    },{
      type: 'input_value',
      name: 'ROTATE_ANGLE',
    }],
    inputsInline: true,
    colour: 160,
    output: null,
  }
});

glslGenerator.forBlock['rotate'] = (block, generator) => {
  const vector = generator.valueToCode(block, 'ROTATE_VECTOR', 0) || 'vec2:(0.0, 0.0)'
  const angle = generator.valueToCode(block, 'ROTATE_ANGLE', 0) || 'float:0.0'

  const v = getValue(vector);
  const th = getValue(angle);

  return [`vec2:vec2((${v}.x * cos(${th})) - (${v}.y * sin(${th})), (${v}.x * sin(${th})) + (${v}.y * cos(${th})))`, 0];
};

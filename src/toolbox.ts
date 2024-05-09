// const toolbox = {
//   "kind": "flyoutToolbox",
//   "contents": [
//     {
//       "kind": "block",
//       "type": "controls_if"
//     },
//     {
//       "kind": "block",
//       "type": "controls_whileUntil"
//     }
//   ]
// }

export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Core",
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
          "kind": "block",
          "type": "controls_whileUntil"
        },
      ],
    },
    {
      kind: "category",
      name: "Custom",
      contents: [
        {
          kind: "block",
          type: "start",
        },
        {
          kind: "category",
          name: "Move",
          contents: [
            {
              kind: "block",
              type: "move_forward",
            },
          ],
        },
        {
          kind: "category",
          name: "Turn",
          contents: [
            {
              kind: "block",
              type: "turn_left",
            },
          ],
        },
      ],
    },
  ],
};

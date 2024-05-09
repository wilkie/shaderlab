import {CodeOrg, Blocks, Header, Output} from './layout/CodeOrg'

const toolbox = {
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "controls_if"
    },
    {
      "kind": "block",
      "type": "controls_whileUntil"
    }
  ]
}

export default function Lab() {
  return (
    <CodeOrg
      header={<Header toolbar={<span>TOOLBAR</span>} />}
      blocks={<Blocks blocklyOptions={{toolbox}} />}
      output={<Output />}
    />
  )
}

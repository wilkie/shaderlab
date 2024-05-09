import React, { useEffect, useRef } from 'react'
import Blockly from 'blockly'

interface BlocksProps {
  blocklyOptions?: Blockly.BlocklyOptions;
}

export const BlockWorkspace: React.FC<BlocksProps> = ({blocklyOptions={}}) => {
  const blocklyRef = useRef(null)

  blocklyOptions = {
    scrollbars: false,
    trashcan: true,
    // collapse: true,
    // comments: true,
    // sounds: false,
    // grid: {
    //   spacing: 20,
    //   length: 3,
    //   colour: '#ccc',
    //   snap: true,
    // },
    // zoom: {
    //   controls: true,
    //   wheel: true,
    //   startScale: 1.0,
    //   maxScale: 3,
    //   minScale: 0.3,
    //   scaleSpeed: 1.2,
    // },
    ...blocklyOptions,
  }

  useEffect(() => {
    let workspace: Blockly.WorkspaceSvg | null = null

    if (blocklyRef.current) {
      workspace = Blockly.inject(blocklyRef.current, blocklyOptions)
      const resizeObserver = new ResizeObserver(() => Blockly.svgResize(workspace!));
      resizeObserver.observe(blocklyRef.current);  
    }
    
    return () => {
      if (workspace) {
        workspace.dispose()
      }
    }
  }, [blocklyOptions])

  return (
    <div ref={blocklyRef} style={{
      height: 'calc(100% - 50px)',
    }}/>
  )
}

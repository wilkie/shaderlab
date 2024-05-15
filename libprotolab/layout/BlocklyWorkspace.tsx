import React, { useEffect, useRef } from 'react'
import Blockly from 'blockly'
import { setWorkspace } from 'libprotolab/blockly/workspace';

interface BlocksProps {
  blocklyOptions?: Blockly.BlocklyOptions;
}

/*
const state = Blockly.serialization.workspaces.save(myWorkspace);
Blockly.serialization.workspaces.load(state, myWorkspace);
*/

export const BlocklyWorkspace: React.FC<BlocksProps> = ({blocklyOptions={}}) => {
  const blocklyRef = useRef(null)

  blocklyOptions = {
    scrollbars: true,
    trashcan: false,
    ...blocklyOptions,
  }

  useEffect(() => {
    let workspace: Blockly.WorkspaceSvg | null = null

    if (blocklyRef.current) {
      workspace = Blockly.inject(blocklyRef.current, blocklyOptions)
      setWorkspace(workspace)
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

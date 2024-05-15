import Blockly from "blockly";
export { run } from './run'

let workspace: Blockly.Workspace | null = null;

export function setWorkspace(_workspace: Blockly.Workspace) {
  workspace = _workspace;
}

export function getWorkspace() {
  if (!workspace) throw "Workspace not set";
  return workspace;
}

export function save(saveName: string = "workspace") {
  const state = Blockly.serialization.workspaces.save(getWorkspace());
  console.log("State is: ", state, "Workspace is: ", getWorkspace(), "Save name is: ", saveName);
  localStorage.setItem(saveName, JSON.stringify(state));
}

export function load(saveName: string = "workspace") {
  const state = localStorage.getItem(saveName);
  if (state) {
    Blockly.serialization.workspaces.load(JSON.parse(state), getWorkspace());
  } else {
    alert(`Couldn't find a saved workspace named: ${saveName}`)
  }
}

export function listOfSaveNames() {
  return Object.keys(localStorage);
}
import Blockly from "blockly";
export { run } from './run'

const DEFAULT_SAVE_NAME = "default";

let workspace: Blockly.Workspace | null = null;
let saveName = new URLSearchParams(window.location.search).get("saveName");

export function setWorkspace(_workspace: Blockly.Workspace) {
  workspace = _workspace;
  load();
}

export function getWorkspace() {
  if (!workspace) throw "Workspace not set";
  return workspace;
}

export function save() {
  saveName =
    prompt("Save as:", saveName || DEFAULT_SAVE_NAME) || DEFAULT_SAVE_NAME;
  const state = Blockly.serialization.workspaces.save(getWorkspace());
  localStorage.setItem(saveName, JSON.stringify(state));

  // Update the URL
  const url = new URL(window.location.href);
  url.searchParams.set("saveName", saveName);
  window.history.pushState({}, "", url.toString());
}

export function load() {
  if (!saveName) return;

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
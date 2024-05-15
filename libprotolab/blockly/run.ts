import { javascriptGenerator } from "blockly/javascript";
import { getWorkspace } from "./workspace";

export function run() {
  const workspace = getWorkspace()
  javascriptGenerator.addReservedWords("code");
  const code = javascriptGenerator.workspaceToCode(workspace);
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}

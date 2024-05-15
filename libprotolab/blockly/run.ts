import { javascriptGenerator } from "blockly/javascript";
import { getWorkspace } from "./workspace";

export function run() {
  const workspace = getWorkspace()
  console.log(javascriptGenerator);
  console.log(workspace);
  javascriptGenerator.addReservedWords("code");
  const code = javascriptGenerator(workspace);
  console.log(code);
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}

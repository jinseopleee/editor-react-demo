import { AlignCenter } from "./AlignCenter";
import { AlignLeft } from "./AlignLeft";
import { AlignRight } from "./AlignRight";
import { Clear } from "./Clear";
import { Bold } from "./Bold";
import { Italic } from "./Italic";
import { Link } from "./Link";
import { Strike } from "./Strike";
import { Underline } from "./Underline";
import { UL } from "./UL";
import { OL } from "./OL";
import { Undo } from "./Undo";
import { File } from "./File";
import { Image } from "./Image";
import { Redo } from "./Redo";
import { usePrettyEditorContext } from "../context";
import { bold } from "../extensions/extension-bold";
import { italic } from "../extensions/extension-italic";
import { underline } from "../extensions/extension-underline";
import { strike } from "../extensions/extension-strike";
import { align } from "../extensions/extension-align";
import { history } from "../extensions/extension-history";

export const PrettyEditorToolbar = () => {
  const { editor } = usePrettyEditorContext();

  return (
    <div style={{ display: 'flex', gap: '2px', padding: '2px 0' }}>
      {bold.commands.canUse(editor) && <Bold />}
      {italic.commands.canUse(editor) && <Italic />}
      {underline.commands.canUse(editor) && <Underline />}
      {strike.commands.canUse(editor) && <Strike />}
      <Link />
      <Image />
      <File />
      <UL />
      <OL />
      {align.commands.canUse(editor) && <AlignLeft />}
      {align.commands.canUse(editor) && <AlignCenter />}
      {align.commands.canUse(editor) && <AlignRight />}
      <Clear />
      {history.commands.canUse(editor) && <Undo />}
      {history.commands.canUse(editor) && <Redo />}
    </div>
  )
}

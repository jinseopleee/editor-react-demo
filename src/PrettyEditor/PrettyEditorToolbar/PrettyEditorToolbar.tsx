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
import { Prev } from "./Prev";
import { File } from "./File";
import { Image } from "./Image";
import { Next } from "./Next";
import { usePrettyEditorContext } from "../context";

export const PrettyEditorToolbar = () => {
  const { editor } = usePrettyEditorContext();

  return (
    <div style={{ display: 'flex', gap: '2px', padding: '2px 0' }}>
      {editor.state.schema.marks.bold && <Bold />}
      <Italic />
      <Underline />
      <Strike />
      <Link />
      <Image />
      <File />
      <UL />
      <OL />
      <AlignLeft />
      <AlignCenter />
      <AlignRight />
      <Clear />
      <Prev />
      <Next />
    </div>
  )
}

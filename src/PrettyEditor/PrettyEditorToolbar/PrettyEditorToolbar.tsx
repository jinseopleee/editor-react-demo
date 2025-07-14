import { Bold } from "./Bold";
import { Italic } from "./Italic";

export const PrettyEditorToolbar = () => {
  return (
    <div style={{ display: 'flex', gap: '2px', padding: '2px 0' }}>
      <Bold />
      <Italic />
    </div>
  )
}

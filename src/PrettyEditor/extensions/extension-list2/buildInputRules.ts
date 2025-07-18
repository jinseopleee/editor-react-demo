import type { Schema } from "prosemirror-model";
import { smartQuotes, ellipsis, emDash, wrappingInputRule, inputRules } from "prosemirror-inputrules";


export const buildInputRules = (schema: Schema) => {
  const rules = smartQuotes.concat(ellipsis, emDash);
  
  if (schema.nodes.orderedList) {
    rules.push(
      wrappingInputRule(
        /^(\d+)\.\s$/,
        schema.nodes.orderedList,
        match => ({order: +match[1]}),
        (match, node) => node.childCount + node.attrs.order == +match[1]
      )
    );
  }

  if (schema.nodes.bulletList) {
    rules.push(wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bulletList));
  }

  return inputRules({ rules });
}

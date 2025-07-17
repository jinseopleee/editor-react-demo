import type { Schema } from "prosemirror-model";
import { smartQuotes, ellipsis, emDash, wrappingInputRule, inputRules } from "prosemirror-inputrules";


export const buildInputRules = (schema: Schema) => {
  const rules = smartQuotes.concat(ellipsis, emDash);
  
  if (schema.nodes.ordered_list) {
    rules.push(
      wrappingInputRule(
        /^(\d+)\.\s$/,
        schema.nodes.ordered_list,
        match => ({order: +match[1]}),
        (match, node) => node.childCount + node.attrs.order == +match[1]
      )
    );
  }

  if (schema.nodes.bullet_list) {
    rules.push(wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bullet_list));
  }

  return inputRules({ rules });
}
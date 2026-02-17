import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const selectionPreviewPluginKey = new PluginKey('selectionPreview')

export const SelectionPreviewExtension = Extension.create({
  name: 'selectionPreview',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: selectionPreviewPluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply(tr, old) {
            const meta = tr.getMeta(selectionPreviewPluginKey)
            if (meta === 'clear') return DecorationSet.empty
            if (meta && meta.from != null && meta.to != null) {
              return DecorationSet.create(tr.doc, [
                Decoration.inline(meta.from, meta.to, {
                  class: 'selection-preview',
                }),
              ])
            }
            return old.map(tr.mapping, tr.doc)
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})

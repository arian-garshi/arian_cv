import {defineType} from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'no',
      title: 'Norwegian',
      type: 'text',
      rows: 4,
    },
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: {
      en: 'en',
      no: 'no',
    },
    prepare({en, no}) {
      const text = en || no || 'Untitled'
      return {
        title: text.length > 80 ? text.substring(0, 80) + '...' : text,
      }
    },
  },
})

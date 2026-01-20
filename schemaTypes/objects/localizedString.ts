import {defineType} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'no',
      title: 'Norwegian',
      type: 'string',
    },
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
  ],
  preview: {
    select: {
      en: 'en',
      no: 'no',
    },
    prepare({en, no}) {
      return {
        title: en || no || 'Untitled',
      }
    },
  },
})

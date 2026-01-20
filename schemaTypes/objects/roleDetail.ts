import {defineType} from 'sanity'

export const roleDetail = defineType({
  name: 'roleDetail',
  title: 'Role Detail',
  type: 'object',
  fields: [
    {
      name: 'no',
      title: 'Norwegian',
      type: 'text',
      rows: 3,
    },
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      en: 'en',
      no: 'no',
    },
    prepare({en, no}) {
      const text = en || no || 'Detail'
      return {
        title: text.length > 60 ? text.substring(0, 60) + '...' : text,
      }
    },
  },
})

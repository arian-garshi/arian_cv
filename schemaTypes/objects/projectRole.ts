import {defineType} from 'sanity'

export const projectRole = defineType({
  name: 'projectRole',
  title: 'Project Role',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Role Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Main description of what you did in this role',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'roleDetail'}],
      description: 'Additional bullet points with specific achievements or tasks',
    },
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleNo: 'title.no',
    },
    prepare({titleEn, titleNo}) {
      return {
        title: titleEn || titleNo || 'Untitled Role',
      }
    },
  },
})

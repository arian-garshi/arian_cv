import {defineType, defineField} from 'sanity'

export const freelance = defineType({
  name: 'freelance',
  title: 'Freelance Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localizedString',
      description: 'Header for the freelance section',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [{type: 'localizedText'}],
      description: 'Overview paragraphs about your freelance work',
    }),
    defineField({
      name: 'clientProjects',
      title: 'Client Projects',
      type: 'array',
      of: [{type: 'freelanceClientProject'}],
      description: 'List of freelance client projects',
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleNo: 'title.no',
      projects: 'clientProjects',
    },
    prepare({titleEn, titleNo, projects}) {
      const count = projects?.length || 0
      return {
        title: titleEn || titleNo || 'Freelance Work',
        subtitle: `${count} client project${count === 1 ? '' : 's'}`,
      }
    },
  },
})

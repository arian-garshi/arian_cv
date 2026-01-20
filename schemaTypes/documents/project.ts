import {defineType, defineField} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'main', title: 'Main Info', default: true},
    {name: 'description', title: 'Description'},
    {name: 'roles', title: 'Roles'},
    {name: 'tech', title: 'Technology'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Project/Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedString',
      description: 'Short description of the project type',
      group: 'main',
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'Format: MM.YYYY - MM.YYYY (use "d.d." for ongoing)',
      group: 'main',
    }),
    defineField({
      name: 'projectDescription',
      title: 'Project Description',
      description: 'Paragraphs describing the project context and goals',
      type: 'array',
      of: [{type: 'localizedText'}],
      group: 'description',
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{type: 'projectRole'}],
      group: 'roles',
    }),
    defineField({
      name: 'technology',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      group: 'tech',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (most recent projects first)',
      group: 'main',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitleEn: 'subtitle.en',
      subtitleNo: 'subtitle.no',
      period: 'period',
    },
    prepare({title, subtitleEn, subtitleNo, period}) {
      return {
        title,
        subtitle: `${subtitleEn || subtitleNo || ''} • ${period}`,
      }
    },
  },
})

import {defineType} from 'sanity'

export const freelanceClientProject = defineType({
  name: 'freelanceClientProject',
  title: 'Freelance Client Project',
  type: 'object',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'localizedString',
      description: 'e.g., "Landing Page", "Portfolio"',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedString',
      description: 'Short description like "Business landing page"',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Full project description',
    },
    {
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Link to the live site',
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitleEn: 'projectType.en',
      subtitleNo: 'projectType.no',
    },
    prepare({title, subtitleEn, subtitleNo}) {
      return {
        title,
        subtitle: subtitleEn || subtitleNo || '',
      }
    },
  },
})

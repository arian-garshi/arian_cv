import {defineType, defineField} from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      description: 'Introduction paragraphs for the CV',
      type: 'array',
      of: [{type: 'localizedText'}],
    }),
    defineField({
      name: 'coreCompetencies',
      title: 'Core Competencies',
      description: 'Key skills and years of experience',
      type: 'array',
      of: [{type: 'localizedString'}],
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'languageSkill',
          fields: [
            {name: 'language', title: 'Language', type: 'localizedString'},
            {name: 'level', title: 'Proficiency Level', type: 'localizedString'},
          ],
          preview: {
            select: {
              langEn: 'language.en',
              langNo: 'language.no',
              levelEn: 'level.en',
              levelNo: 'level.no',
            },
            prepare({langEn, langNo, levelEn, levelNo}) {
              return {
                title: langEn || langNo || 'Language',
                subtitle: levelEn || levelNo,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title.en',
      media: 'image',
    },
  },
})

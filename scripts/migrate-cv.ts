/**
 * Migration script to import CV data from full_cv.json into Sanity
 *
 * Run with: npx sanity exec scripts/migrate-cv.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'
import cvData from '../full_cv.json'

const client = getCliClient({apiVersion: '2024-01-01'})

// Type definitions for the JSON structure
interface LocalizedString {
  no: string
  en: string
}

interface LocalizedText {
  no: string
  en: string
}

interface RoleDetail {
  no: string
  en: string
}

interface ProjectRole {
  title: LocalizedString
  description: LocalizedText
  details?: RoleDetail[]
}

interface Project {
  name: string
  subtitle: LocalizedString
  period: string
  project_description: {
    paragraphs: LocalizedText[]
  }
  roles: ProjectRole[]
  technology: string[]
}

interface Certification {
  name: string
  issuer: string
  date: string
  description: LocalizedText
}

interface Education {
  institution: string
  degree: LocalizedString
  period: string
  description: LocalizedText
}

interface WorkExperience {
  company: string
  role: LocalizedString
  period: string
  description: LocalizedText
}

interface LanguageSkill {
  language: LocalizedString
  level: LocalizedString
}

// Generate a stable ID from a string
function generateId(prefix: string, name: string): string {
  return `${prefix}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`
}

async function migrate() {
  console.log('Starting CV migration...\n')

  const {document, sections} = cvData as any

  // Create transaction for atomic updates
  let transaction = client.transaction()

  // 1. Create Person document
  console.log('Creating Person document...')
  const personDoc = {
    _id: 'person-arian-garshi',
    _type: 'person',
    name: document.person.name,
    title: document.person.title,
    introduction: sections.introduction.paragraphs.map((p: LocalizedText) => ({
      _type: 'localizedText',
      _key: Math.random().toString(36).substring(7),
      no: p.no,
      en: p.en,
    })),
    coreCompetencies: sections.core_competencies.map((c: LocalizedString) => ({
      _type: 'localizedString',
      _key: Math.random().toString(36).substring(7),
      no: c.no,
      en: c.en,
    })),
    languages: sections.languages.map((l: LanguageSkill) => ({
      _type: 'languageSkill',
      _key: Math.random().toString(36).substring(7),
      language: {
        _type: 'localizedString',
        no: l.language.no,
        en: l.language.en,
      },
      level: {
        _type: 'localizedString',
        no: l.level.no,
        en: l.level.en,
      },
    })),
  }
  transaction = transaction.createOrReplace(personDoc)

  // 2. Create Certification documents
  console.log('Creating Certification documents...')
  sections.certifications.forEach((cert: Certification, index: number) => {
    const certDoc = {
      _id: generateId('certification', cert.name),
      _type: 'certification',
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      description: {
        _type: 'localizedText',
        no: cert.description.no,
        en: cert.description.en,
      },
      order: index + 1,
    }
    transaction = transaction.createOrReplace(certDoc)
  })

  // 3. Create Education documents
  console.log('Creating Education documents...')
  sections.education.forEach((edu: Education, index: number) => {
    const eduDoc = {
      _id: generateId('education', `${edu.institution}-${edu.degree.en}`),
      _type: 'education',
      institution: edu.institution,
      degree: {
        _type: 'localizedString',
        no: edu.degree.no,
        en: edu.degree.en,
      },
      period: edu.period,
      description: {
        _type: 'localizedText',
        no: edu.description.no,
        en: edu.description.en,
      },
      order: index + 1,
    }
    transaction = transaction.createOrReplace(eduDoc)
  })

  // 4. Create Project documents
  console.log('Creating Project documents...')
  sections.projects.forEach((proj: Project, index: number) => {
    const projDoc = {
      _id: generateId('project', `${proj.name}-${proj.period.split(' ')[0]}`),
      _type: 'project',
      name: proj.name,
      subtitle: {
        _type: 'localizedString',
        no: proj.subtitle.no,
        en: proj.subtitle.en,
      },
      period: proj.period,
      projectDescription: proj.project_description.paragraphs.map((p: LocalizedText) => ({
        _type: 'localizedText',
        _key: Math.random().toString(36).substring(7),
        no: p.no,
        en: p.en,
      })),
      roles: proj.roles.map((role: ProjectRole) => ({
        _type: 'projectRole',
        _key: Math.random().toString(36).substring(7),
        title: {
          _type: 'localizedString',
          no: role.title.no,
          en: role.title.en,
        },
        description: {
          _type: 'localizedText',
          no: role.description.no,
          en: role.description.en,
        },
        details: role.details?.map((d: RoleDetail) => ({
          _type: 'roleDetail',
          _key: Math.random().toString(36).substring(7),
          no: d.no,
          en: d.en,
        })) || [],
      })),
      technology: proj.technology,
      order: index + 1,
    }
    transaction = transaction.createOrReplace(projDoc)
  })

  // 5. Create Work Experience documents
  console.log('Creating Work Experience documents...')
  sections.work_experience.forEach((work: WorkExperience, index: number) => {
    const workDoc = {
      _id: generateId('work', `${work.company}-${work.period.split(' ')[0]}`),
      _type: 'workExperience',
      company: work.company,
      role: {
        _type: 'localizedString',
        no: work.role.no,
        en: work.role.en,
      },
      period: work.period,
      description: {
        _type: 'localizedText',
        no: work.description.no,
        en: work.description.en,
      },
      order: index + 1,
    }
    transaction = transaction.createOrReplace(workDoc)
  })

  // Commit all changes
  console.log('\nCommitting transaction...')
  try {
    const result = await transaction.commit()
    console.log('\n✅ Migration completed successfully!')
    console.log(`Created/updated ${result.results.length} documents`)

    // Summary
    console.log('\nSummary:')
    console.log('- 1 Person document')
    console.log(`- ${sections.certifications.length} Certification documents`)
    console.log(`- ${sections.education.length} Education documents`)
    console.log(`- ${sections.projects.length} Project documents`)
    console.log(`- ${sections.work_experience.length} Work Experience documents`)
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

migrate()

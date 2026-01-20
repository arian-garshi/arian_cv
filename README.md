# Arian Garshi CV - Sanity CMS

Sanity Studio and schema for managing Arian Garshi's CV data.

## Local Development

```bash
npm install
npm run dev
```

## Deploy Studio

```bash
npm run deploy
```

## Re-run Migration

```bash
npm run migrate
```

---

## Fetching CV Data from Another Project

### 1. Install Sanity Client

```bash
npm install @sanity/client
```

### 2. Setup Client

```typescript
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'v7nxkytw',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})
```

### 3. GROQ Queries

**Fetch everything at once:**

```typescript
const cv = await client.fetch(`{
  "person": *[_type == "person"][0],
  "certifications": *[_type == "certification"] | order(order asc),
  "education": *[_type == "education"] | order(order asc),
  "projects": *[_type == "project"] | order(order asc),
  "workExperience": *[_type == "workExperience"] | order(order asc)
}`)
```

**Or fetch individually:**

```typescript
// Person (with intro, competencies, languages)
const person = await client.fetch(`*[_type == "person"][0]`)

// Certifications
const certs = await client.fetch(`*[_type == "certification"] | order(order asc)`)

// Education
const education = await client.fetch(`*[_type == "education"] | order(order asc)`)

// Projects (with roles and tech)
const projects = await client.fetch(`*[_type == "project"] | order(order asc)`)

// Work Experience
const work = await client.fetch(`*[_type == "workExperience"] | order(order asc)`)
```

### 4. Data Structure

All text fields are bilingual with `no` (Norwegian) and `en` (English):

```typescript
// Accessing English vs Norwegian
person.title.en // "Senior Consultant"
person.title.no // "Seniorkonsulent"

// Projects have nested roles
projects[0].roles[0].title.en      // "Frontend Developer"
projects[0].roles[0].description.en // Role description
projects[0].roles[0].details        // Array of {no, en} bullet points
projects[0].technology              // ["React", "TypeScript", ...]
```

### 5. TypeScript Types

```typescript
interface LocalizedString {
  no: string
  en: string
}

interface Person {
  _id: string
  _type: 'person'
  name: string
  title: LocalizedString
  introduction: LocalizedString[]
  coreCompetencies: LocalizedString[]
  languages: {
    language: LocalizedString
    level: LocalizedString
  }[]
}

interface Certification {
  _id: string
  _type: 'certification'
  name: string
  issuer: string
  date: string
  description: LocalizedString
  order: number
}

interface Education {
  _id: string
  _type: 'education'
  institution: string
  degree: LocalizedString
  period: string
  description: LocalizedString
  order: number
}

interface Project {
  _id: string
  _type: 'project'
  name: string
  subtitle: LocalizedString
  period: string
  projectDescription: LocalizedString[]
  roles: {
    title: LocalizedString
    description: LocalizedString
    details: LocalizedString[]
  }[]
  technology: string[]
  order: number
}

interface WorkExperience {
  _id: string
  _type: 'workExperience'
  company: string
  role: LocalizedString
  period: string
  description: LocalizedString
  order: number
}

interface CV {
  person: Person
  certifications: Certification[]
  education: Education[]
  projects: Project[]
  workExperience: WorkExperience[]
}
```

### 6. Example Usage

```typescript
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'v7nxkytw',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})

async function getCV() {
  const cv = await client.fetch<CV>(`{
    "person": *[_type == "person"][0],
    "certifications": *[_type == "certification"] | order(order asc),
    "education": *[_type == "education"] | order(order asc),
    "projects": *[_type == "project"] | order(order asc),
    "workExperience": *[_type == "workExperience"] | order(order asc)
  }`)

  return cv
}

// Usage
const cv = await getCV()
console.log(cv.person.name) // "Arian Garshi"
console.log(cv.person.title.en) // "Senior Consultant"
console.log(cv.projects.length) // 10
```

---

Public read-only access - no API token needed.

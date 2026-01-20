/**
 * Migration script to import freelance work data into Sanity
 *
 * Run with: npx sanity exec scripts/migrate-freelance.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

async function migrate() {
  console.log('Starting Freelance migration...\n')

  const freelanceDoc = {
    _id: 'freelance-work',
    _type: 'freelance',
    title: {
      _type: 'localizedString',
      en: 'Freelance Development',
      no: 'Frilansutvikling',
    },
    introduction: [
      {
        _type: 'localizedText',
        _key: 'intro1',
        en: 'Developed websites for small businesses using React.js, TypeScript, and headless CMS solutions.',
        no: 'Utviklet nettsteder for små bedrifter ved hjelp av React.js, TypeScript og headless CMS-løsninger.',
      },
      {
        _type: 'localizedText',
        _key: 'intro2',
        en: "As a freelance developer, I created custom websites for clients across various industries, focusing on delivering solutions that not only looked great but also drove business results. My work for Diary's Cut & Shave included a landing page, gallery system, and online booking functionality that directly contributed to increased customer acquisition and revenue.",
        no: "Som frilanseutvikler skapte jeg tilpassede nettsteder for kunder på tvers av ulike bransjer, med fokus på å levere løsninger som ikke bare så bra ut, men også ga forretningsresultater. Mitt arbeid for Diary's Cut & Shave inkluderte en landingsside, gallerisystem og online bestillingsfunksjonalitet som direkte bidro til økt kundeanskaffelse og inntekter.",
      },
      {
        _type: 'localizedText',
        _key: 'intro3',
        en: 'For artist Even Vigeland, I built a professional portfolio site with integrated blog and e-commerce capabilities that increased artwork sales nationally. The SEO strategies I implemented for all my clients consistently improved their organic traffic, with some seeing up to 200% increases in search visibility.',
        no: 'For kunstner Even Vigeland bygde jeg et profesjonelt porteføljenettsted med integrert blogg- og e-handelsfunksjoner som økte kunstverksalget nasjonalt. SEO-strategiene jeg implementerte for alle mine kunder forbedret konsekvent deres organiske trafikk, med noen som så opptil 200% økning i søkesynlighet.',
      },
      {
        _type: 'localizedText',
        _key: 'intro4',
        en: 'I specialized in using headless CMS solutions like Contentful and Sanity, which allowed my clients to easily update their content without technical assistance. All sites were deployed via Vercel for reliable hosting and optimal performance.',
        no: 'Jeg spesialiserte meg på å bruke headless CMS-løsninger som Contentful og Sanity, som tillot mine kunder å enkelt oppdatere innholdet sitt uten teknisk hjelp. Alle nettsteder ble distribuert via Vercel for pålitelig hosting og optimal ytelse.',
      },
    ],
    clientProjects: [
      {
        _type: 'freelanceClientProject',
        _key: 'fasteland',
        clientName: 'Fasteland Consult',
        projectType: {
          _type: 'localizedString',
          en: 'Landing Page',
          no: 'Landingsside',
        },
        subtitle: {
          _type: 'localizedString',
          en: 'Landing page for consulting company',
          no: 'Landingsside for konsulentselskap',
        },
        description: {
          _type: 'localizedText',
          en: 'A landing page for a local consulting company, with the purpose of increasing online presence and handling communication with customers.',
          no: 'En landingsside for et lokalt konsulentselskap, med formål å øke online tilstedeværelse og håndtere kommunikasjon med kunder.',
        },
        url: 'https://fastelandconsult.no',
      },
      {
        _type: 'freelanceClientProject',
        _key: 'klevstad',
        clientName: 'Klevstad Rørservice',
        projectType: {
          _type: 'localizedString',
          en: 'Landing Page',
          no: 'Landingsside',
        },
        subtitle: {
          _type: 'localizedString',
          en: 'Landing page for plumbing company',
          no: 'Landingsside for rørleggerselskap',
        },
        description: {
          _type: 'localizedText',
          en: 'A landing page for a local plumbing company, with the purpose of increasing online presence and handling communication with customers.',
          no: 'En landingsside for et lokalt rørleggerselskap, med formål å øke online tilstedeværelse og håndtere kommunikasjon med kunder.',
        },
        url: null,
      },
      {
        _type: 'freelanceClientProject',
        _key: 'diarys',
        clientName: "Diary's Cut & Shave",
        projectType: {
          _type: 'localizedString',
          en: 'Landing Page',
          no: 'Landingsside',
        },
        subtitle: {
          _type: 'localizedString',
          en: 'Business landing page',
          no: 'Bedrifts landingsside',
        },
        description: {
          _type: 'localizedText',
          en: 'A landing page for a local barber shop, with the purpose of increasing online presence and handling bookings.',
          no: 'En landingsside for en lokal frisørsalong, med formål å øke online tilstedeværelse og håndtere bestillinger.',
        },
        url: 'https://diarys.no',
      },
      {
        _type: 'freelanceClientProject',
        _key: 'johnaudun',
        clientName: 'John Audun Hauge',
        projectType: {
          _type: 'localizedString',
          en: 'Portfolio',
          no: 'Portefølje',
        },
        subtitle: {
          _type: 'localizedString',
          en: 'Artist / Sculptor portfolio website',
          no: 'Kunstner / Skulptør porteføljenettsted',
        },
        description: {
          _type: 'localizedText',
          en: 'A portfolio website for a local sculptor, with the purpose of showcasing his work and increasing online presence.',
          no: 'Et porteføljenettsted for en lokal skulptør, med formål å vise frem arbeidet hans og øke online tilstedeværelse.',
        },
        url: 'https://johnaudun.no',
      },
      {
        _type: 'freelanceClientProject',
        _key: 'evenvigeland',
        clientName: 'Even Vigeland',
        projectType: {
          _type: 'localizedString',
          en: 'Portfolio',
          no: 'Portefølje',
        },
        subtitle: {
          _type: 'localizedString',
          en: 'Artist / Painter portfolio website',
          no: 'Kunstner / Maler porteføljenettsted',
        },
        description: {
          _type: 'localizedText',
          en: 'A web application for a local painter, with the purpose of showcasing his work and increasing online presence.',
          no: 'En webapplikasjon for en lokal maler, med formål å vise frem arbeidet hans og øke online tilstedeværelse.',
        },
        url: 'https://evenvigeland.no',
      },
    ],
  }

  console.log('Creating Freelance document...')

  try {
    const result = await client.createOrReplace(freelanceDoc)
    console.log('\n✅ Freelance migration completed successfully!')
    console.log(`Document ID: ${result._id}`)
    console.log(`\nSummary:`)
    console.log(`- 4 introduction paragraphs`)
    console.log(`- 5 client projects`)
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

migrate()

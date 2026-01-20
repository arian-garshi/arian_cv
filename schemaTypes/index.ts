// Object types
import {localizedString} from './objects/localizedString'
import {localizedText} from './objects/localizedText'
import {roleDetail} from './objects/roleDetail'
import {projectRole} from './objects/projectRole'

// Document types
import {person} from './documents/person'
import {certification} from './documents/certification'
import {education} from './documents/education'
import {project} from './documents/project'
import {workExperience} from './documents/workExperience'

export const schemaTypes = [
  // Object types (must be defined before documents that use them)
  localizedString,
  localizedText,
  roleDetail,
  projectRole,

  // Document types
  person,
  certification,
  education,
  project,
  workExperience,
]

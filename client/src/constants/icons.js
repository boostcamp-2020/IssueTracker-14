import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faBook, faMapSigns, faTags, faCaretDown, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGithubAlt } from '@fortawesome/free-brands-svg-icons'

const icons = {
  book: <FontAwesomeIcon icon={faBook} />,
  github: <FontAwesomeIcon icon={faGithub} />,
  githubAlt: <FontAwesomeIcon icon={faGithubAlt} />,
  codeBranches: <FontAwesomeIcon icon={faCodeBranch} />,
  milestone: <FontAwesomeIcon icon={faMapSigns} />,
  label: <FontAwesomeIcon icon={faTags} />,
  dropdown: <FontAwesomeIcon icon={faCaretDown} />,
  reset: <FontAwesomeIcon icon={faWindowClose} />,
}

export default icons;
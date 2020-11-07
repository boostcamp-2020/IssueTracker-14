import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPassport, faCodeBranch, faBook } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGithubAlt } from '@fortawesome/free-brands-svg-icons'

const icons = {
  book: <FontAwesomeIcon icon={faBook} />,
  github: <FontAwesomeIcon icon={faGithub} />,
  githubAlt: <FontAwesomeIcon icon={faGithubAlt} />,
  passport: <FontAwesomeIcon icon={faPassport} />,
  codeBranches: <FontAwesomeIcon icon={faCodeBranch} />
}

export default icons;
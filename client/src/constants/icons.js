import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPassport, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const icons = {
  github: <FontAwesomeIcon icon={faGithub} />,
  passport: <FontAwesomeIcon icon={faPassport} />,
  codeBranches: <FontAwesomeIcon icon={faCodeBranch} />
}

export default icons;
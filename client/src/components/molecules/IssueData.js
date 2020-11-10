import React from 'react';
import styled from 'styled-components';
import A from './../atoms/index';
import M from './../molecules/index';
import O from './../organisms/index';

const StyledIssueData = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #000000;
  width: 100%;
`;

const StyledCheckbox = styled.div`
    display: flex;
    min-width: 3rem;
    justify-content: right;
    align-items: center;
`

const StyledIssueIcon = styled.div`
    display; flex;
    width: 3rem;
`

const StyledImportant = styled.div`
    display: flex;
    width: 100%;
`

const StyledTrivial = styled.div`
    display: flex;
    width: 11rem;
`


const data = {
    "id": 74,
    "title": "네트워크네트워크22",
    "status": "open",
    "createdAt": "2020-11-04T18:05:15.000Z",
    "updatedAt": "2020-11-04T18:05:15.000Z",
    "description": "리스트를 많이 만들자",
    "user": {
        "id": 4,
        "nickname": "Asdf"
    },
    "milestone": null,
    "assignees": [],
    "comments": [],
    "label_has_issues": []
}

const IssueMenu = () => {
    return (
    <StyledIssueData>
        <StyledCheckbox>
            <A.Checkbox />
        </StyledCheckbox>
        <StyledIssueIcon>
            
        </StyledIssueIcon>
        <StyledImportant>

        </StyledImportant>
        <StyledTrivial>

        </StyledTrivial>
    </StyledIssueData>
    )
}

export default IssueMenu
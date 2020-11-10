import React from 'react';
import styled from 'styled-components';
import A from './../atoms/index';
import M from './../molecules/index';
import O from './../organisms/index';

const StyledIssueContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

const data = {
  "id": 7,
  "title": "test",
  "status": "closed",
  "createdAt": "2020-11-10T02:52:59.000Z",
  "updatedAt": "2020-11-10T02:52:59.000Z",
  "description": null,
  "user": {
      "id": 8,
      "nickname": "123"
  },
  "milestone": {
      "id": 1,
      "title": "milestone test"
  },
  "assignees": [
      {
          "id": 37,
          "user": {
              "id": 3,
              "nickname": "Asdf",
              "imageurl": "https://avatars1.githubusercontent.com/u/52521323?v=4"
          }
      },
      {
          "id": 38,
          "user": {
              "id": 2,
              "nickname": "lcpnine",
              "imageurl": "https://avatars1.githubusercontent.com/u/52521363?v=4"
          }
      },
      {
          "id": 39,
          "user": {
              "id": 1,
              "nickname": "2oneweek",
              "imageurl": "https://avatars1.githubusercontent.com/u/21511027?v=4"
          }
      }
  ],
  "comments": [],
  "label_has_issues": [
      {
          "id": 15,
          "label": {
              "id": 3,
              "title": "2323",
              "color": "#112323",
              "description": null
          }
      },
      {
          "id": 16,
          "label": {
              "id": 2,
              "title": "BE",
              "color": "#1fff12",
              "description": null
          }
      }
  ]
}

const IssueMenu = () => {
    return (
    <StyledIssueContent>
      <M.IssueData props={data} />
    </StyledIssueContent>
    )
}

export default IssueMenu
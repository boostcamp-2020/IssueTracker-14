import React from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledTabs = styled.div`
  display: flex;
  margin: 1rem;
  margin-bottom: 0;
`;

const Tabs = ({ tabList }) => {
  return (
    <StyledTabs>
      {tabList.map((tab, id) => {
        return (
          <A.Button
            key={id}
            border
            borderBottom={"0"}
            padding={"0.5rem"}
            rounded={false}
            borderColor="#e3e3e4"
            zIndex={"1"}
            width={"auto"}
          >
            {tab}
          </A.Button>
        );
      })}
    </StyledTabs>
  );
};

export default Tabs;

import React from "react";
import A from "@atoms";
import Styled from "./Tabs.style";

const Tabs = ({ tabList, onClick }) => {
  return (
    <Styled.Tabs>
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
            onClick={onClick}
          >
            {tab}
          </A.Button>
        );
      })}
    </Styled.Tabs>
  );
};

export default Tabs;

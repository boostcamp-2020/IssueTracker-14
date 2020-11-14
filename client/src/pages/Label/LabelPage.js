import React, { useEffect } from "react";
import Store from "@stores/index";
import fetchTargetData from "@utils/fetchData";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./LabelPage.style";

const LabelsPage = () => {
  const labelState = Store.useLabelState();
  const labelDispatch = Store.useLabelDispatch();

  useEffect(() => {
    return () => {
      fetchTargetData("label", labelDispatch);
    };
  }, [labelState.labels]);

  return (
    <>
      <O.Header />
      <Styled.LabelsPageWrapper>
        <Styled.LabelNavigationWrapper>
          <O.LabelNavigation />
        </Styled.LabelNavigationWrapper>
        <Styled.LabelContentWrapper>
          <M.Container
            menu={<O.LabelMenu labels={labelState.labels} />}
            content={<O.LabelContent labels={labelState.labels} />}
          />
        </Styled.LabelContentWrapper>
      </Styled.LabelsPageWrapper>
    </>
  );
};

export default LabelsPage;

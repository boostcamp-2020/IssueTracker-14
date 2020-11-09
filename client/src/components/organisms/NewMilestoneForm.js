import React, { useCallback } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import colors from "../../constants/colors";
import { useMilestoneDispatch } from "../../stores/milestone";

const StyledNewMilestoneForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 20rem;
  margin: 20px 0;
`;

const NewMilestoneForm = () => {
  const dispatch = useMilestoneDispatch();
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "ON_CHANGE_INPUTS",
      name,
      value,
    });
  }, []);

  const onClickNewMilestone = useCallback(() => {
    dispatch({
      type: "CREATE_NEW_MILESTONE",
    });
  }, []);

  return (
    <StyledNewMilestoneForm>
      <M.FormDiv
        label={"title"}
        for={"title-id"}
        type={"text"}
        name={"title"}
        padding={"1rem"}
        width={"30%"}
        placeholder={"title"}
        onChange={onChange}
        rounded
      />
      <M.FormDiv
        label={"Due date"}
        for={"Due-date"}
        type={"date"}
        name={"duedate"}
        padding={"1rem"}
        width={"30%"}
        onChange={onChange}
        rounded
      />
      <A.Text fontWeight={"bold"} hover={false}>
        Description
      </A.Text>
      <M.FormTextArea
        label={"Description"}
        rows={"20"}
        width={"100%"}
        placeholder={"Leave a description"}
        name={"description"}
        onChange={onChange}
        width={"100%"}
      />
      <M.ButtonDiv
        buttonColor={colors.green}
        width={"8rem"}
        height={"2rem"}
        onClick={onClickNewMilestone}
        textColor={colors.white}
        fontSize={"small"}
        hover={false}
        border={true}
      >
        Create Milestone
      </M.ButtonDiv>
    </StyledNewMilestoneForm>
  );
};

export default NewMilestoneForm;

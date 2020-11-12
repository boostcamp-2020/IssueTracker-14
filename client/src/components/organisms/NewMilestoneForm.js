import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import A from "../atoms/index";
import M from "../molecules/index";
import colors from "../../constants/colors";
import { useMilestoneDispatch } from "../../stores/milestone";
import fetchData from "../../utils/fetchData";
const StyledNewMilestoneForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 20px 0;
`;

const StyledDescription = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 40vw;
`;

const StyledFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const NewMilestoneForm = () => {
  const [content, setContent] = useState("");
  const milestoneDispatch = useMilestoneDispatch();
  const history = useHistory();

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    milestoneDispatch({
      type: "ON_CHANGE_INPUTS",
      name,
      value,
    });
    if (name === "description") {
      setContent(e.target.value);
    }
  }, []);

  const onClickNewMilestone = useCallback(async () => {
    await milestoneDispatch({
      type: "CREATE_NEW_MILESTONE",
    });
    await fetchData("milestone", milestoneDispatch);
    history.push("/milestones");
  }, []);

  return (
    <StyledNewMilestoneForm>
      <M.FormDiv
        label={"title"}
        for={"title"}
        type={"text"}
        name={"title"}
        id={"title"}
        padding={"1rem"}
        width={"30%"}
        placeholder={"title"}
        onChange={onChange}
        rounded
      />
      <M.FormDiv
        label={"Due date"}
        for={"duedate"}
        type={"date"}
        name={"duedate"}
        id={"duedate"}
        padding={"1rem"}
        width={"30%"}
        onChange={onChange}
        rounded
      />
      <StyledDescription>
        <A.Text fontWeight={"bold"} hover={false}>
          Description
        </A.Text>
        <M.FormTextArea
          label={"Description"}
          rows={"20"}
          width={"100%"}
          placeholder={"Leave a description"}
          value={content}
          name={"description"}
          onChange={onChange}
          height={"100%"}
        />
      </StyledDescription>
      <A.Line color={"grey"} />
      <StyledFormFooter>
        <M.ButtonDiv
          onClick={onClickNewMilestone}
          buttonColor={"green"}
          width={"8rem"}
          height={"2rem"}
          textColor={"white"}
          fontSize={"small"}
          hover={false}
          border={true}
          margin={"10px 0"}
        >
          Create Milestone
        </M.ButtonDiv>
      </StyledFormFooter>
    </StyledNewMilestoneForm>
  );
};

export default NewMilestoneForm;

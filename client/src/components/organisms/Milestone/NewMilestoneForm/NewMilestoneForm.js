import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import A from "@atoms/index";
import M from "@molecules/index";
import Store from "@stores/index";
import fetchData from "@utils/fetchData";
import Styled from "./NewMilestoneForm.style";

const NewMilestoneForm = () => {
  const [content, setContent] = useState("");
  const milestoneDispatch = Store.useMilestoneDispatch();
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
    <Styled.NewMilestoneForm>
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
      <Styled.Description>
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
      </Styled.Description>
      <A.Line color={"grey"} />
      <Styled.FormFooter>
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
      </Styled.FormFooter>
    </Styled.NewMilestoneForm>
  );
};

export default NewMilestoneForm;

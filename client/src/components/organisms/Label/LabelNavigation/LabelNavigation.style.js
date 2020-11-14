import styled from "styled-components";

const LabelNavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 50rem;
  width: 100%;
`;

const LabelButtons = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

export default { LabelButtons, LabelNavigationWrapper };

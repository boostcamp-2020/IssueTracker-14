import styled from "styled-components";
import colors from "@constants/colors";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0rem 1.5rem 0rem;
  width: 100%;
  min-width: 50rem;
`;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  height: 3.5rem;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #d1d5da;
  border-bottom: ${({ empty }) => (empty ? "1px solid #d1d5da" : "none")};
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors["lightGrey"]};
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: ${({ empty }) => (empty ? "20rem" : "0rem")};
  border: 1px solid #d1d5da;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: none;
  justify-content: center;
  align-items: ${({ empty }) => (empty ? "center" : "start")};
`;

export default {
  ContentWrapper,
  MenuWrapper,
  Container,
};

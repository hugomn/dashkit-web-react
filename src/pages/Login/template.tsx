import { Box } from "grommet";
import * as React from "react";
import styled from "styled-components";
import { media } from "../../constants/responsive";
import CardContainer from "../../templates/Containers/Cards/template";
import LoginForm from "./LoginForm";
import NewPasswordRequiredForm from "./NewPasswordRequiredForm";

interface IProps {
  newPasswordRequired?: boolean;
}

const Login = ({ newPasswordRequired }: IProps) => (
  <CardContainer>
    <Wrapper pad={{ horizontal: "large", vertical: "medium" }}>
      {newPasswordRequired ? <NewPasswordRequiredForm /> : <LoginForm />}
    </Wrapper>
  </CardContainer>
);

const Wrapper = styled(Box)`
  width: 100%;
  ${media.md`
    min-width: 500px;
  `};
`;

export default Login;

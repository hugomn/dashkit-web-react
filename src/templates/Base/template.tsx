import { Box, Grid } from "grommet";
import * as React from "react";
import LoadingBar from "react-redux-loading-bar";
import "react-toastify/dist/ReactToastify.min.css";
import styled, { createGlobalStyle } from "styled-components";
import { gridUnavailable } from "../../constants/responsive";
import theme from "../../constants/theme";
import Footer from "./Footer";
import Header from "./Header";
import { ITemplateProps } from "..";

const BaseTemplate: React.FunctionComponent<ITemplateProps> = ({ component: Main }) => {
  return (
    <StyledGrid
      fill
      rows={["auto", "flex", "auto"]}
      columns={["100%"]}
      data-testid="grid"
      areas={[
        { name: "header", start: [0, 0], end: [0, 0] },
        { name: "main", start: [0, 1], end: [0, 1] },
        { name: "footer", start: [0, 2], end: [0, 2] }
      ]}>
      <Box as="header" className="header" gridArea="header">
        <LoadingBar
          style={{
            backgroundColor: theme.global.colors.brand,
            position: "fixed",
            top: "0",
            zIndex: 999
          }}
        />
        <Header />
      </Box>
      <Box gridArea="main" className="main">
        <Main />
      </Box>
      <Box as="footer" direction="row" gridArea="footer" className="footer">
        <Footer />
        <GlobalStyle />
      </Box>
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)`
  min-height: 100vh;
  ${gridUnavailable`
    height: 0px;
      display: flex;
      flex-direction: column;
      .header, .footer {
        flex: none;
      }
      .main {
        flex: 1 1 auto;
        margin-bottom: 42px;
      }
  `}
`;

const GlobalStyle = createGlobalStyle`
  a {
    transition: all .15s ease-in-out;
  }
`;

export default BaseTemplate;

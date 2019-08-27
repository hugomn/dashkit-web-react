import { Anchor, Box, Image, ResponsiveContext } from "grommet";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, matchPath } from "react-router-dom";
import styled from "styled-components";
import iconSignout from "../../../assets/img/icons/signout.svg";
import logoFull from "../../../assets/img/logo-full.svg";
import HeaderMenu from "../../../components/HeaderMenu/template";
import { media, visible } from "../../../constants/responsive";
import { publicRoutes, restrictedRoutes } from "../../../constants/routes";
import theme from "../../../constants/theme";
import { IDispatchProps, IStateProps } from ".";

type IProps = IDispatchProps & IStateProps;

const Header: React.FunctionComponent<IProps> = ({ isLoggedIn, logout, pathname, redirect }) => {
  const { t } = useTranslation();
  return (
    <Wrapper
      flex="grow"
      direction="row"
      pad={{ horizontal: "medium", vertical: "small" }}
      wrap
      background="white">
      <Logo align="start" pad={{ vertical: "5px" }}>
        <Link to={restrictedRoutes.home.path} style={{ lineHeight: 0 }}>
          <ResponsiveContext.Consumer>
            {(size: string) =>
              size === "large" ? (
                <Image fit="contain" src={logoFull} height="40px" />
              ) : (
                <Image fit="contain" src={logoFull} height="40px" />
              )
            }
          </ResponsiveContext.Consumer>
        </Link>
      </Logo>
      <MenuWrapper flex direction="row">
        {isLoggedIn ? (
          <>
            <HeaderMenu
              label={t("templates.base.header.tabs.users")}
              margin={{ right: "medium" }}
              active={isSelected(pathname, restrictedRoutes.users.path)}
              items={[
                {
                  label: "Users",
                  onClick: handleMenuClick(restrictedRoutes.users.path, redirect)
                }
              ]}
            />
          </>
        ) : null}
      </MenuWrapper>
      <HeaderActions
        flex
        justify="center"
        align="end"
        pad={{ horizontal: "medium", vertical: "small" }}>
        {isLoggedIn ? (
          <ActionsLink>
            <Anchor
              onClick={() => {
                logout();
              }}>
              <Box align="center" direction="row" data-testid="signout">
                <Image src={iconSignout} height="21px" width="21px" />
                <SignoutText>{t("templates.base.header.signout")}</SignoutText>
              </Box>
            </Anchor>
          </ActionsLink>
        ) : (
          <ActionsLink>
            <Anchor as="span">
              <Link to={publicRoutes.login.path}>{t("templates.base.header.login")}</Link>
            </Anchor>
          </ActionsLink>
        )}
      </HeaderActions>
    </Wrapper>
  );
};

export const isSelected = (path: string, pathToMatch: string): boolean => {
  return !!matchPath(path, pathToMatch);
};

export const handleMenuClick = (path: string, redirect: any, state?: any) => () => {
  redirect(path, state);
};

const ActionsLink = styled.span`
  a {
    color: ${theme.anchor.color.dark};
    text-decoration: none;
  }
  &:hover a {
    color: ${theme.global.colors.white};
  }
`;

const Wrapper = styled(Box)`
  flex-flow: row wrap;
  ${media.md`
    flex-flow: row;
  `}
  height: 70px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
`;

const SignoutText = styled.span`
  margin-left: 8px;
  ${visible.md};
`;

const Logo = styled(Box)`
  ${media.md`
    flex-basis: 20%;
  `}
`;

const MenuWrapper = styled(Box)`
  align-items: center;
  justify-content: left;
  order: 2;
  flex-basis: 100%;
  ${media.md`
    justify-content: center;
    order: 1;
    flex-basis: 60%;
  `}
`;

const HeaderActions = styled(Box)`
  order: 1;
  ${media.md`
    flex-basis: 20%;
    order: 2;
  `}
`;

export default Header;

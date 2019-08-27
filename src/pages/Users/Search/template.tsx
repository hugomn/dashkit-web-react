import { Box, Button, TextInput } from "grommet";
import { Close as CloseIcon, Search as SearchIcon } from "grommet-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import theme from "../../../constants/theme";

interface IProps {
  onChange: (query: string) => void;
  query: string;
}

const Search: React.FC<IProps> = ({ query, onChange }) => {
  const { t } = useTranslation();
  return (
    <>
      <form onSubmit={handleSubmit(query, onChange)}>
        <Box direction="row" justify="between" align="center" margin={{ bottom: "medium" }}>
          <Box
            fill="horizontal"
            direction="row"
            align="center"
            background={theme.global.colors["light-1"]}
            elevation="xsmall"
            height="48px"
            pad={{ horizontal: "small" }}>
            <SearchIcon color="dark-4" />
            <StyledTextInput
              plain
              type="text"
              value={query}
              onChange={handleChangeQuery(onChange)}
              placeholder={t("pages.users.search.placeholder")}
              size="medium"
              data-testid="input"
            />
            {query && (
              <StyledClose
                plain
                icon={<CloseIcon color="dark-4" />}
                onClick={() => onChange("")}
                data-testid="clear"
              />
            )}
          </Box>
        </Box>
      </form>
    </>
  );
};

export const handleChangeQuery = (onChange: (query: string) => void) => (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  onChange(e.target.value);
};

export const handleSubmit = (query: string, onChange: IProps["onChange"]) => (
  e: React.FormEvent
) => {
  onChange(query);
  e.preventDefault();
};

const StyledClose = styled(Button)`
  padding-right: 0px;
`;
const StyledTextInput = styled(TextInput)`
  background-color: ${theme.global.colors["light-1"]};
`;

export default Search;

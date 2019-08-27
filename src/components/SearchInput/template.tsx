import { Box, Button, TextInput } from "grommet";
import { FormClose, FormSearch } from "grommet-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import theme from "../../constants/theme";
import { handleClear } from ".";

interface IProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  query: string;
}

export const SearchInput: React.FC<IProps> = ({ onSearch, onClear, query }) => {
  const { t } = useTranslation();
  return (
    <Box direction="row" width="50%" justify="between" align="center" round="2px">
      <Box
        fill="horizontal"
        direction="row"
        align="center"
        background={theme.global.colors["light-1"]}
        pad={{ horizontal: "small" }}
        elevation="xsmall"
        height="48px">
        <FormSearch color="dark-4" />
        <StyledTextInput
          plain
          data-testid="searchinput"
          type="text"
          placeholder={t("pages.users.search.placeholder")}
          value={query}
          onChange={e => onSearch(e.currentTarget.value)}
        />
        {query && (
          <Button
            plain
            icon={<FormClose color="dark-4" />}
            onClick={handleClear(onClear)}
            data-testid="clear"
          />
        )}
      </Box>
    </Box>
  );
};

const StyledTextInput = styled(TextInput)`
  background-color: ${theme.global.colors["light-1"]};
`;

export default SearchInput;

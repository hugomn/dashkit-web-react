import { Box, Button, Select } from "grommet";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import theme, { fontSizing } from "../../constants/theme";

interface IProps {
  onPageChange: (...args: any[]) => any;
  page?: number;
  totalPages?: number;
}

const Pagination: React.FunctionComponent<IProps> = props => {
  const { t } = useTranslation();
  const { onPageChange } = props;
  const { page = 0, totalPages = 1 } = props;

  const options = [];
  for (let i = 1; i <= totalPages; i++) {
    options.push(String(i));
  }
  return (
    <Box direction="row" align="center">
      <StyledButton
        type="button"
        label={t("global.pagination.previous")}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        data-testid="prev"
        plain
      />
      <Divider>|</Divider>
      <StyledSelect
        id="pagination-select"
        options={options}
        value={String(page + 1)}
        dropHeight="small"
        onChange={({ option }: { option: string }) => onPageChange(Number(option) - 1)}
        dropAlign={{ bottom: "top" }}
        data-testid="pagination-select"
      />
      <Divider>|</Divider>
      <StyledButton
        type="button"
        label={t("global.pagination.next")}
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 === totalPages}
        data-testid="next"
        plain
      />
    </Box>
  );
};

const Divider = styled.span`
  color: ${theme.global.colors["status-disabled"]};
  font-size: ${fontSizing(2.5).size};
  padding: 0 14px;
`;

const StyledButton = styled(Button)`
  text-transform: uppercase;
  background-color: transparent;
  font-weight: 600;
  color: ${theme.global.colors["accent-4"]};
`;

const StyledSelect = styled(Select)`
  width: 90px;
`;

export default Pagination;

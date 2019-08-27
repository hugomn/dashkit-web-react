import { Box, Table, TableBody, TableCell, TableRow } from "grommet";
import styled from "styled-components";
import React from "react";
import { ReactComponent as IconArrowDown } from "../../assets/img/sort-down.svg";
import theme from "../../constants/theme";

export const ScrollWrapper = styled(Box)`
  overflow: auto;
  width: 100%;
`;

export const Wrapper = styled(Box)`
  width: 100%;
`;

export const StyledTable = styled(Table)`
  min-width: 1000px;
  width: 100%;
`;

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  background: ${theme.table.body.background};

  &:nth-child(even) th {
    background: ${theme.table.body.backgroundEven};
  }
`;

export const StyledTableBody = styled(TableBody)`
  line-height: ${theme.table.body.lineHeight};
`;

export const StyledBodyCell = styled(TableCell)`
  ${({ isLoading }: { isFirst?: boolean; isLoading?: boolean }) => `
    padding: ${theme.table.body.padding.vertical} ${theme.table.body.padding.horizontal};
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    ${isLoading ? `color: transparent; text-shadow: 0 0 10px rgba(0, 0, 0, 0.5); ` : null};
  `}
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledHeaderCell = styled(({ isActive, sortable, ...rest }) => (
  <TableCell {...rest} />
))`
  ${({ isActive, sortable }: { sortable?: boolean; isActive: boolean }) => `
    padding: ${theme.table.header.padding.vertical} ${theme.table.header.padding.horizontal};
    color: ${isActive ? theme.table.header.colorActive : theme.table.header.color};
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: ${sortable ? `pointer` : `auto`};
    background-color: ${theme.table.header.background};
    user-select: none;
    text-align: left;
    border-bottom: solid 1px ${theme.table.header.borderColor};
  `}
`;

export const StyledHeaderCellContent = styled.span`
  display: flex;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledIconArrow = styled(({ isActive, isDown, ...rest }) => (
  <IconArrowDown {...rest} />
))`
  ${({ isActive, isDown }: { isActive: boolean; isDown: boolean }) => `
  height: 20px;
  margin: 0 5px;
  fill: ${isActive ? theme.global.colors.brand : theme.table.header.color};
  ${isDown ? "transform: rotate(180deg);" : ""}
`}
`;

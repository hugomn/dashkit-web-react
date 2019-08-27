import { TableHeader, TableRow } from "grommet";
import React, { useState } from "react";
import { ISortParams } from "../../store/users/types";
import Loading from "../Loading";
import {
  ScrollWrapper,
  StyledBodyCell,
  StyledHeaderCell,
  StyledHeaderCellContent,
  StyledIconArrow,
  StyledTable,
  StyledTableBody,
  StyledTableRow,
  Wrapper
} from "./styles";

interface Data {
  [key: string]: any;
}

export interface IProps<T extends Data> {
  columns: {
    align?: "center" | "start" | "end";
    aggregate?: "avg" | "max" | "min" | "sum";
    footer?: React.ReactNode | { aggregate?: boolean };
    header?: string | React.ReactNode | { aggregate?: boolean };
    primary?: boolean;
    property: string;
    render?: (value: string) => string | React.ReactNode;
    sortProperty?: string;
    sortable?: boolean;
  }[];
  data: T[];
  isLoading?: boolean;
  onClick?: (...args: any[]) => any;
  onSort?: (...args: any[]) => any;
  placeholder?: React.ReactNode;
  sort?: ISortParams;
}

const DataTable = <DataType extends Data>(props: IProps<DataType>) => {
  const { columns, data, isLoading, placeholder, onClick, onSort, sort: propSort } = props;
  const [sort, setSort] = useState(propSort);

  const handleHeaderClick = (property: string, sortProperty?: string, sortable?: boolean) => () => {
    if (sortable) {
      const newSort = {
        ascending: sort && sort.property === property ? !sort.ascending : true,
        property
      };
      setSort(newSort);
      if (onSort) {
        onSort({ ascending: newSort.ascending, property, sortProperty });
      }
    }
  };
  const handleRowClick = (value: {}) => () => {
    if (onClick) {
      onClick(value);
    }
  };

  if (data.length) {
    return (
      <ScrollWrapper background="white" elevation="xsmall">
        <Wrapper>
          <StyledTable>
            <TableHeader>
              <TableRow>
                {columns.map(({ property, header, sortProperty, sortable }) => (
                  <StyledHeaderCell
                    align="center"
                    key={property}
                    scope="col"
                    plain
                    isActive={!!sort && sort.property === property}
                    onClick={handleHeaderClick(property, sortProperty, sortable)}
                    sortable={sortable}>
                    <StyledHeaderCellContent>
                      {header}
                      {sortable && (
                        <StyledIconArrow
                          isActive={!!sort && sort.property === property}
                          isDown={!!sort && sort.property === property && sort.ascending}
                        />
                      )}
                    </StyledHeaderCellContent>
                  </StyledHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <StyledTableBody>
              {data.map((value, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <StyledTableRow key={index} onClick={handleRowClick(value)}>
                  {columns.map(({ property, render }) => (
                    <StyledBodyCell
                      data-testid={property}
                      key={property}
                      scope="col"
                      plain
                      align="left"
                      isLoading={isLoading}>
                      {render ? render(value[property]) : value[property]}
                    </StyledBodyCell>
                  ))}
                </StyledTableRow>
              ))}
            </StyledTableBody>
          </StyledTable>
        </Wrapper>
      </ScrollWrapper>
    );
  }
  return isLoading ? <Loading /> : <>{placeholder}</>;
};

export default DataTable;

import { WithTranslation } from "react-i18next";
import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import EmptyBacklog from "../../assets/img/icons/empty-backlog.svg";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination/template";
import Placeholder from "../../components/Placeholder/template";
import Search from "./Search";
import columns from "./columns";
import { IDispatchProps, IStateProps } from ".";

type IProps = IStateProps & IDispatchProps & WithTranslation;

const Users: React.FC<IProps> = ({ users, fetchAllUsers, isLoading, t, totalPages }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    ascending: false,
    property: columns[0].property,
    sortProperty: columns[0].sortProperty
  });
  useEffect(() => {
    fetchAllUsers({ page });
  }, [fetchAllUsers, page]);

  if (users) {
    return (
      <Box fill pad={{ horizontal: "large", top: "medium" }}>
        <Search query={query} onChange={setQuery} />
        <DataTable
          columns={columns}
          data={users}
          onSort={setSort}
          sort={sort}
          isLoading={isLoading}
          placeholder={
            <Placeholder
              icon={EmptyBacklog}
              title={t("pages.users.empty.search.title")}
              description={t("pages.users.empty.description")}
            />
          }
        />
        {!!users.length && (
          <Box pad="large" align="center">
            <Pagination totalPages={totalPages} page={page} onPageChange={setPage} />
          </Box>
        )}
      </Box>
    );
  }
  return <Loading />;
};

export default Users;

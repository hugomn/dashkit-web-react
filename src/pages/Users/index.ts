import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import actions from "../../store/users/actions";
import { IPageable, IUser } from "../../store/users/types";
import template from "./template";

export interface IStateProps {
  users?: IUser[];
  isLoading?: boolean;
  totalPages?: number;
}

export const mapStateToProps = (state: IApplicationState) => {
  return {
    users: state.users.users,
    isLoading: state.users.isLoading
  };
};

export interface IDispatchProps {
  fetchAllUsers: (params: IPageable) => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    fetchAllUsers: params => {
      dispatch(actions.fetchAllRequested(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(template));

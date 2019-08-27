import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

interface IState {
  error?: Error;
  isLoading: boolean;
  response: any;
}

// HACK
const callIndexes = new Map();

const useApi = (
  api: (params?: any) => Promise<AxiosResponse<any>>,
  dependencies: any[],
  options?: {}
): IState => {
  const [state, setState] = useState<IState>({
    error: undefined,
    isLoading: true,
    response: undefined
  });
  useEffect(() => {
    // HACK
    callIndexes[api.toString()] = (callIndexes[api.toString()] || 0) + 1;
    const callIndex = callIndexes[api.toString()];
    setState({ ...state, isLoading: true });
    api(options)
      .then(resp => {
        /* istanbul ignore next line */
        if (callIndex < callIndexes[api.toString()]) return;
        setState({
          error: undefined,
          isLoading: false,
          response: resp
        });
      })
      .catch((err: Error) => {
        /* istanbul ignore next line */
        if (callIndex < callIndexes[api.toString()]) return;
        setState({
          error: err,
          isLoading: false,
          response: undefined
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  return state;
};

export default useApi;

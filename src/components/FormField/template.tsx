import { FormField as GrommetFormField, FormFieldProps } from "grommet";
import * as React from "react";
import FormError from "../FormError";

const FormField: React.FunctionComponent<FormFieldProps & JSX.IntrinsicElements["div"]> = props => {
  const { children, error, ...rest } = props;
  return (
    <GrommetFormField error={error && <FormError>{error}</FormError>} {...rest} ref={undefined}>
      {children}
    </GrommetFormField>
  );
};

export default FormField;

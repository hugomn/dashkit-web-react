import { Box, Image } from "grommet";
import * as React from "react";
import iconAlert from "../../assets/img/icons/alert.svg";

const FormError = ({ children }: any) => (
  <Box justify="between" align="center" direction="row">
    {children}
    <Image src={iconAlert} />
  </Box>
);

export default FormError;

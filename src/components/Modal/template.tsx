import { Box, Layer } from "grommet";
import { FormClose } from "grommet-icons";
import * as React from "react";
import styled from "styled-components";

interface IProps {
  onClose: () => void;
}

const Modal: React.FC<IProps> = ({ children, onClose }) => (
  <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
    <Box margin={{ vertical: "large", horizontal: "large" }}>
      <StyledIcon align="end">
        <FormClose data-testid="close" onClick={onClose} size="medium" />
      </StyledIcon>

      {children}
    </Box>
  </Layer>
);

export const StyledIcon = styled(Box)`
  cursor: pointer;
  position: absolute;
  right: 25px;
  top: 25px;
`;

export default Modal;

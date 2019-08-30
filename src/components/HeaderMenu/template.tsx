import { Box, Button } from "grommet";
import { Down } from "grommet-icons";
import React, { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import { ContainerBox, IconWrapper, StyledButton, StyledDrop, StyledText } from "./styles";
import { IItem, IProps } from ".";

export const HeaderMenu: React.FC<IProps> = ({ active, id, items, label, margin, open }) => {
  const ref: RefObject<any> = useRef();
  const [show, setShow] = useState(open || false);
  return (
    <Box align="start" justify="center" margin={margin}>
      <Button id={id} ref={ref} onClick={toggleShow(show, setShow)}>
        <Box direction="row" justify="start" align="center" pad="small" gap="small">
          <StyledText size="medium" weight="bold" color={active || show ? "brand" : ""}>
            {label}
          </StyledText>
          <IconWrapper inverted={show}>
            <Down color={active || show ? "brand" : ""} size="small" />
          </IconWrapper>
        </Box>
      </Button>
      {show && (
        <StyledDrop
          id={id ? `${id}__drop` : undefined}
          align={{ top: "bottom" }}
          target={ref.current}
          onClickOutside={handleClickOutside(setShow)}
          elevation="small">
          <ContainerBox background="white">
            <Box overflow="auto">{items.map(renderItem(setShow))}</Box>
          </ContainerBox>
        </StyledDrop>
      )}
    </Box>
  );
};

// comment

// eslint-disable-next-line react/display-name
export const renderItem = (setShow: Dispatch<SetStateAction<boolean>>) => (
  item: IItem,
  index: number
) => (
  <Box key={index} flex={false} data-testid="header-item">
    <StyledButton
      hoverIndicator="background"
      {...{ ...item, icon: undefined, label: undefined }}
      onClick={handleItemClick(setShow, item.onClick)}>
      <Box align="start" pad="small" direction="row">
        {item.icon}
        {item.label}
      </Box>
    </StyledButton>
  </Box>
);

export const handleItemClick = (
  setShow: Dispatch<SetStateAction<boolean>>,
  onClick?: (...args: any[]) => void
) => (...args: any[]) => {
  if (onClick) {
    onClick(...args);
  }
  setShow(false);
};

export const handleClickOutside = (setShow: Dispatch<SetStateAction<boolean>>) => () => {
  setShow(false);
};

export const toggleShow = (show: boolean, setShow: Dispatch<SetStateAction<boolean>>) => () => {
  setShow(!show);
};

export default HeaderMenu;

import { Field, FieldProps } from "formik";
import { Box, Drop, Image, ResponsiveContext, TextInput } from "grommet";
import i18n from "i18next";
import * as React from "react";
import styled from "styled-components";
import iconCheckFilled from "../../assets/img/icons/check_filled.svg";
import iconCheckUnfilled from "../../assets/img/icons/check_unfilled.svg";
import FormField from "../FormField";
import { media } from "../../constants/responsive";
import theme from "../../constants/theme";

interface IState {
  over: boolean;
}

interface IValidation {
  isValid: any;
  message: string;
}

interface IProps {
  label: string;
  type: string;
  touched: any;
  errors: any;
  validations: IValidation[];
  name: string;
}

class FieldWithTooltip extends React.Component<IProps, IState> {
  private ref: any;

  public constructor(props: IProps) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      over: false
    };
  }

  public setOver = () => {
    this.setState(prevState => ({
      over: !prevState.over
    }));
  };

  public validate = (validations: IValidation[], name: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let error: string | undefined;

    validations.forEach(v => {
      if (!v.isValid(e)) {
        error = i18n.t("global.form.validation.invalid", { name }).toLowerCase();
      }
    });
    return error;
  };

  public displayIcon = (isValid: boolean) => {
    return isValid ? iconCheckFilled : iconCheckUnfilled;
  };

  public render() {
    const { ref } = this;
    const { over } = this.state;
    const { label, name, type, touched, errors, validations } = this.props;
    return (
      <>
        <Field
          name={name}
          validate={this.validate(this.props.validations, label)}
          render={({ field }: FieldProps) => (
            <FormField label={label} error={touched.newPassword && errors.newPassword}>
              <TextInput
                type={type}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                ref={ref}
                onFocus={this.setOver}
                onBlur={this.setOver}
              />

              {over && (
                <ResponsiveContext.Consumer>
                  {(size: string) => (
                    <StyledTooltip
                      plain
                      responsive
                      align={
                        size === "small" ? { top: "bottom", left: "right" } : { left: "right" }
                      }
                      target={ref.current}
                      stretch={false}>
                      <StyledBox pad="small" elevation="medium">
                        <ul>
                          {validations.map(validation => (
                            <li key={validation.message}>
                              <Image src={this.displayIcon(validation.isValid(field.value))} />
                              {i18n.t(validation.message)}
                            </li>
                          ))}
                        </ul>
                      </StyledBox>
                    </StyledTooltip>
                  )}
                </ResponsiveContext.Consumer>
              )}
            </FormField>
          )}
        />
      </>
    );
  }
}

const StyledTooltip = styled(Drop)`
  border-radius: 3px;

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    margin-top: -7px;
    border-width: 7px;
    border-style: solid;
    border-color: white white transparent transparent;
    transform: rotate(-45deg);
    box-shadow: 2px -2px 2px 0px rgba(0, 0, 0, 0.1);
  }

  ${media.md`
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 4px;
      margin-top: -6px;
      border-width: 6px;
      border-style: solid;
      transform: rotate(225deg);
      border-color: white white transparent transparent;
    }
  `}

  ul {
    list-style: none;
    padding-inline-start: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;
    font-size: 13px;

    li {
      padding: 6px 10px 6px 0;
      img {
        vertical-align: text-bottom;
        padding-right: 16px;
      }
    }
  }
`;

const StyledBox = styled(Box)`
  border-radius: 3px;
  background-color: ${theme.global.colors.white};
  margin: 10px;
  padding-left: 20px;
`;

export default FieldWithTooltip;

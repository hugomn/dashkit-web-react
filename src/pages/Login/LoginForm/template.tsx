import { Field, FieldProps, Form, Formik } from "formik";
import { Box, Button, Heading, TextInput, Anchor } from "grommet";
import i18n from "i18next";
import * as React from "react";
import { WithTranslation } from "react-i18next";
import * as Yup from "yup";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormField from "../../../components/FormField";
import { publicRoutes } from "../../../constants/routes";

interface IProps {
  login: any;
}

class LoginForm extends React.Component<IProps & WithTranslation> {
  public handleLogin = ({ email, password }: { email: string; password: string }) => {
    this.props.login(email, password);
  };

  public render() {
    const { t } = this.props;
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(i18n.t("global.form.email.validation.invalid"))
            .required(i18n.t("global.form.email.validation.required")),
          password: Yup.string()
            .min(6, i18n.t("global.form.password.validation.invalid"))
            .required(i18n.t("global.form.password.validation.required"))
        })}
        onSubmit={this.handleLogin}>
        {({ errors, touched }) => (
          <>
            <Heading
              size="small"
              level="1"
              textAlign="center"
              margin={{
                bottom: "large"
              }}>
              {t("pages.login.header")}
            </Heading>
            <Form>
              <Field
                name="email"
                render={({ field }: FieldProps) => (
                  <FormField
                    label={t("global.form.email.label")}
                    error={touched.email && errors.email}
                    onBlur={field.onBlur}>
                    <TextInput name={field.name} value={field.value} onChange={field.onChange} />
                  </FormField>
                )}
              />

              <Field
                name="password"
                render={({ field }: FieldProps) => (
                  <FormField
                    label={t("global.form.password.label")}
                    error={touched.password && errors.password}
                    onBlur={field.onBlur}>
                    <TextInput
                      type="password"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormField>
                )}
              />

              <Box align="center">
                <Box
                  width="244px"
                  margin={{
                    bottom: "small",
                    top: "medium"
                  }}>
                  <Button fill primary type="submit" label={t("pages.login.header")} />
                </Box>
                <StyledLink to={publicRoutes.forgotpassword.path}>
                  <Anchor as="span" size="small" label={t("pages.login.form.forgotpassword")} />
                </StyledLink>
              </Box>
            </Form>
          </>
        )}
      </Formik>
    );
  }
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default LoginForm;

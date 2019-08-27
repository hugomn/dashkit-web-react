import { Field, FieldProps, Form, Formik } from "formik";
import { Box, Button, Heading, TextInput } from "grommet";
import i18n from "i18next";
import * as React from "react";
import { WithTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";
import FormField from "../../../components/FormField";
import FieldWithTooltip from "../../../components/FormFieldWithTooltip";
import { passwordValidations } from "../../../utils/validations";

interface IFormProps {
  email: string;
  pin: string;
  newPassword: string;
  confirmPassword: string;
}

interface IProps {
  email: string;
  resetPassword: any;
}

class ResetPasswordForm extends React.Component<IProps & WithTranslation> {
  public resetPassword = ({ email, newPassword, pin }: IFormProps) => {
    this.props.resetPassword(email, newPassword, pin);
  };

  public render() {
    const { t, email } = this.props;
    return (
      <Formik
        initialValues={{ email, pin: "", newPassword: "", confirmPassword: "" }}
        validationSchema={Yup.object().shape({
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref("newPassword")],
              i18n.t("global.form.confirmpassword.validation.invalid")
            )
            .required(i18n.t("global.form.confirmpassword.validation.required")),
          newPassword: Yup.string().required(i18n.t("global.form.password.validation.required")),
          pin: Yup.string().required(i18n.t("pages.forgotpassword.form.pin.validation.required"))
        })}
        onSubmit={this.resetPassword}>
        {({ errors, isValid, touched }) => (
          <>
            <Heading
              size="small"
              level="1"
              textAlign="center"
              margin={{
                bottom: "large"
              }}>
              {t("pages.login.newpassword.header")}
            </Heading>
            <Form>
              <Field
                name="email"
                render={({ field }: FieldProps) => (
                  <DisabledFormField label={t("global.form.email.label")}>
                    <TextInput disabled name="email" value={field.value} />
                  </DisabledFormField>
                )}
              />

              <Field
                name="pin"
                render={({ field }: FieldProps) => (
                  <FormField
                    label={t("global.form.pin.label")}
                    error={
                      /* istanbul ignore next */
                      touched.pin && errors.pin
                    }>
                    <TextInput
                      type="text"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormField>
                )}
              />

              <FieldWithTooltip
                label={t("global.form.newpassword.label")}
                errors={errors}
                touched={touched}
                name="newPassword"
                validations={passwordValidations}
                type="password"
              />

              <Field
                name="confirmPassword"
                render={({ field }: FieldProps) => (
                  <FormField
                    label={t("global.form.confirmpassword.label")}
                    error={
                      /* istanbul ignore next */
                      touched.confirmPassword && errors.confirmPassword
                    }>
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
                  <Button
                    fill
                    primary
                    type="submit"
                    disabled={!isValid}
                    label={t("pages.login.newpassword.actions.submit")}
                  />
                </Box>
              </Box>
            </Form>
          </>
        )}
      </Formik>
    );
  }
}

const DisabledFormField = styled(FormField)`
  & > div {
    border-bottom: 0px;
  }
`;

export default ResetPasswordForm;

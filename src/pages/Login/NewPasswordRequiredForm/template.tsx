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

interface IProps {
  email?: string;
  setNewPassword: any;
}

interface IFormProps {
  email?: string;
  newPassword: string;
  confirmPassword: string;
}

class NewPasswordRequiredForm extends React.Component<IProps & WithTranslation> {
  public handleNewPassword = ({ newPassword }: IFormProps) => {
    this.props.setNewPassword(newPassword);
  };

  public render() {
    const { email, t } = this.props;
    return (
      <Formik
        initialValues={{ email, newPassword: "", confirmPassword: "" }}
        validationSchema={Yup.object().shape({
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref("newPassword")],
              i18n.t("global.form.confirmpassword.validation.invalid")
            )
            .required(i18n.t("global.form.confirmpassword.validation.required")),
          newPassword: Yup.string().required(i18n.t("global.form.password.validation.required"))
        })}
        onSubmit={this.handleNewPassword}>
        {({ errors, touched }) => (
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
                    error={touched.confirmPassword && errors.confirmPassword}
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
                    top: "large"
                  }}>
                  <Button
                    fill
                    primary
                    type="submit"
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

export default NewPasswordRequiredForm;

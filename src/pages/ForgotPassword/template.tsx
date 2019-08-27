import { Field, FieldProps, Form, Formik } from "formik";
import { Box, Button, Heading, TextInput } from "grommet";
import i18n from "i18next";
import * as React from "react";
import { WithTranslation } from "react-i18next";
import { error, success } from "react-toastify-redux";
import styled from "styled-components";
import { media } from "../../constants/responsive";
import { forgotPassword } from "../../service/cognito";
import CardContainer from "../../templates/Containers/Cards/template";
import FormField from "../../components/FormField";
import ResetPasswordForm from "./ResetPassword";

interface IState {
  emailVerified: boolean;
  email: string;
}

interface IProps {
  dispatch: any;
}

class ForgotPassword extends React.Component<WithTranslation & IProps, IState> {
  public constructor(props: WithTranslation & IProps) {
    super(props);
    this.state = {
      email: "",
      emailVerified: false
    };
  }

  public handleSubmit = async (values: { email: string }) => {
    try {
      await forgotPassword(values.email);
      this.setState({ emailVerified: true, email: values.email }, () => {
        this.props.dispatch(success(i18n.t("pages.forgotpassword.verifyemail.form.success")));
      });
    } catch (err) {
      this.setState({ emailVerified: false }, () => {
        this.props.dispatch(error(i18n.t("pages.forgotpassword.form.invalid")));
      });
    }
  };

  public render() {
    const { t } = this.props;
    const { emailVerified } = this.state;
    return (
      <CardContainer>
        <Wrapper pad={{ horizontal: "large", vertical: "medium" }}>
          {emailVerified ? (
            <ResetPasswordForm email={this.state.email} />
          ) : (
            <Formik initialValues={{ email: "" }} onSubmit={this.handleSubmit}>
              {() => (
                <>
                  <Heading
                    size="small"
                    level="1"
                    textAlign="center"
                    margin={{
                      bottom: "xlarge"
                    }}>
                    {t("pages.forgotpassword.header")}
                  </Heading>
                  <Form>
                    <Field
                      name="email"
                      render={({ field }: FieldProps) => (
                        <FormField label={t("global.form.email.label")}>
                          <TextInput name="email" value={field.value} onChange={field.onChange} />
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
                          label={t("pages.forgotpassword.actions.submit")}
                        />
                      </Box>
                    </Box>
                  </Form>
                </>
              )}
            </Formik>
          )}
        </Wrapper>
      </CardContainer>
    );
  }
}

const Wrapper = styled(Box)`
  width: 100%;
  ${media.md`
    min-width: 500px;
  `};
`;

export default ForgotPassword;

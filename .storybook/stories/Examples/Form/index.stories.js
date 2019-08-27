import React from "react";
import { storiesOf } from "@storybook/react";
import { Field, Form, Formik } from "formik";
import { Box, Button, Heading, TextInput } from "grommet";
import styled from "styled-components";
import { media } from "../../../../src/constants/responsive";
import FormField from "../../../../src/components/FormField";

storiesOf("Examples/Form", module).add("Default Formfield", () => {
  const validate = validations => value => {
    let error;
    validations.map(validation => {
      if (!validation.isValid(value)) {
        error = validation.message;
      }
    });
    return error;
  };

  const validations = [{ isValid: value => !!value, message: "Is required" }];

  return (
    <Wrapper pad={{ horizontal: "large", vertical: "medium" }}>
      <Formik initialValues={{ email: "", password: "" }} onSubmit={data => console.log(data)}>
        {({ errors, isValid, touched, ...rest }) => {
          return (
            <>
              <Heading
                size="small"
                level="1"
                textAlign="center"
                margin={{
                  bottom: "large"
                }}
              >
                Form
              </Heading>
              <Form>
                <Field
                  name={"email"}
                  validate={validate(validations)}
                  render={({ field }) => (
                    <FormField
                      label="E-mail"
                      error={touched.email && errors.email}
                      onBlur={field.onBlur}
                    >
                      <TextInput name={field.name} value={field.value} onChange={field.onChange} />
                    </FormField>
                  )}
                />

                <Field
                  name={"password"}
                  render={({ field }) => (
                    <FormField
                      label="Password"
                      error={touched.password && errors.password}
                      onBlur={field.onBlur}
                    >
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
                  <Button
                    primary
                    type="submit"
                    label="Submit"
                    margin={{
                      bottom: "small",
                      top: "large"
                    }}
                    disabled={!isValid}
                  />
                </Box>
              </Form>
            </>
          );
        }}
      </Formik>
    </Wrapper>
  );
});

const Wrapper = styled(Box)`
  width: 500px;
  ${media.md`
    min-width: 500px;
  `};
`;

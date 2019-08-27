import { mount, shallow } from "enzyme";
import { Field, Form, Formik } from "formik";
import { Grommet, ResponsiveContext } from "grommet";
import * as React from "react";
import iconCheckFilled from "../../assets/img/icons/check_filled.svg";
import iconCheckUnfilled from "../../assets/img/icons/check_unfilled.svg";
import theme from "../../constants/theme";
import FieldWithTooltip from "./template";

const newPasswordValidations = [
  {
    isValid: (value: string) => {
      const regex = new RegExp("(?=.{8,})");
      return regex.test(value);
    },
    message: "global.form.newpassword.validation.minlength"
  },
  {
    isValid: (value: string) => {
      const regex = new RegExp("(?=.*[a-z])");
      return regex.test(value);
    },
    message: "global.form.newpassword.validation.lowercase"
  }
];

describe("FormToolTip", () => {
  it("renders a form field", () => {
    const wrapper = shallow(
      <FieldWithTooltip
        label="name"
        type="password"
        touched={jest.fn()}
        errors={jest.fn()}
        validations={[]}
        name="name"
      />
    );
    expect(wrapper.find(Field).length).toBe(1);
  });

  it("sets the state over properly", () => {
    const wrapper = shallow(
      <FieldWithTooltip
        label="name"
        type="password"
        touched={jest.fn()}
        errors={jest.fn()}
        validations={[]}
        name="name"
      />
    );
    const instance: any = wrapper.instance();
    expect(wrapper.state("over")).toEqual(false);

    instance.setOver();
    expect(wrapper.state("over")).toEqual(true);

    instance.setOver();
    expect(wrapper.state("over")).toEqual(false);
  });

  describe("Display the correct icon", () => {
    it("displays the icon unfilled if false", () => {
      const wrapper = shallow(
        <FieldWithTooltip
          label="name"
          type="password"
          touched={jest.fn()}
          errors={jest.fn()}
          validations={[]}
          name="name"
        />
      );
      const instance: any = wrapper.instance();
      const val = instance.displayIcon(false);
      expect(val).toBe(iconCheckUnfilled);
    });

    it("displays the icon filled if true", () => {
      const wrapper = shallow(
        <FieldWithTooltip
          label="name"
          type="password"
          touched={jest.fn()}
          errors={jest.fn()}
          validations={[]}
          name="name"
        />
      );
      const instance: any = wrapper.instance();
      const val = instance.displayIcon(true);
      expect(val).toBe(iconCheckFilled);
    });
  });

  describe("Validate password", () => {
    it("returns an error message", () => {
      const wrapper = shallow(
        <FieldWithTooltip
          label="name"
          type="password"
          touched={jest.fn()}
          errors={jest.fn()}
          validations={[]}
          name="name"
        />
      );

      const instance: any = wrapper.instance();
      const result = instance.validate(newPasswordValidations, "new password");
      expect(result("t123")).toEqual("global.form.validation.invalid");
    });

    it("returns undefined", () => {
      const wrapper = shallow(
        <FieldWithTooltip
          label="name"
          type="password"
          touched={jest.fn()}
          errors={jest.fn()}
          validations={[]}
          name="name"
        />
      );

      const instance: any = wrapper.instance();
      const result = instance.validate(newPasswordValidations, "new password");
      expect(result("test1234")).toBeUndefined();
    });
  });

  describe("Renders the correct number of validations in small screens", () => {
    const wrapper = mount(
      <Grommet theme={theme}>
        <Formik onSubmit={jest.fn()} initialValues={{}}>
          {() => (
            <Form>
              <ResponsiveContext.Provider value="small">
                <FieldWithTooltip
                  label="name"
                  type="password"
                  touched={jest.fn()}
                  errors={jest.fn()}
                  validations={newPasswordValidations}
                  name="name"
                />
              </ResponsiveContext.Provider>
            </Form>
          )}
        </Formik>
      </Grommet>
    );

    const instance: any = wrapper.find(FieldWithTooltip).instance();
    instance.setOver();
    wrapper.setState({ over: true });
    expect(wrapper.find("ul").children()).toHaveLength(newPasswordValidations.length);
  });

  describe("Renders the component in large screens", () => {
    const wrapper = mount(
      <Grommet theme={theme}>
        <Formik onSubmit={jest.fn()} initialValues={{}}>
          {() => (
            <Form>
              <ResponsiveContext.Provider value="large">
                <FieldWithTooltip
                  label="name"
                  type="password"
                  touched={jest.fn()}
                  errors={jest.fn()}
                  validations={newPasswordValidations}
                  name="name"
                />
              </ResponsiveContext.Provider>
            </Form>
          )}
        </Formik>
      </Grommet>
    );

    const instance: any = wrapper.find(FieldWithTooltip).instance();
    instance.setOver();
    wrapper.setState({ over: true });
    expect(wrapper.find("ul").children()).toHaveLength(newPasswordValidations.length);
  });
});

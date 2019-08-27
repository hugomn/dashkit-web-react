export const passwordValidations = [
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
  },
  {
    isValid: (value: string) => {
      const regex = new RegExp("(?=.*[A-Z])");
      return regex.test(value);
    },
    message: "global.form.newpassword.validation.uppercase"
  },
  {
    isValid: (value: string) => {
      const regex = new RegExp("(?=.*[0-9])|(?=.*[!@#$%^&])");
      return regex.test(value);
    },
    message: "global.form.newpassword.validation.specialcharacter"
  }
];

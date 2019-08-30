import { FormCheckmark } from "grommet-icons";
import { generate } from "grommet/themes";
/* istanbul ignore file */

const baseSpacing = 20;
const scale = 6;
const baseFontSize = baseSpacing * 0.75;
const fontScale = baseSpacing / scale;

const brandColor = "#5E77FF";
const accentColors = ["#484E98", "#7BC3BD", "#F2BE3B"];
const darkColors = ["#333E49", "#435365", "#748190", "#B9C2CE"];
const lightColors = ["#FFFFFF", "#FAFBFE", "#EFF2F6", "#D7DEE7"];
const backgroundColor = lightColors[1];

const statusColors = {
  confirmation: "#006952",
  critical: "#D40007",
  disabled: lightColors[2],
  error: "#D40007",
  information: "#164FA1",
  warning: "#FFA900"
};

const textColor = {
  dark: darkColors[3],
  light: darkColors[0]
};

const getPercent = (percent = 100) => {
  return percent * 0.01;
};

const hexToRgb = (hex: string, percent: number) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const opacity = getPercent(percent);
  return result
    ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )},${opacity})`
    : null;
};

export const fontSizing = (factor: number) => ({
  height: `${baseSpacing + factor * fontScale}px`,
  maxWidth: `${baseSpacing * (baseFontSize + factor * fontScale)}px`,
  size: `${baseFontSize + factor * fontScale}px`
});

const colors = {
  background: backgroundColor,
  black: darkColors[0],
  border: lightColors[2],
  brand: brandColor,
  focus: brandColor,
  placeholder: darkColors[3],
  selected: "brand-70",
  text: textColor,
  white: lightColors[0]
};

const colorArray = (array: string[], prefix: string) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

const opacityArray = (color: string, prefix: string) =>
  [70, 30, 10].forEach(opacity => {
    colors[`${prefix}-${opacity}`] = hexToRgb(color, opacity);
  });

colorArray(accentColors, "accent");
colorArray(darkColors, "dark");
colorArray(lightColors, "light");
opacityArray(brandColor, "brand");
opacityArray(accentColors[0], "accent-1");
opacityArray(accentColors[1], "accent-2");

Object.keys(statusColors).forEach(color => {
  colors[`status-${color}`] = statusColors[color];
});

export default {
  ...generate(baseSpacing, scale),
  global: {
    active: {
      background: { dark: "none", light: "brand-10" },
      color: brandColor
    },
    colors: {
      ...colors
    },
    control: {
      border: {
        color: lightColors[3],
        radius: "2px"
      }
    },
    focus: {
      border: {
        color: brandColor
      }
    },
    font: {
      ...fontSizing(0),
      face: `
      @font-face {
        font-family: "Inter";
        src: url("../assets/fonts/Inter-Regular.woff2") format('font-woff2') local('Inter'),
        url("../fonts/Inter-Regular.woff") format('font-woff'),
        url("../fonts/Inter-Regular.ttf") format('truetype');
        font-style: normal;
      }
      @font-face {
        font-family: "Inter";
        src: url("../fonts/Inter-Bold.woff2") format('font-woff2') local('Inter'),
        url("../fonts/Inter-Bold.woff") format('font-woff'),
        url("../fonts/Inter-Bold.ttf") format('truetype');
        font-weight: 700;
        font-style: bold;
      }
      `,
      family: "'Inter', sans-serif"
    },
    hover: {
      background: "brand-10",
      color: brandColor
    },
    input: {
      weight: 400
    }
  },
  // tslint:disable-next-line: object-literal-sort-keys
  anchor: {
    color: {
      dark: darkColors[2],
      light: brandColor
    },
    hover: {
      color: {
        dark: colors.white,
        light: accentColors[0]
      },
      textDecoration: "none"
    },
    textDecoration: "none"
  },
  button: {
    border: {
      color: colors.brand,
      radius: "4px",
      width: "1px"
    },
    color: {
      dark: lightColors[0],
      light: colors.white
    },
    disabled: {
      opacity: 1
    },
    extend: ({ disabled, fillContainer, primary, plain }: any) => `
    ${styleButton(disabled, fillContainer, primary, plain)}
    `,
    padding: {
      vertical: "12px"
    },
    primary: { color: colors.brand }
  },
  calendar: {
    day: {
      extend: `
        &:hover {
          color: ${lightColors[0]};
          background-color: ${colors.brand};
          opacity: 1;
        }
      `
    }
  },
  checkBox: {
    border: {
      color: darkColors[1],
      radius: "2px",
      width: "2px"
    },
    check: {
      extend: ({ checked, disabled }: any) => `
          background-color: ${
            // eslint-disable-next-line no-nested-ternary
            checked ? colors.brand : disabled ? lightColors[3] : ``
          };
          ${checked && `border-color: ${colors.brand};`}
        `
    },
    gap: "16px",
    hover: {
      border: {
        color: undefined
      }
    },
    icon: {
      extend: "stroke: white;",
      size: "18px"
    },
    icons: {
      checked: FormCheckmark
    },
    size: "18px"
  },
  dataTable: {
    header: {
      background: colors.brand
    }
  },
  formField: {
    border: false,
    label: {
      color: darkColors[1],
      padding: 0,
      weight: "bold"
    },
    margin: {
      bottom: "large"
    }
  },
  grommet: {
    extend: `
      height: auto;
      min-height: 100%;
    `
  },
  heading: {
    color: darkColors[1],
    level: {
      "1": {
        medium: {
          height: "56px",
          size: "48px"
        }
      },
      "2": {
        medium: {
          height: "40px",
          size: "32px"
        }
      },
      "3": {
        medium: {
          height: "32px",
          size: "24px"
        }
      },
      "4": {
        medium: {
          height: "32px",
          size: "20px"
        }
      },
      "5": {
        medium: {
          height: "24px",
          size: "16px"
        }
      },
      "6": {
        medium: {
          height: "20px",
          size: "14px"
        }
      }
    },
    weight: 600
  },
  layer: {
    border: {
      radius: "2px"
    },
    overlay: {
      background: hexToRgb(darkColors[1], 60)
    }
  },
  menu: {
    extend: () => {
      return `
        min-width: 160px;
      `;
    }
  },
  radioButton: {
    border: {
      color: darkColors[1]
    },
    check: {
      color: colors.brand
    },
    color: colors.brand,
    hover: {
      border: {
        color: darkColors[1]
      }
    }
  },
  select: {
    background: lightColors[0],
    control: {
      border: {
        radius: "2px"
      },
      extend: ({ disabled }: any) =>
        disabled &&
        `
          border-color: ${lightColors[2]};
          div, input {
            background-color: ${lightColors[2]};
          }
        `
    },
    icons: { color: darkColors[1] }
  },
  table: {
    body: {
      background: colors.white,
      backgroundEven: lightColors[2],
      border: "bottom",
      lineHeight: "34px",
      padding: {
        horizontal: "12px",
        vertical: "12px"
      }
    },
    header: {
      background: lightColors[1],
      color: darkColors[1],
      colorActive: brandColor,
      borderColor: darkColors[3],
      padding: {
        horizontal: "12px",
        vertical: "15px"
      }
    }
  },
  textArea: {
    disabled: {
      opacity: 1
    },
    extend: ({ focus, plain, disabled }: any) => `  
      background-color: ${
        // eslint-disable-next-line no-nested-ternary
        focus ? lightColors[0] : disabled ? lightColors[2] : lightColors[0]
      };
      transition: all 0.1s ease;
      ${focus &&
        !plain &&
        `
        box-shadow: 0 0 2px ${brandColor};
        border-color: ${brandColor};
      `};
      ${disabled &&
        `
        color: ${darkColors[2]};
        border-color: ${lightColors[2]};
      `};
      caret-color: ${colors.brand};
    `
  },
  textInput: {
    disabled: {
      opacity: 1
    },
    extend: ({ focus, plain, disabled }: any) => `
      transition: all 0.1s ease;
      background-color: ${
        // eslint-disable-next-line no-nested-ternary
        focus ? lightColors[0] : disabled ? statusColors.disabled : lightColors[0]
      };      
      ${focus &&
        !plain &&
        `
        box-shadow: 0 0 2px ${brandColor};
        border-color: ${brandColor};
      `};
      ${disabled &&
        `
        color: ${darkColors[2]};
        border-color: ${lightColors[2]};
      `};
      caret-color: ${colors.brand};
      line-height: 24px;
      &[type=date] {
        line-height: 22px;
      }
    `
  }
};

const styleButton = (
  disabled: boolean,
  fillContainer: boolean,
  primary: boolean,
  plain: boolean
) => `
  ${disabled &&
    `
      background-color: ${primary ? darkColors[3] : "transparent"};
      color: ${primary ? darkColors[2] : darkColors[3]};
      border: ${!plain ? `2px solid ${darkColors[3]}` : "none"};
    `};  
  ${!fillContainer &&
    !plain &&
    `
      min-width: 160px;
    `};
`;

import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Heading, Text } from "grommet";
import RadioCardGroup from "../../../../src/components/RadioCardGroup";
import { action } from "@storybook/addon-actions";

storiesOf("Components/Radio Card Group", module).add("RadioCardGroup", () => {
  return (
    <Box>
      <Box>
        <Heading level="3">Radio Card Group</Heading>
        <RadioCardGroup
          options={[
            {
              value: "c1",
              label: "Choice 1",
              description:
                "Lorem ipsum dolor sit amet, ei usu recteque constituto, in vix iuvaret dolorum consequat. Id quis dicat civibus sit, ut vis meis dissentiet, ad sale dignissim per. Ea iusto errem omittam mei, viderer habemus."
            },
            {
              value: "c2",
              label: "Choice 2",
              description:
                "Lorem ipsum dolor sit amet, ei usu recteque constituto, in vix iuvaret dolorum consequat. Id quis dicat civibus sit, ut vis meis dissentiet, ad sale dignissim per. Ea iusto errem omittam mei, viderer habemus."
            },
            {
              value: "c3",
              label: "Choice 3",
              description:
                "Lorem ipsum dolor sit amet, ei usu recteque constituto, in vix iuvaret dolorum consequat. Id quis dicat civibus sit, ut vis meis dissentiet, ad sale dignissim per. Ea iusto errem omittam mei, viderer habemus."
            }
          ]}
          onSelect={value => alert(value)}
          selectedValue="c2"
        />
      </Box>

      <Box>
        <Heading level="3">Disabled Radio Cards</Heading>
        <RadioCardGroup
          disabled
          options={[
            {
              value: "c1",
              label: "Choice 1",
              description:
                "Lorem ipsum dolor sit amet, ei usu recteque constituto, in vix iuvaret dolorum consequat. Id quis dicat civibus sit, ut vis meis dissentiet, ad sale dignissim per. Ea iusto errem omittam mei, viderer habemus."
            },
            {
              value: "c2",
              label: "Choice 2",
              description:
                "Lorem ipsum dolor sit amet, ei usu recteque constituto, in vix iuvaret dolorum consequat. Id quis dicat civibus sit, ut vis meis dissentiet, ad sale dignissim per. Ea iusto errem omittam mei, viderer habemus."
            },
            {
              value: "c3",
              label: "Choice 3",
              description:
                "Lorem ipsum dolor sit amet, ei usu recteque constituto, in vix iuvaret dolorum consequat. Id quis dicat civibus sit, ut vis meis dissentiet, ad sale dignissim per. Ea iusto errem omittam mei, viderer habemus."
            }
          ]}
        />
      </Box>
    </Box>
  );
});

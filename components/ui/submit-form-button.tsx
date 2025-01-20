import { IButtonProps } from "@gluestack-ui/button/lib/types";
import React from "react";
import { BooleanLike, Else, If, Then, When } from "react-if";
import colors from "tailwindcss/colors";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "./button";

interface AdditionalProps {
  title: string;
  buttonIcon?: React.ElementType;
  showButtonSpinnerCondition?: BooleanLike | (() => BooleanLike);
}

type SubmitFormButtonProps = AdditionalProps & IButtonProps;

export default function SubmitFormButton(
  props: Readonly<SubmitFormButtonProps>,
) {
  const { title, buttonIcon, showButtonSpinnerCondition } = props;

  return (
    <Button {...props}>
      <If condition={showButtonSpinnerCondition}>
        <Then>
          <ButtonSpinner color={colors.white} />
        </Then>
        <Else>
          <When condition={!!buttonIcon}>
            <ButtonIcon as={buttonIcon} />
          </When>
        </Else>
      </If>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}

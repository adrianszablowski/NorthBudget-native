import useUserContext from "@/hooks/user-user-context";
import React from "react";
import { ITextProps, Text } from "./text";

interface AmountProps extends ITextProps {
  amount: number;
}

export default function Amount(props: AmountProps) {
  const { user } = useUserContext();
  const { amount } = props;

  return (
    <Text {...props}>
      {amount.toFixed(2)} {user?.currency}
    </Text>
  );
}

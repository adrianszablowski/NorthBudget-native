import { add, format, sub } from "date-fns";
import React, { Dispatch, SetStateAction } from "react";
import { Button, ButtonIcon } from "../ui/button";
import { Card } from "../ui/card";
import { HStack } from "../ui/hstack";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/icon";
import { Text } from "../ui/text";

interface SwitchMonthProps {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

export default function SwitchMonth({
  currentDate,
  setCurrentDate,
}: Readonly<SwitchMonthProps>) {
  return (
    <HStack space="sm" className="justify-between">
      <Button
        onPress={() => {
          setCurrentDate(
            sub(currentDate, {
              months: 1,
            }),
          );
        }}
      >
        <ButtonIcon as={ChevronLeftIcon} />
      </Button>
      <Card variant="filled" className="py-2">
        <Text>{format(currentDate, "LLLL")}</Text>
      </Card>
      <Button
        onPress={() => {
          setCurrentDate(
            add(currentDate, {
              months: 1,
            }),
          );
        }}
      >
        <ButtonIcon as={ChevronRightIcon} />
      </Button>
    </HStack>
  );
}

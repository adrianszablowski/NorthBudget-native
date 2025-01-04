import { ChevronDownIcon } from "@/components/ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Currency } from "@/contexts/currency-context";
import useCurrencyContext from "@/hooks/use-currency-context";
import React from "react";

export default function SelectCurrency() {
  const { currency, handleSetCurrency } = useCurrencyContext();

  return (
    <Select
      defaultValue={currency}
      onValueChange={(value) => handleSetCurrency(value as Currency)}
    >
      <SelectTrigger>
        <SelectInput placeholder="PLN" />
        <SelectIcon as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent className="pb-10">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="EUR" value="EUR" />
          <SelectItem label="PLN" value="PLN" />
          <SelectItem label="USD" value="USD" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

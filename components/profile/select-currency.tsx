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
import React from "react";

export default function SelectCurrency() {
  return (
    <Select defaultValue="EUR">
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

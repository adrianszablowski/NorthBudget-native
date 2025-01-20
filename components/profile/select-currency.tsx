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
import useUserContext from "@/hooks/user-user-context";
import { setUserCurrency } from "@/lib/api/user";
import { Currency } from "@/types/types";
import React from "react";
import { showToast } from "../toast/show-toast";

export default function SelectCurrency() {
  const { user, init } = useUserContext();

  const handleSetCurrency = async (currency: Currency) => {
    const { success, message } = await setUserCurrency({ currency });

    if (!success) {
      showToast("error", message);
    } else {
      init();
      showToast("success", message);
    }
  };

  return (
    <Select
      defaultValue={user?.currency}
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

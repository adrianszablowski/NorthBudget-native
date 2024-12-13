import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageActionsheetProps {
  showActionsheet: boolean;
  handleClose: () => void;
}

export default function LanguageActionsheet({
  showActionsheet,
  handleClose,
}: Readonly<LanguageActionsheetProps>) {
  const { t, i18n } = useTranslation();

  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem
          onPress={() => {
            handleClose();
            i18n.changeLanguage("en");
          }}
        >
          <ActionsheetItemText>{t("English")}</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem
          onPress={() => {
            handleClose();
            i18n.changeLanguage("pl");
          }}
        >
          <ActionsheetItemText>{t("Polish")}</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}

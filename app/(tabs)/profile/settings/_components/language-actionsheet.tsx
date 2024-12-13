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

interface LanguageActionsheetProps {
  showActionsheet: boolean;
  handleClose: () => void;
}

export default function LanguageActionsheet({
  showActionsheet,
  handleClose,
}: Readonly<LanguageActionsheetProps>) {
  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={handleClose}>
          <ActionsheetItemText>Edit Message</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleClose}>
          <ActionsheetItemText>Mark Unread</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleClose}>
          <ActionsheetItemText>Remind Me</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleClose}>
          <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem isDisabled onPress={handleClose}>
          <ActionsheetItemText>Delete</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}

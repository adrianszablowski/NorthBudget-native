import { Button, ButtonText } from "@/components/ui/button";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageActionsheet from "./_components/language-actionsheet";

export default function Settings() {
  const [showActionsheet, setShowActionsheet] = useState(false);

  const handleClose = () => setShowActionsheet(false);

  return (
    <SafeAreaView>
      <Button onPress={() => setShowActionsheet(true)}>
        <ButtonText>ddddd</ButtonText>
      </Button>
      <LanguageActionsheet
        showActionsheet={showActionsheet}
        handleClose={handleClose}
      />
    </SafeAreaView>
  );
}

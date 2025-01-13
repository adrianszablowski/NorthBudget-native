import i18next from "i18next";
import Toast, { ToastType } from "react-native-toast-message";

export const showToast = (
  type: ToastType,
  message: string,
  header?: string,
) => {
  Toast.show({
    type,
    text1:
      (header ?? type === "success")
        ? i18next.t("Success")
        : i18next.t("Error"),
    text2: message,
  });
};

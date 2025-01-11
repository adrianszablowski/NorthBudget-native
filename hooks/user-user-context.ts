import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

export default function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}

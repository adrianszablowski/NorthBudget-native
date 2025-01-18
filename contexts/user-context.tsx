import { getCurrentUser } from "@/lib/api/user";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Models } from "react-native-appwrite";

interface UserContextProviderProps {
  children: ReactNode;
}

interface IUserContext {
  user: Models.Document | null;
  handleRemoveUser: () => void;
  init: () => Promise<void>;
}

export const UserContext = createContext<IUserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<Models.Document | null>(null);

  const handleRemoveUser = () => setUser(null);

  const init = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const value = useMemo(() => ({ user, handleRemoveUser, init }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

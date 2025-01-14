import { account } from "@/lib/appwrite";
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
  user: Models.User<Models.Preferences> | null;
  handleRemoveUser: () => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  const handleRemoveUser = () => setUser(null);

  const init = async () => {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const value = useMemo(() => ({ user, handleRemoveUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

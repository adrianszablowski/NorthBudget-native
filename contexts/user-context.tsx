import { getCurrentUser } from "@/lib/api/user";
import { User } from "@/types/types";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

interface UserContextProviderProps {
  children: ReactNode;
}

interface IUserContext {
  user: User | null;
  handleRemoveUser: () => void;
  init: () => Promise<void>;
  isLoading: boolean;
}

export const UserContext = createContext<IUserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRemoveUser = () => setUser(null);

  const init = async () => {
    setIsLoading(true);

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const value = useMemo(
    () => ({ user, handleRemoveUser, init, isLoading }),
    [user, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

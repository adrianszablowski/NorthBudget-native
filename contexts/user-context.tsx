import React, { createContext, ReactNode, useMemo, useState } from "react";

interface User {
  name: string;
}

interface UserContextProviderProps {
  children: ReactNode;
}

interface IUserContext {
  user: User | null;
  handleSetUser: (user: User) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const handleSetUser = (currency: User) => {
    setUser(currency);
  };

  const value = useMemo(() => ({ user, handleSetUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

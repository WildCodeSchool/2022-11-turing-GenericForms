import { createContext, useContext, useState } from "react";

interface UserContextProps {
  userContext: UserDTO | undefined;
  setUserContext: React.Dispatch<React.SetStateAction<UserDTO | undefined>>;
}

export const UserStateContext = createContext<UserContextProps>({} as UserContextProps);

type UserProviderProps = {
    children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    
  const [userContext, setUserContext] = useState<UserDTO>();
  const value: UserContextProps = {
    userContext,
    setUserContext,
  };
  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("useUserState must be used within the UserProvider");
  }
  return context;
}

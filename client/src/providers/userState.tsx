import { useQuery } from "@apollo/client";
import { createContext, useContext, useState } from "react";
import { READ_FORMS } from "../services/forms.query";
import { FormDTO, ReadFormsDTO } from "../types/form";

export const UserStateContext = createContext<any>([]);

type UserProviderProps = {
    children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    
  const value = useState<FormDTO>();
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

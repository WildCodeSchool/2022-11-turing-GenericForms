import { useQuery } from "@apollo/client";
import { createContext, useContext, useState } from "react";
import { READ_FORMS } from "../services/forms.query";
import { FormDTO, ReadFormsDTO } from "../types/form";

export const EditFormStateContext = createContext<any>([]);

type EditFormProviderProps = {
    children: React.ReactNode;
};

export function EditFormProvider({ children }: EditFormProviderProps) {
    
  const value = useState<FormDTO>();
  return (
    <EditFormStateContext.Provider value={value}>
      {children}
    </EditFormStateContext.Provider>
  );
}

export function useEditFormState() {
  const context = useContext(EditFormStateContext);
  if (!context) {
    throw new Error("useEditFormState must be used within the EditFormProvider");
  }
  return context;
}

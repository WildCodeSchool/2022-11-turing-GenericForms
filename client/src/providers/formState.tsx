import { createContext, useContext, useState } from "react";
import { FormDTO } from "../types/form";

interface FormContextProps {
  formContext: FormDTO | undefined;
  setFormContext: React.Dispatch<React.SetStateAction<FormDTO | undefined>>;
}

export const EditFormStateContext = createContext<FormContextProps>({} as FormContextProps);

type EditFormProviderProps = {
    children: React.ReactNode;
};

export function EditFormProvider({ children }: EditFormProviderProps) {
    
  const [formContext, setFormContext] = useState<FormDTO | undefined>();

  const value: FormContextProps = {
    formContext,
    setFormContext,
  };

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

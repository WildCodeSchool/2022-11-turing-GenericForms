import { ReactElement } from "react";

type menuItem = {
    title: string;
    icon: ReactElement;
};

type menuItems = menuItem[];

export interface ResponseMessageDTO {
    message: string;
    success: boolean;
};
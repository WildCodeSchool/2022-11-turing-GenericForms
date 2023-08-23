interface UserDTO {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    forms: FormDTO[];
}

interface ReadOneUserDTO {
  readOneUser: UserDTO;
}

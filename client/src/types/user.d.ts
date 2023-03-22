interface UserDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface ReadOneUserDTO {
  readOneUser: UserDTO;
}

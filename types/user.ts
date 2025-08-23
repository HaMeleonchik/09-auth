export interface User {
  username: string,
  email: string,
  avatar: string 
}


export type UpdateUserRequest = {
  email: string,
  username:string
};

export interface checkSessionResponse{
  success:boolean,
}
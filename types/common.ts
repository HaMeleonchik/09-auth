export type UpdateUserRequest = {
  email: string,
  username:string
};

export interface checkSessionResponse{
  success:boolean,
}
export interface LogoutResponse{
    message:string,
}
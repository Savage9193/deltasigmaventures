export type UserStatus = 'pending' | 'active' | 'inactive';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  // address: string;
  status: UserStatus;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  // address: string;
  status: UserStatus;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

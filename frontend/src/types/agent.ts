export interface PropertyAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyAgentDTO {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

export interface UpdatePropertyAgentDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
}

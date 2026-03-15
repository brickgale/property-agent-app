export interface PropertyAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface Client {
  internalId: number;
  clientId: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientInvitee {
  inviteeId: number;
  inviteeEmail: string;
  clientId: string;
  permission: PermissionType;
  createdAt: string;
  updatedAt: string;
}

export enum PermissionType {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
  ADMIN = "ADMIN",
}

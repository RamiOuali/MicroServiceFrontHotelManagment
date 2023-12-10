export enum RoleType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  HOUSEKEEPING = 'HOUSEKEEPING',
  SECURITY = 'SECURITY',
  WAIT_STAFF = 'WAIT_STAFF',
}

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hireDate: Date;
  role: RoleType;
  salary: number;

}

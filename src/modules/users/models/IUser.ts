interface IUser {
  id: string;

  name: string;

  company: string;

  CNPJ: string;

  email: string;

  password: string;

  created_at: Date;

  updated_at: Date;
}

export { IUser };

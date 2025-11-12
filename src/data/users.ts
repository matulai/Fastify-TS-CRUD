export interface User {
  id: number;
  name: string;
  email: string;
}

export const users: User[] = [
  { id: 1, name: "Matías", email: "matias@example.com" },
  { id: 2, name: "Ana", email: "ana@example.com" },
];

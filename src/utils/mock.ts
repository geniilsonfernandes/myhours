const users = [
  {
    id: "1",
    email: "j@j.com",
    password: "123",
  },
];

export const getUserByEmail = (email: string) => {
  const found = users.find((user) => user.email === email);
  return found;
};

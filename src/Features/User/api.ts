interface User {
  email: string;
  password: string;
}

const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch("http://localhost:3001/users");
    const users: User[] = await response.json();

    const user = users.find((u) => u.email === email && u.password === password);
    return user || null;

  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export { login };
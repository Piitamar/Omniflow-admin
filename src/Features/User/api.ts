import type { LoginUser } from "../../UIstore";

interface ApiUser extends LoginUser {
  password: string;
}

const login = async (email: string, password: string): Promise<LoginUser | null> => {
  try {
    const response = await fetch("http://localhost:3001/users");
    if (!response.ok) return null;
    const users: ApiUser[] = await response.json();

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...loginUser } = user;
    return loginUser;

  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export { login };

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: "OWNER" | "MEMBER";
  createdAt: string;
  updatedAt: string;
};

type AuthResponse = {
  user: PublicUser;
};

type ApiErrorBody = {
  message?: string | string[];
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<T>;
}

async function getErrorMessage(response: Response) {
  try {
    const body = (await response.json()) as ApiErrorBody;

    if (Array.isArray(body.message)) {
      return body.message.join(", ");
    }

    return body.message ?? "Request failed";
  } catch {
    return response.statusText || "Request failed";
  }
}

export const authApi = {
  register(input: RegisterInput) {
    return request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  login(input: LoginInput) {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  logout() {
    return request<{ success: boolean }>("/auth/logout", {
      method: "POST",
    });
  },
  me() {
    return request<AuthResponse>("/auth/me");
  },
};

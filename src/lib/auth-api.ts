export type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
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
  const isFormData = init?.body instanceof FormData;
  const response = await fetch(`/api${path}`, {
    ...init,
    credentials: "include",
    headers: isFormData
      ? init?.headers
      : {
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

export type AdminOverview = {
  stats: {
    totalUsers: number;
    adminUsers: number;
    regularUsers: number;
  };
  latestUsers: PublicUser[];
};

export const adminApi = {
  overview() {
    return request<AdminOverview>("/admin/overview");
  },
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  priceLabel: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
};

export type ProductImage = {
  id: string;
  url: string;
  filename: string;
  productId: string;
  createdAt: string;
};

export type ProductInput = {
  title: string;
  category: string;
  description: string;
  priceLabel: string;
  isPublished: boolean;
};

export const productsApi = {
  published() {
    return request<Product[]>("/products");
  },
};

export const adminProductsApi = {
  list() {
    return request<Product[]>("/admin/products");
  },
  create(input: ProductInput, images: File[] = []) {
    return request<Product>("/admin/products", {
      method: "POST",
      body: toProductFormData(input, images),
    });
  },
  update(id: string, input: Partial<ProductInput>) {
    return request<Product>(`/admin/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  },
  remove(id: string) {
    return request<{ success: boolean }>(`/admin/products/${id}`, {
      method: "DELETE",
    });
  },
  addImages(id: string, images: File[]) {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    return request<Product>(`/admin/products/${id}/images`, {
      method: "POST",
      body: formData,
    });
  },
  removeImage(productId: string, imageId: string) {
    return request<{ success: boolean }>(`/admin/products/${productId}/images/${imageId}`, {
      method: "DELETE",
    });
  },
};

function toProductFormData(input: ProductInput, images: File[]) {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("category", input.category);
  formData.append("description", input.description);
  formData.append("priceLabel", input.priceLabel);
  formData.append("isPublished", String(input.isPublished));
  images.forEach((image) => formData.append("images", image));
  return formData;
}

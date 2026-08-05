type Environment = {
  NODE_ENV: "development" | "test" | "production";
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_COOKIE_NAME: string;
  CLIENT_ORIGIN: string;
};

export function validateEnvironment(config: Record<string, unknown>): Environment {
  const required = ["DATABASE_URL", "JWT_SECRET", "CLIENT_ORIGIN"] as const;

  for (const key of required) {
    if (!config[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    NODE_ENV: (config.NODE_ENV as Environment["NODE_ENV"]) || "development",
    PORT: Number(config.PORT || 4000),
    DATABASE_URL: String(config.DATABASE_URL),
    JWT_SECRET: String(config.JWT_SECRET),
    JWT_EXPIRES_IN: String(config.JWT_EXPIRES_IN || "7d"),
    JWT_COOKIE_NAME: String(config.JWT_COOKIE_NAME || "nusaflow_access_token"),
    CLIENT_ORIGIN: String(config.CLIENT_ORIGIN),
  };
}

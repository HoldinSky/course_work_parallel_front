export const Server = {
  ip: "127.0.0.1",
  port: 2772,
} as const;

export const ServerAddress = `http://${Server.ip}:${Server.port}`;

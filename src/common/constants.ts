export const Server = {
  ip: "127.0.0.1",
  port: 2772,
} as const;

export const ServerAddress = `http://${Server.ip}:${Server.port}`;

export enum ServerRoutes {
  addToIndex = "/add-to-index",
  removeFromIndex = "/remove-from-index",
  filesWithAnyWord = "/files-any-word",
  filesWithAllWords = "/files-all-words",
  reindex = "/reindex",
  getAllIndexed = "/get-all-indexed",
}

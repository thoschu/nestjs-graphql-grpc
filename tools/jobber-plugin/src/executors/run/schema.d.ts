export type Configuration = Partial<{
  app: string;
  params: string;
}>;

export interface RunExecutorSchema {
  config: Configuration;
  cmd: string;
}

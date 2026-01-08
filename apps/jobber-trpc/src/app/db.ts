import { User } from './app.type';

const users: User[] = [];

export const db = {
  user: {
    findMany: async (): Promise<Array<User>> => users,
    findById: async (id: string): Promise<User | undefined> => users.find((user: User): boolean => user.id === id),
    create: async (data: { name: string }): Promise<User> => {
      const user: User = { id: String(users.length + 1), ...data };

      users.push(user);

      return user;
    }
  }
};

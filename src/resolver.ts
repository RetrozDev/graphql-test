import data from './data/data.json' with { type: 'json' };
const { users } = data;

type User = {
	id: string; // Changed from number to string to match GraphQL ID type
	firstname: string;
	lastname: string;
	email: string;
	age?: number;
};

export const resolvers = {
	Query: {
		users: () => users,
		user: (_: unknown, { id }: { id: string }) => {
			const foundUser = users.find((user) => user.id === id);
			if (!foundUser) {
				throw new Error(`User with ID ${id} not found`);
			}
			return foundUser;
		},
	},

	Mutation: {
		createUser: (
			_: unknown,
			{ firstname, lastname, email, age }: Omit<User, 'id'>,
		) => {
			const newUser = {
				id: String(users.length + 1),
				firstname,
				lastname,
				email,
				age,
			};
			users.push(newUser);
			return newUser;
		},

		updateUser: (
			_: unknown,
			{ id, ...updates }: Partial<User> & { id: string },
		) => {
			const userIndex = users.findIndex((user) => user.id === id);
			if (userIndex === -1) {
				throw new Error(`User with ID ${id} not found`);
			}
			users[userIndex] = { ...users[userIndex], ...updates };
			return users[userIndex];
		},

		deleteUser: (_: unknown, { id }: { id: string }) => {
			const userIndex = users.findIndex((user) => user.id === id);
			if (userIndex === -1) {
				throw new Error(`User with ID ${id} not found`);
			}
			users.splice(userIndex, 1);
			return true;
		},
	},
};

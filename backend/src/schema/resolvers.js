// Mock Data
const users = [{ id: 1, username: "test@test.com", password: "test" }];

module.exports = resolvers = {
  Query: {
    me: (parent, args, context) => {
      const token = context.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");

      try {
        const user = jwt.verify(token, "SECRET_KEY");
        return users.find((u) => u.id === user.id);
      } catch (err) {
        throw new Error("Unauthorized");
      }
    },
  },
};

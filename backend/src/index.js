const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const rateLimiter = require("./middleware/rateLimit");
const resolvers = require("./schema/resolvers");
const typeDefs = require("./schema/typeDefs");


const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "csrf-token"],
    credentials: true, // Allow cookies (credentials) to be sent
  })
);
// Helmet
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "trusted-scripts.com"],
  },
})); 
app.use(express.json());
app.use(cookieParser());

// CSRF protection
const csrfProtection = csrf({
  cookie: {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 30 * 60 * 1000, // 30 dakika
  },
});
app.use(csrfProtection);


app.use(rateLimiter);



// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ headers: req.headers }),
});

// Apollo Server Start
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
}

startServer().catch((err) => console.error("Server startup error:", err));

// JWT login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Example user
  const validUser = {
    username: "test@test.com",
    password: "test",
  };

  // Validate User
  if (username === validUser.username && password === validUser.password) {
    const token = jwt.sign({ id: 1, username }, "SECRET_KEY", { expiresIn: "1h" });
    return res.status(200).json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// XSS protection
app.post("/user-input", (req, res) => {
  const userInput = req.body.input;
  const sanitizedInput = xss(userInput);
  res.send(`Sanitized Input: ${sanitizedInput}`);
});

// CSRF token endpoint
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.get("/form", (req, res) => {
  res.json({ csrfToken: req.csrfToken() }); 
});

// Hata yakalama ve güvenlik
app.use((err, req, res, next) => {
  console.log("CSRF Token:", req.headers["csrf-token"]); 

  if (err instanceof jwt.JsonWebTokenError || err.message === "Unauthorized") {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "CSRF token invalid" });
  }
  return res.status(500).json({ message: "Internal Server Error" });
});

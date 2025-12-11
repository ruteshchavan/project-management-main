import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

app.use(express.json()); // This line tells Express to automatically read JSON data coming from the client.
app.use(cors()); // This allows your backend to accept requests from another domain / port, like.
app.use(clerkMiddleware()); // It tells your Express app to use Clerk’s authentication system for every request.

app.get("/", (req, res) => {
  res.send("server is live!!!");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = process.env.PORT || 5000; // if in env var. port is available it will run on it or start on 5000

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

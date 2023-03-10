import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient, EnvironmentVariable } from "@prisma/client";
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const AUTH_TOKEN = "my-static-auth-token"; // Replace with your own static auth token

// Define the type for the environment variables object
interface EnvironmentVariables {
  [key: string]: string;
}

// Middleware to check for auth token before allowing access
const authMiddleware = (req: Request, res: Response, next: () => void) => {
  const authToken = req.headers.authorization;

  if (authToken !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

// Use the auth middleware for all API endpoints
app.use(authMiddleware);

// Define the API endpoint for retrieving .env files for a project
app.get("/env/:projectName", async (req: Request, res: Response) => {
  const projectName = req.params.projectName;

  // Query the database for the environment variables for the requested project
  const envVars: EnvironmentVariable[] =
    await prisma.environmentVariable.findMany({
      where: {
        project: {
          name: projectName,
        },
      },
    });

  // If no environment variables are found, return a 404 status code
  if (envVars.length === 0) {
    return res.status(404).json({ message: "Env file not found" });
  }

  // Combine the environment variables into a single object
  const combinedEnvVars: EnvironmentVariables = envVars.reduce(
    (acc: EnvironmentVariables, envVar) => {
      acc[envVar.key] = envVar.value;
      return acc;
    },
    {}
  );

  // Send the environment variables as the response
  res.status(200).json(combinedEnvVars);
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

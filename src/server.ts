import app from "./app.js"
import { env } from "./config/env.js"
import {connectDB} from "./config/database.js"






// Handle unexpected errors before app starts
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});



// Connect to DB then start server
async function startServer() {
    await connectDB()
    await app.listen(env.app.port)
    console.log("Server is start..")
}


startServer()
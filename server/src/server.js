import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import adminRouter from "./routes/admin.routes.js";
import contactRouter from "./routes/contact.routes.js";
import publicRouter from "./routes/public.routes.js";
import connectDB from "./configs/db.js";


const app = express();
app.use(cors());

await connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const allowedOrigins = (
  process.env.CLIENT_URL ||
  "http://localhost:5173,https://aboutamanjaiswal.vercel.app"
)
  .split(",")
  .map(origin => origin.trim());



// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) {
//         return callback(null, true);
//       }

//       if (
//         allowedOrigins.includes(origin) ||
//         /^http:\/\/localhost:517\d$/.test(origin)
//       ) {
//         return callback(null, true);
//       }

//       console.log("Blocked Origin:", origin);
//       callback(new Error(`CORS blocked: ${origin}`));
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.get("/", (req, res) => res.send("server is running"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "portfolio-api" });
});

app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api", publicRouter);

app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(PORT , () => console.log(`server is running of http://localhost:${PORT}`))

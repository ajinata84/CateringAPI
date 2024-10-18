import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from './routes/Auth'
import userRoutes from './routes/User'


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/Auth";
import customerRoutes from "./routes/Customer";
import ownerRoutes from "./routes/Owner";
import cateringRoutes from "./routes/Catering";
import orderRoutes from "./routes/Order";
import transaksiRoutes from './routes/Transaksi';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Catering API",
      version: "1.0.0",
      description: "API documentation for Catering application",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/swagger/*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRoutes);
app.use("/customer", customerRoutes);
app.use("/owner", ownerRoutes);
app.use("/catering", cateringRoutes);
app.use("/order", orderRoutes);
app.use('/transaksi', transaksiRoutes);


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

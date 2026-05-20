import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes';
import authRoutes from './routes/authRoutes';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);
// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;









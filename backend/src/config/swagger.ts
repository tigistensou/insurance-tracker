import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Insurance Tracker API",
    version: "1.0.0",
    description: "API documentation for Insurance Tracker System",
  },
  servers: [
    {
      url: "http://localhost:5000", // change later for Render/Vercel
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // where your routes are
};

export const swaggerSpec = swaggerJSDoc(options);
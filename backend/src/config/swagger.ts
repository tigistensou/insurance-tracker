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
      url: "https://insurance-tracker-0133.onrender.com"
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // where your routes are
};

export const swaggerSpec = swaggerJSDoc(options);
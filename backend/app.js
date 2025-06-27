const express = require('express');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AMA API',
      version: '1.0.0',
      description: 'API documentation for AMA project',
    },
  },
  apis: ['./routes/*.js'], // path to your route files
};


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const questionRoutes = require('./routes/questionRoutes');
app.use('/api', questionRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;

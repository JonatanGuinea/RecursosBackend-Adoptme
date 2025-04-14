import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from "dotenv";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import YAML from 'yamljs';


import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';




const app = express();
config()
app.use(cors());
const PORT = process.env.PORT||8080;

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));
app.use(express.json());
app.use(cookieParser());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adoption API',
      version: '1.0.0',
      description: 'Documentación de rutas del módulo Users',
    },
  },
  apis: ['./src/routes/users.router.js']
};

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/mocks',mocksRouter);
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

// export default app



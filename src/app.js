import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { swaggerSpecs } from './config/docConfig.js';
import swaggerUI from "swagger-ui-express"
import dotenv from 'dotenv'

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { viewsRouter } from './routes/views.router.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser());

// Definir donde podemos ver la documentación 
app.use("/api/docs", swaggerUI.serve,swaggerUI.setup(swaggerSpecs)) // endpoint donde podemos ver la documentación 

app.use(viewsRouter)
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Server Listening on ${PORT}`))

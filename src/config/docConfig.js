import __dirname from "../utils/index.js";
import swaggerJsdoc from "swagger-jsdoc"
import path from "path"
const PORT = 8080;

// crear las definiciones de swagger para la documentación 
const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title: "Documentación de app mascotas",
            version:"1.0.0",
            description:"Api rest para gestionar adopciones de mascotas",
        },
        //servers:[{url:`http://localhost:${PORT}`}], // servidores que vamos a documentar
    },
    apis:[`${path.join(__dirname,"../docs/**/*.yaml")}`], //archivos que contienen la documentacion de las rutas
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions)
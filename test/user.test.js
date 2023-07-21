import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js"
import Assert from "assert"
import userModel from "../src/dao/models/User.js";

mongoose.connect("mongodb+srv://estebansarmientop:hs11duZxEIqSBTFO@codercluster.rweugnj.mongodb.net/petsDBPruebas?retryWrites=true&w=majority")

const assert = Assert.strict

// generamos el contexto de las pruebas que vamos a realizar - describe de la clase Users dao
describe('Testing para la clase Users dao', () => {

    before(function () {
        this.usersDao = new Users()
    })

    // esto es para que se elimine todo el contenido de la base de datos antes de iniciar otra nueva prueba
    beforeEach(async function () {
        await userModel.deleteMany()
    })

    it('El metodo get de la clase Users debe obtener los usuarios en formato de arreglo', async function (){
        const result = await this.usersDao.get()
        // aqui me aseguro que el valor que voy a recibir si va a ser una respuesta en formato array como yo lo necesito
        assert.strictEqual(Array.isArray(result),true)
    });

    it('El dao debe agregar un usuario correctamente en la base de datos', async function (){
        let mockUser = {
            first_name: 'John',
            last_name: 'Connor',
            email: 'johnconnor@example.com',
            password: '1234'
        }
        const result = await this.usersDao.save(mockUser);
        //console.log(result)
        // verificar si la respuesta es de tipo objeto
        assert.strictEqual(typeof result, 'object');
    });

    it('El dao debe agregar un usuario, este debe crearse con un arreglo de mascotas vacio', async function (){
        let mockUser = {
            first_name: 'John',
            last_name: 'Connor',
            email: 'johnconnor@example.com',
            password: '1234'
        }
        const result = await this.usersDao.save(mockUser)
        const userDB = await this.usersDao.getBy({email:result.email})
        //console.log(userDB)
        assert.strictEqual(Array.isArray(userDB.pets),true)
    })
});
 

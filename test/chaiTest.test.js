import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js"
import userModel from "../src/dao/models/User.js";
import chai from 'chai'

const expect = chai.expect

mongoose.connect("mongodb+srv://estebansarmientop:hs11duZxEIqSBTFO@codercluster.rweugnj.mongodb.net/petsDBPruebas?retryWrites=true&w=majority")

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
        expect(result).to.be.deep.equal([])
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
        expect(result).to.be.an('object');
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
        expect(userDB.pets).to.be.deep.equal([])
    })

    it("El dao puede actualizar un usuario por id", async function() {
        let mockUser = {
            first_name: 'John',
            last_name: 'Connor',
            email: 'johnconnor@example.com',
            password: '1234'
        }
        const result = await this.usersDao.save(mockUser)
        const userDB = await this.usersDao.getBy({email:result.email})
        userDB.first_name = "pepe modificado meka stars"
        const userUpdate = await this.usersDao.update(userDB._id, userDB)
        expect(userUpdate.first_name).to.be.equal("pepe modificado meka stars")
    })


    after(async function () {
        await mongoose.connection.close()
    })

})
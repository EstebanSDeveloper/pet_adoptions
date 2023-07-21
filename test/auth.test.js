import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js"
import chai from 'chai'
import {createHash, passwordValidation} from '../src/utils/index.js'
import UserDTO from "../src/dto/User.dto.js";

const expect = chai.expect

describe("test para autenticacion y users dto", () => {

    before(function () {
        this.usersDao = new Users()
    })

    it('Hasheo de contraseña (el resultado debe ser diferente a la contraseña original)', async function (){
        const passwordLogin = "1234";
        const efectiveHash = /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g;
        const passwordHash = await createHash(passwordLogin)
        expect(efectiveHash.test(passwordHash)).to.be.equal(true)
    });

    it('Hasheo de contraseña debe poder compararse de manera efectiva con la contrasena original', async function (){
        const passwordLogin = "1234";
        const passwordHash = await createHash(passwordLogin)
        let mockUser = {
            email: 'johnconnor@example.com',
            password: passwordHash
        }
        const result = await passwordValidation(mockUser, passwordLogin)
        expect(result).to.be.equal(true)
    });
    
    it('si la contrasena hasheada se altera, debe fallar en la comparacion de la contrasena orgirinal',async function (){
        const passwordLogin = "1234";
        const passwordHash = await createHash(passwordLogin)
        let mockUser = {
            email: 'johnconnor@example.com',
            password: passwordHash+"shad"
        }
        const result = await passwordValidation(mockUser, passwordLogin)
        expect(result).to.be.equal(false)
    });

    it('Corroborar que el DTO unifique el nombre y apellido en una unica propiedad',async function (){
       
        const userDB = {
            _id: "ObjectId(jksdfhsjkdhfkhsdk)",
            first_name: 'John',
            last_name: 'Connor',
            email: 'johnconnor@example.com',
            password: '1234',
            role:"user",
            pets:[]
        }
        const result = UserDTO.getUserTokenFrom(userDB)
        expect(result.name).to.be.equal(`${userDB.first_name} ${userDB.last_name}`)

    });

    it('Corroborar que el DTO elimine las propiedades no necesarias como password el id',async function (){
       
        const userDB = {
            _id: "ObjectId(jksdfhsjkdhfkhsdk)",
            first_name: 'John',
            last_name: 'Connor',
            email: 'johnconnor@example.com',
            password: '1234',
            role:"user",
            pets:[]
        }
        const result = UserDTO.getUserTokenFrom(userDB)
        expect(result).to.not.have.property(`${userDB.first_name} ${userDB.last_name} ${userDB._id} ${userDB.password} ${userDB.pets}`)

    });
})


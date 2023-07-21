import chai from 'chai'
import supertest from "supertest"
import petModel from '../src/dao/models/Pet.js'; 
import userModel from '../src/dao/models/User.js'


const expect = chai.expect
const requester = supertest("http://localhost:8080")
let cookie


describe('Testing de App adoptme', () => {
    
    describe('test del modulo mascotas', () => {

        // beforeEach(async function (){
        //     await petModel.deleteMany()
        // })

    
        it("El endpoint post /api/pets crea una mascota correctamente", async() => {
            const petMock = {
                name: "Eikito",
                specie:"Perro",
                birthDate:"02-11-2019",
            }
            const result = await requester.post("/api/pets").send(petMock)
            //console.log(result)
            expect(result.statusCode).to.be.equal(200)
            expect(result._body.status).to.be.equal("success")
        })

        it('Al crear una mascota con los datos elementales. Se debe corroborar que la mascota creada cuente con una propiedad adopted: false', async() => {
            const petMock = {
                name: "Eikito",
                specie:"Perro",
                birthDate:"02-11-2019",
            }
            const response = await requester.post("/api/pets").send(petMock)
            expect(response.body.payload.adopted).to.be.equal(false)
        });
        
        it('Si se crea una mascota sin el campo nombre, el modulo debe responder con un status 400', async() => {
            const petMock = {
                specie:"Perro",
                birthDate:"02-11-2019",
            }
            const response = await requester.post("/api/pets").send(petMock)
            expect(response.statusCode).to.be.equal(400)
        });
        
        it('al obtener las mascotas con el metodo get, la respuesta debe tenerlos campos status y payload. Ademas, payload debe ser de tipo arreglo', async () => {
            const response = await requester.get("/api/pets")
            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.have.property("status")
            expect(Array.isArray(response.body.payload)).to.deep.equal(true)
        });
    });

    // describe('Test avanzado-flujo autenticacion del usuario', () => {
        
    //     // before(async function() {
    //     //     // crear variable para almacenar la cookie
    //     //     this.cookie;
    //     //     await userModel.deleteMany({})
    //     // })

    //     it('Se debe registrar al usuario correctamente', async() => {
    //         const mockuser = {
    //             first_name: 'John',
    //             last_name: 'Connor',
    //             email: 'johnconnor@example.com',
    //             password: '1234'
    //         }
    //         const responseSignup = await requester.post('/api/sessions/register').send(mockuser)
    //         expect(responseSignup.statusCode).to.be.equal(200)
    //     });

    //     it('Debe logguear al usuario y devolver una cookie', async() => {
    //         const mockUserLogin= {
    //             email: 'johnconnor@example.com',
    //             password: '1234'
    //         }
    //         const responseLogin = await requester.post('/api/sessions/login').send(mockUserLogin)
    //         // con supertest obtenemos los headers de la respuesta, y extraemos la cookie del header [set-cookie]
    //         //console.log(responseLogin)
    //         // capturo la cookie del header, de la propierdad set-cookie y el objeto en la posici[on cero]
    //         const cookieResponse = responseLogin.headers['set-cookie'][0]
    //         //console.log(cookieResponse)
    //         const cookieData={
    //             name:cookieResponse.split("=")[0],
    //             value:cookieResponse.split("=")[1]
    //         }
    //         cookie = cookieData
    //         //console.log("cookie", cookie)
    //         expect(cookieData.name).to.be.equal("coderCookie")
    //     });

    //     it('Al llamar /current obtenemos la cookie y la informaci[on del usuario', async() => {
    //         const currentResponse = await requester.get("/api/sessions/current").set('Cookie', [`${cookie.name}=${cookie.value}`])
    //         expect(currentResponse.body.payload.email).to.be.equal("johnconnor@example.com")
    //     });
        
    // });

    // upload image
    describe('test upload image', () => {
        it('Debe poder crearse una mascota con la ruta de la imagen', async() => {
            const petMock = {
                name: "Eikito",
                specie:"Perro",
                birthDate:"02-11-2019",
            }
            const response = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.name)
            .field("birthDate", petMock.birthDate)
            .attach("image", "./test/images/descarga.jfif")
            //console.log(response)
            expect(response.body.payload.image).to.ok
        }); 
    });
});


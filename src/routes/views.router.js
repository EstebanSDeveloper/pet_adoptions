import { Router } from 'express';
const router = Router()

router.get('/', (req, res) =>{
    res.send("<h1 style='color:blue'>SALUDOS</h1>")
})

export {router as viewsRouter}
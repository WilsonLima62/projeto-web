import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import PontosController from './controllers/PontosController'

const routes = Router()
const upload = multer(uploadConfig)

process.on('unhandledRejection', err => console.error(err))

// MVC

// Model
// Views
// Controllers

routes.post('/pontos', upload.array('images'), PontosController.create)
routes.get('/pontos/:id', PontosController.show)
routes.get('/pontos', PontosController.index)

export default routes


import { Request, Response } from 'express'
import Ponto from '../models/Ponto'
import pontoView from '../views/pontos_view'
import * as Yup from 'yup'

import { getRepository } from "typeorm"
import Pontos from '../models/Ponto'

export default {

    async show(req: Request, res: Response) {

        const { id } = req.params
        const pontosRepository = getRepository(Pontos)

        const ponto = await pontosRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(pontoView.render(ponto))
    },

    async index(req: Request, res: Response) {
        const pontosRepository = getRepository(Ponto)

        const pontos = await pontosRepository.find({
            relations: ['images']
        })

        return res.json(pontoView.renderMany(pontos))
    },
    async create(req: Request, res: Response) {

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = req.body
    
        const pontosRepository = getRepository(Ponto)

        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const ponto = await pontosRepository.create(data)
    
        await pontosRepository.save(ponto)
        return res.status(201).json(ponto)
    }
}
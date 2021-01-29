import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        })

        return res.status(400).send({ message: 'Falha na validação', erros: errors })
    }

    console.error(error)

    return res.status(500).json({ error: 'Erro interno no servidor' })
}

export default errorHandler
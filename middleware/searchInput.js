import { body, validationResult, oneOf} from 'express-validator';


export const isEmail = () => {
     return(
        body('input')
            .trim()
            .isEmail()
    )}

export const prepareInput = (req, res, next) => {
    const errors = validationResult(req)
    const {input} = req.body
    if (errors.errors.length > 0) {
        req.search = {username: input}
        next()
    }
    else {
        req.search = {email: input}
        next()
    }
}
import createError from 'http-errors';
import User from '../../models/User.js';

const auth = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        console.log('COOKIE ARRIVED: ', token)
        //VERIFY
        const user = await User.findByToken(token);
        if (!user)
        next(
           createError(401, `Auth failed. Your cookie seems corrupt.....JUST LIKE YOU!!`)
        );
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}
export default auth;
import createError from 'http-errors';
import User from '../../models/User.js';

const auth = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        console.log('COOKIE ARRIVED: ', token)
        const user = await User.findByToken(token);
        if (!user)
        next(
           createError(401, `Auth failed. Take your kinda cookie and run`)
        );
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}
export default auth;
import createError from 'http-errors';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';


export const addUser = async (req, res, next) => {
    const info = req.body;
    try {
      const user = await User.create(info);
      user.password = undefined;
      const token = user.generateAuthToken();

      
      res
      .cookie('token', token, {
        expires: new Date(Date.now() + 172800000),
        sameSite: 'lax',
        secure: false,  //http on localhost, https on production,
        httpOnly: true,
      })
        .send(user);
    } catch (err) {
      next(err);
    }
  };


  export const loginUser = async (req, res, next) => {
    console.log('LOGIN REQUESTED: ', req.body)  
    try {
      const {username, password} = req.body;
        const user = await User.findOne( {username})
        if (!user) throw new createError(404, `Username not valid`);
        
        const passwordIsValid = bcryptjs.compareSync(password, user.password);
        if(!passwordIsValid) next(createError(404, `Password is not valid`));
        const token = user.generateAuthToken();

        
        res
          .cookie('token', token, {
            expires: new Date(Date.now() + 172800000),
            sameSite: 'lax',
            secure: false,  //http on localhost, https on production,
            httpOnly: true,
          })
          .send(user);
    }  catch(error){
        next(error)
        }
    };  


    export const addFriend = async(req, res, next) => {
      const {id: userId} = req.params
      const {id: friendId} = req.body
      try {
        console.log('here should the magic happen')

      }
      catch(error){
        next(error)
      }
      console.log('USER WITH ID CALLS: ',userId, friendId)
      res.send({message: 'FIN'})
    }


    export const verifyCookie = (req, res) => {
      res.send(req.user);
    };
import createError from 'http-errors';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import UserRelation from '../models/UserRelation.js';
import config from '../config/config.js'


export const addUser = async (req, res, next) => {
    const info = req.body;
    try {
      const user = await User.create(info);
      user.password = undefined;
      const token = user.generateAuthToken();

      
      res
      .cookie('token', token, {
        expires: new Date(Date.now() + 172800000),
        sameSite: config.ckSameSite,
        secure: config.ckSecure,  //http on localhost, https on production,
        httpOnly: true,
      })
        .send(user);
    } catch (err) {
      next(err);
    }
  };

  export const findUser = async(req, res, next) => {
    const {id} = req.body
    try{
     const user = await User.findOne(req.search).select('username avatar socketId')
     res.send(user)
    } catch(error) {
      next(error)
    }
  }
//HERE IS PW HASH SENT BACK CORRECT THIS
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
            sameSite: config.ckSameSite,
            secure: config.ckSecure,  //http on localhost, https on production,
            httpOnly: true,
          })
          .send(user);
    }  catch(error){
        next(error)
        }
    };  


    export const addFriend = async(req, res, next) => {
      const {id: userId} = req.params
      const {friendId} = req.body
      try {
        const data = {userA: userId, userB: friendId}
        const addToRelations = await UserRelation.create(data)
        res.send(addToRelations)
      }
      catch(error){
        next(error)
      }
    }

    export const findRelations = async(req, res, next) => {
      try {
        const {id: userId} = req.params
        const findRelation = await UserRelation.find({$or: [{userA: userId}, {userB:userId}]}).populate('userA', ['username', 'socketId']).populate('userB', ['username', 'socketId'])
        if (!findRelation || findRelation.length < 1) throw new createError(404, `No relations`)
        const relationArr = findRelation.map(element => {
          if (element.userA._id == userId){
            return element.userB
          } else {
            return element.userA
          }
        })
        res.send(relationArr)
      }
      catch(error){
        next(error)
      }
    }

    export const updateUserById = async(req, res, next) => {
      console.log(req.body, 'ARRIVES FOR UPDATE')
      try {
        const {id: userId} = req.params
        const data = req.body
        const update = await User.findByIdAndUpdate(userId, data, { new: true });
        res.send(update)
      } catch(error){
        next(error)
      }
    }


    export const verifyCookie = (req, res) => {
      res.send(req.user);
    };

    export const logout = (req, res) => {
      res.clearCookie("token")
      res.json({ message: "Logged you out successfully" })
    }

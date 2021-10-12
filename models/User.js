import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';


const KEY = 'Secret'

const UserSchema = new Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      username: { type: String, required: true, unique: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      avatar: {type: String},
      socketId: {type: String},
      friends: [
        {friend: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }}
      ]
    },
    {
      versionKey: false,
      timestamps: true,
      id: false,
      toJSON: {
        virtuals: true,
      },
    }
  );

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = bcryptjs.hashSync(user.password, 9);
    console.log('PW GET HASHED: ', user.password)
    next();
  });


UserSchema.methods.generateAuthToken = function () {
    const user = this; // "this" is the user we called our method on
  
    // user._id + superSecret = token
    const token = jwt.sign({ _id: user._id }, KEY, {
      expiresIn: '2d',
    });
  
    console.log(`We created a token for user ${user._id} => ${token}`);
  
    return token;
  };
  
  UserSchema.statics.findByToken = function (token) {
    const User = this;
  
    try {
      // Verify the token
      let decoded = jwt.verify(token, KEY);
      // See if a user with that id exists
      return User.findOne({ _id: decoded._id });
    } catch (error) {
      return;
    }
  };
  

const User = model('User', UserSchema); // => todos

export default User;
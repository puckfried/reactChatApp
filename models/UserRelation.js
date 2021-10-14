import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserRelationSchema = new Schema(
    {
    userA : {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true},
    userB: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true}
        
    },{
            versionKey: false,
            timestamps: true,
            id: false,
            toJSON: {
              virtuals: true,
            },
    }
);


const UserRelation = model('UserRelation', UserRelationSchema); 

export default UserRelation;


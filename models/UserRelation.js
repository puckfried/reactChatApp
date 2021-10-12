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

UserRelationSchema.post('save', function(doc){
    const relation = this
    console.log('REALTION MADE: ',  doc._id)
})

const UserRelation = model('UserRelation', UserRelationSchema); 

export default UserRelation;


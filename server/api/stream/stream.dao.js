import mongoose from 'mongoose';
import streamSchema from './stream.model';
import User from '../user/user.dao';

const ObjectId = mongoose.Types.ObjectId;

streamSchema.statics.add =  async function(userId, url) {
    let stream = await this.findOne({url});
    if(!stream){
        stream = new this({url});
        stream.save();
    }
    return User.addStream(userId, stream.id);
};

streamSchema.statics.get =  function(streamId) {
    console.log(streamId);
    return this.findOne({_id: new ObjectId(streamId)}).exec();
};

streamSchema.statics.getByStreamIds =  function(streamIds) {
    return this.find({_id: {"$in": streamIds}}).exec();
};

let streamModel = mongoose.model('Stream', streamSchema);
export default streamModel;

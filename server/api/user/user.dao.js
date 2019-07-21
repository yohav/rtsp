import mongoose from 'mongoose';
import userSchema from './user.model';
import Stream from '../stream/stream.dao';


userSchema.statics.register =  function(data) {
    let user = new this(data);
    return user.save();
};

userSchema.statics.get =  function(query) {
    return this.findOne(query).exec();
};

userSchema.statics.addStream = function(userId, streamId){
    return this.update({_id:userId}, {"$addToSet": {"streams": streamId}});
};

userSchema.statics.getStreams = async function(userId){
   let user = await this.findOne({_id:userId}).exec();
    console.log(user.streams);
    return Stream.getByStreamIds(user.streams);
};


let userModel = mongoose.model('User', userSchema);
export default userModel;

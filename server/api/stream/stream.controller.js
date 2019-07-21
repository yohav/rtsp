import Stream from './stream.dao';


let get = async (req, res, next) => {
    console.log("herer");
    let streamId = req.params.streamId;
    let stream = await Stream.get(streamId);
    return res.status(200).send(stream);
};


let add = async (req, res, next) => {
    let url = req.body.url;
    let userId = req.user.id;
    await Stream.add(userId, url);
    return res.status(200).send("success");
};
export default {
    get,
    add
}

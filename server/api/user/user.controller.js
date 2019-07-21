import jwt from 'jsonwebtoken';
import jwtSecret from '../../config/jwtConfig';
import User from './user.dao';

let register = async (req, res, next) => {
    return res.status(200).end("success");
};

let login = async (req, res, next) => {
    const token = jwt.sign({ id: req.user.id }, jwtSecret.secret, {
        expiresIn: "1 day",
    });
    res.status(200).send({token});
};

let get = async (req, res, next) => {
    let username = req.query.username;
    let user = await User.get({username: username});
    return res.status(200).send(user);
};


let getStreams = async (req, res, next) => {
    let username = req.user.id;
    console.log(username);
    let streams = await User.getStreams(username);
    return res.status(200).send(streams);
};

export default {
    register,
    login,
    get,
    getStreams
}

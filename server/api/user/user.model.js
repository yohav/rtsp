import mongoose from 'mongoose';

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       streams:
 *          type: array
 *          items:
 *              type: string
 *       required:
 *         - username
 *         - password
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    streams: {
        type: Array,
        items: {
            type: String
        }
    }
});

export default userSchema;

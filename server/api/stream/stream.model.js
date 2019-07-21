import mongoose from 'mongoose';

/**
 * @swagger
 * definitions:
 *   Stream:
 *     type: object
 *     properties:
 *       url:
 *         type: string
 *       required:
 *         - url
 */

const streamSchema = new mongoose.Schema({
    url: {
        type: String
    }
});

export default streamSchema;

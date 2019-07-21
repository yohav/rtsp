import { Router } from 'express';
import passport from 'passport';
import streamController from './stream.controller';

const router = Router();


/**
 * @swagger
 * /stream/{streamId}:
 *    get:
 *     tags:
 *       - Stream
 *     name: Find stream
 *     summary: Finds a stream
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: streamId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: A single stream object
 *         schema:
 *           $ref: '#/definitions/Stream'
 *       '404':
 *         description: Stream not found
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */
router.get('/:streamId',passport.authenticate('jwt',{session:false}), streamController.get);

/**
 * @swagger
 * /stream:
 *   post:
 *     tags:
 *       - Stream
 *     name: Add stream
 *     summary: Add a stream to the logged user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Stream'
 *     responses:
 *       '200':
 *         description: Stream added
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */
router.post('/',passport.authenticate('jwt',{session:false}), streamController.add);



export default router;

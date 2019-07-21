import { Router } from 'express';
import passport from 'passport';
import userController from './user.controller';

const router = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *          type: object
 *          properties:
 *           username:
 *            type: string
 *           password:
 *            type: string
 *     responses:
 *       '200':
 *         description: User created
 *       '401':
 *         description: Username already taken
 */
router.post('/register', passport.authenticate('register',{session:false}), userController.register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *          type: object
 *          properties:
 *           username:
 *            type: string
 *           password:
 *            type: string
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Username and password don't match
 */
router.post('/login', passport.authenticate('login',{session:false}), userController.login);

/**
 * @swagger
 * /user/:
 *   get:
 *     tags:
 *       - User
 *     name: Find user
 *     summary: Finds a user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required:
 *           - username
 *     responses:
 *       '200':
 *         description: A single user object
 *         schema:
 *           $ref: '#/definitions/User'
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */
router.get('/',passport.authenticate('jwt',{session:false}), userController.get);


/**
 * @swagger
 * /user/streams:
 *   get:
 *     tags:
 *       - User
 *     name: Find logged in user's streams
 *     summary: Finds all logged in user's streams
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Array of streams
 *         schema:
 *           type: array
 *           items:
 *            $ref: '#/definitions/Stream'
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */
router.get('/streams',passport.authenticate('jwt',{session:false}), userController.getStreams);

export default router;

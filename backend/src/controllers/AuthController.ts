import express, { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { UserModel } from '../models/User';
import { UserContentModel } from '../models/UserContent';

import { keys } from '../config/keys';
import { ILoginRequest } from '../payload/request/ILoginRequest';
import { ApiDetailResponse } from '../payload/response/ApiDetailResponse';
import { ApiErrorResponse } from '../payload/response/ApiErrorResponse';
import { HTTPStatus } from '../enums/HTTPStatusEnum';
import { ApiResponse } from '../payload/response/ApiResponse';

class AuthController {
  public expressRouter: Router;

  constructor() {
    this.expressRouter = express.Router();
    this.setUpRoutes();
  }

  private setUpRoutes = () => {
    this.expressRouter.post('/login', this.loginUser);
    this.expressRouter.post('/register', this.registerUser);
    this.expressRouter.get('/google', this.authenticateWithGoogle);
    this.expressRouter.get('/google/callback', passport.authenticate('google'), this.authenticateWithGoogleCallback);
    this.expressRouter.get('/current', passport.authenticate('jwt', { session: false }), this.getCurrentUser);
  };

  private loginUser = async (req: Request, res: Response) => {
    const reqBody: ILoginRequest = req.body;

    const { email, password } = reqBody;

    const user = await UserModel.findOne({ email });

    if (!user) {
      const errors = {
        email: 'Email not found.'
      };
      const apiErrorResponse = new ApiErrorResponse(false, 'User not found.', errors);
      return res.status(HTTPStatus.NOT_FOUND).send(apiErrorResponse);
    }

    // Users registered via Google won't have password, so doesn't need to check
    let doesPasswordMatch = true;
    if (user.password) {
      doesPasswordMatch = await bcrypt.compare(password, user.password);
    } else {
      doesPasswordMatch = false;
    }

    if (doesPasswordMatch) {
      const { _id } = user;
      let name = '';

      const jwtPayload = {
        _id,
        email,
        name
      };

      const authToken = await jwt.sign(jwtPayload, keys.secretOrKey, { expiresIn: 86400 });

      const details = {
        authToken
      };
      const apiDetailResponse = new ApiDetailResponse(true, 'Successfully logged in.', details);
      res.json(apiDetailResponse);
    } else {
      const errors = {
        password: 'Password incorrect.'
      };
      const apiErrorResponse = new ApiErrorResponse(false, 'Login request failed.', errors);
      return res.status(HTTPStatus.BAD_REQUEST).send(apiErrorResponse);
    }
  };

  private registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (foundUser) {
      const errors = {
        email: 'Email is already taken.'
      };
      const apiErrorResponse = new ApiErrorResponse(false, 'Register request failed.', errors);
      return res.status(HTTPStatus.BAD_REQUEST).send(apiErrorResponse);
    }

    const newUser = new UserModel({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);

    newUser.password = hash;

    await newUser.save();

    const newUserContent = new UserContentModel({
      userId: newUser._id,
      toDos: []
    });

    await newUserContent.save();

    const jwtPayload = {
      _id: newUser._id,
      email,
      name
    };

    const authToken = await jwt.sign(jwtPayload, keys.secretOrKey, { expiresIn: 86400 });

    const apiDetailResponse = new ApiDetailResponse(true, 'Successfully registered.', { authToken });
    res.json(apiDetailResponse);
  };

  private authenticateWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })(req, res, next);
  };

  private authenticateWithGoogleCallback = async (req: Request, res: Response) => {
    const jwtPayload = {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      googleId: req.user.googleId
    };

    const authToken = await jwt.sign(jwtPayload, keys.secretOrKey, { expiresIn: 86400 });

    return res.render('oauth-response', { authToken, redirectUrl: keys.googleAuthRedirectUrl });
  };

  private getCurrentUser = async (req: Request, res: Response) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  };
}

const AuthControllerRouter = new AuthController().expressRouter;

export { AuthControllerRouter as AuthController };

export default AuthControllerRouter;

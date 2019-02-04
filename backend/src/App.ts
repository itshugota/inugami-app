import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import 'express-async-errors';

import keys from './config/keys';
import { configPassport } from './config/passport';
import { Routes } from './Routes';

import { mongooseErrorHandler } from './middlewares/handlers/mongooseErrorHandler';
import { defaultErrorHandler } from './middlewares/handlers/defaultErrorHandler';

class App {
  public expressApp: express.Application;
  public appRoutes: Routes = new Routes();

  constructor() {
    this.expressApp = express();

    this.expressApp.set('view engine', 'pug');

    this.connectToDatabase();
    this.configPreRouteMiddlewares();
    this.useRoutes();
    this.configPostRouteMiddlewares();
  }

  private configPreRouteMiddlewares(): void {
    // Config bodyParser middleware to support application/x-www-form-urlencoded & application/json POST data
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(bodyParser.json());

    // Config passport middleware for authentication
    this.expressApp.use(passport.initialize());
    configPassport(passport);

    // Always redirect to https instead of http when in production
    if (process.env.NODE_ENV === 'production') {
      this.expressApp.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
          res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
          next();
        }
      });
    }
  }

  private configPostRouteMiddlewares(): void {
    this.expressApp.use(mongooseErrorHandler);
    this.expressApp.use(defaultErrorHandler);
  }

  private async connectToDatabase(): Promise<any> {
    const databaseURI = keys.mongoURI;

    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(
        databaseURI,
        { useNewUrlParser: true }
      );
      console.log('MongoDB connected.');
    } catch (err) {
      console.log('Could not connect to MongoDB.');
      console.error(err);
    }
  }

  private useRoutes(): void {
    this.appRoutes.routes(this.expressApp);
  }
}

const expressApp = new App().expressApp;

export { expressApp };

export default expressApp;

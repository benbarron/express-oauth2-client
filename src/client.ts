import { Request, Response, NextFunction, Application, Router } from 'express';
import { Strategy as GithubStrategy } from 'passport-github';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { PassportStatic } from 'passport';
import { ExpressOAuthOptions } from './interfaces';
import { formatUser } from './utils';
import passport from 'passport';

const defaultOptions: ExpressOAuthOptions = {
  providers: {},
  prefix: '/',
  homeUrl: '/',
};

export class ExpressOAuth2Client {
  private options: ExpressOAuthOptions;
  private app: Application;

  constructor(app: Application, options: ExpressOAuthOptions = defaultOptions) {
    this.app = app;
    this.options = options;
  }

  public initialize() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser);
    this.generateStrategies(this.options, passport);
    this.generateRoutes(this.options, this.app);
    return (req: Request, res: Response, nf: NextFunction) => {
      nf();
    };
  }

  private serializeUser(user: any, done: any) {
    if (!user) done(null, null);
    done(null, formatUser(user));
  }

  private deserializeUser(user: any, done: (err: Error | null, user: any) => any) {
    done(null, user);
  }

  public setUserSerializer(fn: (user: any, done: (err: Error | null, user: any) => any) => any) {
    this.serializeUser = fn;
  }

  public setUserDeserializer(fn: (user: any, done: (err: Error | null, user: any) => any) => any) {
    this.deserializeUser = fn;
  }

  public getLoggingMiddleware() {
    return (request: Request, response: Response, next: NextFunction) => {
      console.log('User: ', request.user);
      console.log('Authenticated: ', request.isAuthenticated());
      next();
    };
  }

  private generateStrategies(options: ExpressOAuthOptions, passport: PassportStatic) {
    const cb = (access: any, refresh: any, profile: any, done: any) => {
      done(null, profile);
    };
    if (options.providers.google) {
      const googleStrategyOptions = {
        clientID: options.providers.google.clientId,
        clientSecret: options.providers.google.clientSecret,
        callbackURL: `${options.prefix}/callback/google`,
        scope: options.providers.google.scopes,
      };
      passport.use(new GoogleStrategy(googleStrategyOptions, cb));
    }
    if (options.providers.github) {
      const githubStrategyOptions = {
        clientID: options.providers.github.clientId,
        clientSecret: options.providers.github.clientSecret,
        callbackURL: `${options.prefix}/callback/github`,
        scope: options.providers.github.scopes,
      };
      passport.use(new GithubStrategy(githubStrategyOptions, cb));
    }
    if (options.providers.twitter) {
      const twitterStrategyOptions = {
        consumerKey: options.providers.twitter.clientId,
        consumerSecret: options.providers.twitter.clientSecret,
        callbackURL: `${options.prefix}/callback/twitter`,
        scope: options.providers.twitter.scopes,
        includeEmail: true,
      };
      passport.use(new TwitterStrategy(twitterStrategyOptions, cb));
    }
  }

  private generateRoutes(options: ExpressOAuthOptions, app: Application) {
    const router = Router();
    const redirect = (request: Request, res: Response) => {
      res.redirect(options.homeUrl);
    };
    Object.keys(options.providers).forEach((provider) => {
      router.use(`/login/${provider}`, passport.authenticate(provider));
      router.use(`/callback/${provider}`, passport.authenticate(provider), redirect);
    });
    app.use(options.prefix, router);
  }
}

export default ExpressOAuth2Client;

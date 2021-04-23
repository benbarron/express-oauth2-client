import { Request, Response, NextFunction, Application } from 'express';

export interface User {
  id: string;
  provider: string;
  name: string;
  email: string;
  username: string;
  profileImage: string;
}
export interface Provider {
  clientId: string;
  clientSecret: string;
  scopes: string[];
}
export interface ProvidersMap {
  github?: Provider;
  google?: Provider;
  twitter?: Provider;
}
export interface ExpressOAuthOptions {
  homeUrl: string;
  prefix: string;
  providers: ProvidersMap;
}
export default class ExpressOAuth2Client {
  constructor(app: Application, options?: ExpressOAuthOptions);
  private serializeUser;
  private deserializeUser;
  initialize(): (request: Request, response: Response, next: NextFunction) => void;
  setUserSerializer(fn: (user: any, done: (err: Error | null, user: any) => any) => any): void;
  getLoggingMiddleware(): (request: Request, response: Response, next: NextFunction) => void;
  private generateStrategies;
  private generateRoutes;
}

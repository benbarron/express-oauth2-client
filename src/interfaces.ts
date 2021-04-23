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

## Express OAuth2 Client

#### Installation

```bash
$ npm i express-oauth2-client
```

#### Basic Usage

```ts
import ExpressOAuth2Client from 'express-oauth2-client';
import express from 'express';
import session from 'express-session';
import config from 'config';

const app = express();

const oauth2Client = new ExpressOAuth2Client(app, {
  providers: config.get('oauth2'),
  homeUrl: '/home',
  prefix: '/oauth2',
});

app.use(
  session({
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(oauth2Client.initialize());
app.use(oauth2Client.getLoggingMiddleware());
// add your routes here

app.listen(8000, () => {
  console.log('Server started on port: 8000');
});
```

#### Providers config object structure

```json
{
  "github": {
    "clientId": "",
    "clientSecret": "",
    "scopes": ["user", "repo"]
  },
  "twitter": {
    "clientId": "",
    "clientSecret": "",
    "scopes": ["profile", "email"]
  },
  "google": {
    "clientId": "",
    "clientSecret": "",
    "scopes": ["profile", "email"]
  }
}
```

#### Registering Callbacks

This package has handlers set up for callback on the url '/{prefix}/callback/{provider}'
So for example, if you set the prefix in the options as '/oauth2' and the provider is twitter. Then the callback url that you need to register on twitter's developer website is '/oauth2/callback/twitter'

#### Supported Providers

- Github
- Google
- Twitter


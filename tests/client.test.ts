import express from 'express';
import { ExpressOAuth2Client } from './../src/client';

describe('Client Test', () => {
  const app: express.Application = express();

  function isFunction(functionToCheck: any) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  it('constructor should properly create object', () => {
    const client = new ExpressOAuth2Client(app);
    expect(client).toBeTruthy();
  });

  it('initialize method should return a function', () => {
    const client = new ExpressOAuth2Client(app);
    client.initialize = jest.fn(client.initialize);
    const response = client.initialize();
    expect(client.initialize).toHaveBeenCalledTimes(1);
    expect(isFunction(response)).toBe(true);
  });
});

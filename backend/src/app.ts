require('dotenv').config();
import express from 'express';
import api from './api';
import helmet from 'helmet';
import cors from 'cors';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import typeDefs from './api/schemas/index';
import resolvers from './api/resolvers/index';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {notFound, errorHandler} from './middlewares';
import cookieParser from 'cookie-parser';

const app = express();

const requestLogger = {
  async requestDidStart(requestContext: any) {
    console.log('Request started! Query:\n' + requestContext.request.query);
    return;
  },
};

(async () => {
  try {
    app.use(cookieParser());
    app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
      })
    );
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        process.env.ENVIRONMENT === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: 'my-graph-id@my-graph-variant',
              footer: false,
              includeCookies: true,
            })
          : ApolloServerPluginLandingPageLocalDefault({footer: false, includeCookies: true}),
          requestLogger
      ],
      includeStacktraceInErrorResponses: false,
      introspection: true,
    });
    await server.start();

    app.use(
      '/graphql',
      cors<cors.CorsRequest>({ origin: process.env.FRONTEND_URL, credentials: true }),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => ({
          req: req,
          res: res,
          jwt: req.cookies.jwt,
        })
      })
    );

    app.use('/api/v1', api);
    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.log(error);
  }
})();

export default app;

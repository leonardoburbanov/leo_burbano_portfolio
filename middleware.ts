import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, static files and the generated social
  // images (served at /<locale>/opengraph-image, which must not redirect).
  matcher: ['/((?!api|_next|_vercel|.*opengraph-image|.*twitter-image|.*\\..*).*)']
};

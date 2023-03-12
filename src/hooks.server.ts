import type { Handle } from '@sveltejs/kit';
import Pocketbase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
  // Stage1

  event.locals.pb = new Pocketbase('http://139.177.176.215');
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  if (event.locals.pb.authStore.isValid) {
    event.locals.user = event.locals.pb.authStore.model;
  }

  const response = await resolve(event); // Stage2


  // Stage3 TODO: Set cookie secure befor deploy
  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({
    secure: false,
  }));

  return response;
}
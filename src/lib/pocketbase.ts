import Pocketbase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new Pocketbase('http://139.177.176.215');

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log('authStore.onChange', auth);
  currentUser.set(pb.authStore.model);
});
import { serializeNonPOJOs } from '$lib/helpers';
import type { Actions, PageServerLoad } from './$types';

export const load = ({ locals }) => {
  if (locals.user) {
    
    console.log(locals.user);
    const user = serializeNonPOJOs(locals.user);
    
    console.log(user);
    

		return {
      user: user
		};
	}
};
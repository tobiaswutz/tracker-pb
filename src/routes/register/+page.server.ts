import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  register: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		console.log(data);

		try {
			console.log('Creating user...');
			await locals.pb.collection('users').create(data);
			locals.pb.authStore.clear();
		} catch (error) {
			console.log(error);
		}

		throw redirect(303, '/login');
	}
};

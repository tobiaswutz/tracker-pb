import { redirect, type Actions } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    console.log(data);
    

		try {
			await locals.pb.collection('users').authWithPassword(data.email as string, data.password as string);
		} catch (err) {
			console.log('Error:', err);
			return {
				error: true,
				email: data.email
			};
		}
		throw redirect(303, '/');
	}
};
(function () {
	'use strict';

	var form = document.querySelector('[data-guestbook-form]');

	if (!form) {
		return;
	}

	var status = form.querySelector('[data-guestbook-status]');
	var submitButton = form.querySelector('button[type="submit"]');

	form.addEventListener('submit', async function (event) {
		event.preventDefault();
		submitButton.disabled = true;
		status.textContent = 'Envoi en cours…';

		try {
			var response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
				headers: {
					'Accept': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Formspree returned HTTP ' + response.status);
			}

			form.reset();
			status.textContent = 'Merci, votre message a bien été envoyé. Il sera publié après validation.';
		} catch (error) {
			console.error('Impossible d’envoyer le message du livre d’or.', error);
			status.textContent = 'Votre message n’a pas pu être envoyé. Vérifiez votre connexion et réessayez.';
		} finally {
			submitButton.disabled = false;
		}
	});
})();

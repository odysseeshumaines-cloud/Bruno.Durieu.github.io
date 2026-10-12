(function() {
	'use strict';

	var player = document.getElementById('album-music');
	var trackSelect = document.getElementById('album-music-track');
	var audio = document.getElementById('album-music-audio');
	var credit = document.getElementById('album-music-credit');
	var status = document.getElementById('album-music-status');
	var toggle = document.getElementById('album-music-toggle');
	var controls = document.getElementById('album-music-controls');
	var minimumTrackDuration = 150;

	if (!player || !trackSelect || !audio || !credit || !status || !toggle || !controls)
		return;

	toggle.addEventListener('click', function() {
		var expanded = toggle.getAttribute('aria-expanded') === 'true';

		toggle.setAttribute('aria-expanded', String(!expanded));
		toggle.textContent = expanded
			? 'Afficher le lecteur musical'
			: 'Masquer le lecteur musical';
		controls.hidden = expanded;
		player.classList.toggle('is-collapsed', expanded);
	});

	function selectTrack() {
		var option = trackSelect.options[trackSelect.selectedIndex];
		var wasPlaying = !audio.paused;

		audio.src = option.value;
		audio.load();
		credit.href = option.getAttribute('data-source');
		credit.textContent = option.getAttribute('data-title')
			+ ' — ' + option.getAttribute('data-creator')
			+ ' (licence CC0)';
		status.textContent = '';

		if (wasPlaying) {
			audio.play().catch(function() {
				status.textContent = 'La lecture a échoué. Réessaie avec le bouton Lecture.';
			});
		}
	}

	trackSelect.addEventListener('change', selectTrack);
	audio.addEventListener('error', function() {
		status.textContent = 'Impossible de charger ce morceau pour le moment.';
	});
	audio.addEventListener('loadedmetadata', function() {
		if (audio.duration < minimumTrackDuration) {
			audio.pause();
			status.textContent = 'Ce morceau dure moins de 2 min 30 et ne peut pas être lu.';
		}
	});
	audio.addEventListener('playing', function() {
		status.textContent = '';
	});

	selectTrack();
})();

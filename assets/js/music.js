(function() {
	'use strict';

	var player = document.getElementById('album-music');
	var trackSelect = document.getElementById('album-music-track');
	var audio = document.getElementById('album-music-audio');
	var credit = document.getElementById('album-music-credit');
	var status = document.getElementById('album-music-status');

	if (!player || !trackSelect || !audio || !credit || !status)
		return;

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
	audio.addEventListener('playing', function() {
		status.textContent = '';
	});

	selectTrack();
})();

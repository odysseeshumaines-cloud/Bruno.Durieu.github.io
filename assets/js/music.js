(function() {
	'use strict';

	var player = document.getElementById('album-music');
	var trackSelect = document.getElementById('album-music-track');
	var audio = document.getElementById('album-music-audio');
	var credit = document.getElementById('album-music-credit');
	var status = document.getElementById('album-music-status');
	var toggle = document.getElementById('album-music-toggle');
	var toggleLabel = document.getElementById('album-music-toggle-label');
	var toggleIcon = document.getElementById('album-music-toggle-icon');
	var controls = document.getElementById('album-music-controls');
	var minimumTrackDuration = 90;
	var storageKey = 'album-music-state';

	if (!player || !trackSelect || !audio || !credit || !status || !toggle
		|| !toggleLabel || !toggleIcon || !controls)
		return;

	function readSavedState() {
		var rawState;
		var savedState;

		try {
			rawState = window.sessionStorage.getItem(storageKey);
			if (!rawState)
				return null;

			savedState = JSON.parse(rawState);
		}
		catch (error) {
			console.error('Impossible de restaurer le lecteur musical.', error);
			return null;
		}

		if (!savedState || typeof savedState.source !== 'string'
			|| typeof savedState.currentTime !== 'number'
			|| !isFinite(savedState.currentTime)
			|| typeof savedState.playing !== 'boolean')
			return null;

		try {
			savedState.source = new URL(savedState.source, window.location.href).href;
			if (new URL(savedState.source).origin !== window.location.origin)
				return null;
		}
		catch (error) {
			console.error('La source du morceau mémorisé est invalide.', error);
			return null;
		}

		return savedState;
	}

	function removeSavedState() {
		try {
			window.sessionStorage.removeItem(storageKey);
		}
		catch (error) {
			console.error('Impossible d’effacer l’état du lecteur musical.', error);
		}
	}

	function saveState() {
		var option = trackSelect.options[trackSelect.selectedIndex];
		var savedState;

		if (!option || !audio.src || audio.ended) {
			removeSavedState();
			return;
		}

		savedState = {
			source: audio.src,
			currentTime: audio.currentTime || 0,
			playing: !audio.paused,
			volume: audio.volume,
			muted: audio.muted,
			title: option.getAttribute('data-title'),
			creator: option.getAttribute('data-creator'),
			sourceCredit: option.getAttribute('data-source'),
			label: option.textContent
		};

		try {
			window.sessionStorage.setItem(storageKey, JSON.stringify(savedState));
		}
		catch (error) {
			console.error('Impossible de mémoriser l’état du lecteur musical.', error);
		}
	}

	var savedState = readSavedState();

	toggle.addEventListener('click', function() {
		var expanded = toggle.getAttribute('aria-expanded') === 'true';

		toggle.setAttribute('aria-expanded', String(!expanded));
		var label = expanded
			? 'Afficher le lecteur musical'
			: 'Masquer le lecteur musical';
		toggle.setAttribute('aria-label', label);
		toggleLabel.hidden = expanded;
		toggleIcon.hidden = !expanded;
		controls.hidden = expanded;
		player.classList.toggle('is-collapsed', expanded);
	});

	function restoreTrackOption() {
		var options = trackSelect.options;
		var index;
		var option;

		if (!savedState)
			return;

		for (index = 0; index < options.length; index++) {
			try {
				if (new URL(options[index].value, window.location.href).href === savedState.source) {
					trackSelect.selectedIndex = index;
					return;
				}
			}
			catch (error) {
				console.error('Une source de morceau est invalide.', error);
			}
		}

		option = document.createElement('option');
		option.value = savedState.source;
		option.textContent = savedState.label || savedState.title || 'Morceau en cours';
		option.setAttribute('data-title', savedState.title || option.textContent);
		option.setAttribute('data-creator', savedState.creator || '');
		option.setAttribute('data-source', savedState.sourceCredit || '#');
		trackSelect.appendChild(option);
		trackSelect.selectedIndex = options.length - 1;
	}

	function selectTrack() {
		var option = trackSelect.options[trackSelect.selectedIndex];
		var wasPlaying = !audio.paused;

		audio.src = option.value;
		audio.load();
		credit.href = option.getAttribute('data-source');
		credit.textContent = option.getAttribute('data-title')
			+ ' — ' + option.getAttribute('data-creator');
		status.textContent = '';

		if (wasPlaying) {
			audio.play().catch(function() {
				status.textContent = 'La lecture a échoué. Réessaie avec le bouton Lecture.';
			});
		}
	}

	trackSelect.addEventListener('change', function() {
		savedState = null;
		selectTrack();
	});
	audio.addEventListener('error', function() {
		status.textContent = 'Impossible de charger ce morceau pour le moment.';
	});
	audio.addEventListener('loadedmetadata', function() {
		if (audio.duration < minimumTrackDuration) {
			audio.pause();
			removeSavedState();
			status.textContent = 'Ce morceau dure moins de 1 min 30 et ne peut pas être lu.';
			return;
		}

		if (savedState && audio.src === savedState.source) {
			if (savedState.currentTime >= audio.duration) {
				removeSavedState();
				savedState = null;
				return;
			}

			audio.currentTime = savedState.currentTime;
			audio.volume = typeof savedState.volume === 'number'
				? Math.max(0, Math.min(1, savedState.volume))
				: audio.volume;
			audio.muted = savedState.muted === true;

			var shouldResume = savedState.playing;
			savedState = null;

			if (shouldResume) {
				audio.play().catch(function() {
					status.textContent = 'La lecture automatique a échoué. Réessaie avec le bouton Lecture.';
				});
			}
			else
				saveState();
		}
	});
	audio.addEventListener('playing', function() {
		status.textContent = '';
	});
	audio.addEventListener('play', saveState);
	audio.addEventListener('pause', saveState);
	audio.addEventListener('timeupdate', saveState);
	audio.addEventListener('volumechange', saveState);
	audio.addEventListener('ended', removeSavedState);

	restoreTrackOption();
	selectTrack();
	if (!savedState)
		saveState();
})();

$(function() {

	var FilesConstructor = function (source, size) {
		return {
			"files": [
				{
					"type":"VIDEO",
					"sources": {
						"webm": {
							"source": source,
							"size": +size
						}
					}
				}
			]
		}
	};

	var i = 0;

	var loadedFiles = [];
	var loadedVideos = [];
	var video;
	// var videoNew;

	// var videoTag = document.createElement('video');

	function loadVideo () {
		$.html5Loader({
			filesToLoad:    files[i], // this could be a JSON or simply a javascript object
			onBeforeLoad:       function () {},
			onComplete:         function () {
				if (i < files.length - 1) {
					i++;
					return loadVideo()
				}
			},
			onElementLoaded:    function (obj, elm) {
				if (i === 0) {

					$('.videos').append(elm);
					video = document.querySelector('video');
					// video.classList.add('currentVideo');
					video.autoplay = true;
					// video.controls = false;
					video.muted = true;
					video.play();

					// $('.videos').append(elm);
					// videoNew = document.querySelector('video:not(.currentVideo)');

					video.onended = function () {
						var src = video.src;
						for (var  i = 0; i < loadedFiles.length; i++) {
							if (loadedFiles[i] === src) {
								if (i + 1 < loadedFiles.length) {
									video.src= loadedFiles[i + 1];

									break;
								} else {
									video.src = loadedFiles[0];
									break;
								}
							}
						}
					}
				}
				loadedVideos.push(elm);
				loadedFiles.push(elm.src);
			},
			onUpdate:           function ( percentage ) {
				console.log(percentage)
			}

		});
	}

	var files = [];

	var width = $(window).width();

	if (width >= 1921) {
		files = [
			new FilesConstructor("video/4k/0-5.mp4", 6544190),
			new FilesConstructor("video/4k/5-10.mp4", 6841341),
			new FilesConstructor("video/4k/10-15.mp4", 6177390),
			new FilesConstructor("video/4k/15-20.mp4", 6170679)
		]
	} else if (width >= 1281) {
		files = [
			new FilesConstructor("video/fullHd/0-5.mp4", 3066600),
			new FilesConstructor("video/fullHd/5-10.mp4", 3038109),
			new FilesConstructor("video/fullHd/10-15.mp4", 2973238),
			new FilesConstructor("video/fullHd/15-20.mp4", 2966364)
		]
	} else if (width < 1281) {
		files = [
			new FilesConstructor("video/hd/0-5.mp4", 810229),
			new FilesConstructor("video/hd/5-10.mp4", 797692),
			new FilesConstructor("video/hd/10-15.mp4", 847107),
			new FilesConstructor("video/hd/15-20.mp4", 805478)
		]
	}

	loadVideo();

	$('.video-control').click(function () {
		if (video) {
			if (video.paused) {
				$(this).toggleClass('video-control_active');
				video.play();
			} else {
				$(this).toggleClass('video-control_active');
				video.pause();
			}
		}
	})

});


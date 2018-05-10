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

	function playVideoList (video) {
		console.log('start playslit');
		console.log(video);

		processor.doLoad();

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

			if (loadedFiles.length === files.length) {
				console.log('loadedFiles.length = ' + loadedFiles.length);
				console.log('files.length = ' + files.length);
				// return playVideoList(video);
			}

		};
	};

	var i = 0;

	var loadedFiles = [];
	var loadedVideos = [];
	var video;

	function loadVideo () {
		$.html5Loader({
			filesToLoad:    files[i], // this could be a JSON or simply a javascript object
			onBeforeLoad:       function () {},
			onComplete:         function () {
				if (i < files.length - 1) {
					i++;
					return loadVideo()
				} else {
					// playVideoList(video);
				}
			},
			onElementLoaded:    function (obj, elm) {
				console.log(obj);

				if (i === 0) {
					$('.videos').append(elm);
					video = document.querySelector('video');
					video.src = obj.source;
					video.classList.add('currentVideo');
					video.autoplay = true;
					video.controls = false;
					video.muted = true;
					video.play();

					playVideoList(video);
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
	var height = $(window).height();

	if (width >= 1920) {
		files = [
			// new FilesConstructor("video/4k/0-5.mp4", 6544190),
			// new FilesConstructor("video/4k/5-10.mp4", 6841341),
			// new FilesConstructor("video/4k/10-15.mp4", 6177390),
			// new FilesConstructor("video/4k/15-20.mp4", 6170679)
			new FilesConstructor("video/4k/bg4k1.mp4", 122696),
			new FilesConstructor("video/4k/bg4k2.mp4", 122353)
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
	});

	var processor = {};

	processor.doLoad = function doLoad() {
		this.video = document.getElementsByClassName('currentVideo')[0];

		this.c1 = document.getElementById('c1');
		this.ctx1 = this.c1.getContext('2d');
		var self = this;
		this.video.addEventListener('play', function () {
			self.width = self.video.videoWidth / 5;
			self.height = self.video.videoHeight / 5;
			self.timerCallback();
		}, false);
	};

	processor.timerCallback = function timerCallback() {
		if (this.video.paused || this.video.ended) {
			return;
		}
		this.computeFrame();
		var self = this;
		setTimeout(function () {
			self.timerCallback();
		}, 0);
	};

	processor.computeFrame = function computeFrame() {
		this.ctx1.drawImage(this.video, 0, 0, $(this.video).width(), $(this.video).height());
		return;
	};

	loadVideo();

});


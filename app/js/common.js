$(function () {

	var files = [];

	var width = $(window).width();

	if (width >= 1920) {
		files = [
			//Пути для 4к видео, видео будут отображаться в указанном здесь порядке
			"video/4k/1.mp4",
			"video/4k/2.mp4"
		]
	} else if (width >= 1281) {
		files = [
			//Пути для fullHd видео, видео будут отображаться в указанном здесь порядке
			"video/fullHd/bgFullHD1.mp4",
			"video/fullHd/bgFullHD2.mp4"
		]
	} else if (width < 1281) {
		files = [
			//Пути для HD видео, видео будут отображаться в указанном здесь порядке
			"video/hd/bgHD1.mp4",
			"video/hd/bgHD2.mp4"
		]
	}

	for (var i = 0; i < files.length; i++) {
		$('.videos').append('<video src="' + files[i] + '" muted>')
	}

	var videos = document.querySelectorAll('video');

	videos[0].classList.add('play');

	videos.forEach(function(video, i, videos) {
		video.oncanplaythrough = function () {
			if (video.classList.contains('play')) {
				video.play();
			}
		};

		video.onended = function () {
			console.log(i);
			video.classList.remove('play');
			if (i + 1 < videos.length) {
				play.apply(videos[i + 1]);
			} else {
				play.apply(videos[0])
			}
		}
	});

	function play() {
		this.classList.add('play');
		this.play();
	}

	$('.video-control').on('click', function () {
		$(this).toggleClass('video-control_active');
		var currentVideo = document.querySelector('.play');
		if (currentVideo.paused) {
			currentVideo.play();
		} else {
			currentVideo.pause()
		}
	})

});
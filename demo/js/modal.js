var modal = modal || {};

modal = {

	show: function (msg) {
		$('.modal').find('.container').html(msg);
		$('.modal').show();
	},
	hide: function () {
		$('.modal').hide();
		$('.modal .container').empty();
	},
	bind_events: function () {
		$('.modal .close-modal').on('click', function () {
			modal.hide();
		});
	},
	init: function() {

		$(document).ready(function () {

			modal.bind_events();
		});
	}
};

modal.init();
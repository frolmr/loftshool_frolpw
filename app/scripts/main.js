$(document).ready(function (){
	eventListener();
});

function eventListener () {
	$('.contact__form').on('submit', pushSubmit('form'));
	$('.work-list__new-item').on('click', showModal);
	$('.close-icon__button, .overlay').on('click', hideModal);
	$('textarea, input').on('keypress', removeTooltiped);
}

function showModal(event){
	event.preventDefault();
	$('.overlay').fadeIn(400, function() {
		$('#modal').show().animate({opacity: 1}, 400);
		$('.tooltip').show();
	});
}

function hideModal(){
	$('#modal').animate({opacity: 0}, 200, function() { 
		$(this).hide();
		$('.overlay').fadeOut(400);
		$('.tooltip').hide();
	});
}

function tooltipEmptyField(form) {
	var formFields = $(form).find('input, textarea');
		formFields.each(function(i, value){
			var input = $(value),
				inputValue = input.val();
			if (!inputValue) {
				putTooltip(input);
			};
		});
};

function putTooltip(field){
	var tooltipMessage = $(field).data('error-message'),
		tooltipSide = $(field).data('tooltip-side')
		$(field).tooltip({
			position: tooltipSide,
			content: tooltipMessage
		});
};

function removeTooltiped(field) {
	var tooltips = $('body').find('.tooltip__inner'),
		message = $(this).data('error-message')
		tooltips.each(function(i, value){
			if (message === value.innerText) {
				$(value).remove();
			};
		});
		$(this).removeClass('tooltiped');
};

function formValidation (form){
	
};

function pushSubmit(form){
	$('form').on('submit', function(event) {
		event.preventDefault();
		tooltipEmptyField(form);
	});
};

$.fn.tooltip = function(options){

	options = {
		position	: options.position || 'right',
		content		: options.content || 'I am tooltip'
	};

	var 
		markup = '<div class="tooltip tooltip_' + options.position + ' "> \
					<div class="tooltip__inner"> ' + options.content + '</div> \
				 </div>';

	var 
		$this = this,
		body = $('body');

	$this
		.addClass('tooltiped')
		.attr('data-tooltip-position', options.position);

	body.append(markup);

	_positionTooltip($this, body.find('.tooltip').last(), options.position);

	$('.contact__form--reset').on('click', function(){
		$('.tooltip').remove();
		$('form').find('input, textarea').removeClass('tooltiped');
	});

	$(window).on('resize', function(){

		var
			tooltips = $('.tooltip');

		var
			tooltipsArray = [];

		tooltips.each(function(){
			tooltipsArray.push($(this));
		});

		$('.tooltiped').each(function(index){
			var
				position = $(this).data('tooltip-position');

			_positionTooltip($(this), tooltipsArray[index], position);
		});

	});

	function _positionTooltip(elem, tooltip, position) {
		var
			elemWidth   = elem.outerWidth(true),
			elemHeight  = elem.outerHeight(true),
			topEdge     = elem.offset().top,
			bottomEdge  = topEdge + elemHeight,
			leftEdge    = elem.offset().left,
			rightEdge   = leftEdge + elemWidth;

		var
			tooltipWidth 	= tooltip.outerWidth(true),
			tooltipHeight 	= tooltip.outerHeight(true),
			leftCentered 	= (elemWidth / 2) - (tooltipWidth / 2),
			topCentered 	= (elemHeight / 2) - (tooltipHeight / 2);

		var positions = {};	

		switch (position) {
			case 'right' :
				positions = {
					left 	: rightEdge,
					top 	: topEdge + topCentered
				};
				break;
			case 'top' :
				positions = {
					left	: leftEdge + leftCentered,
					top 	: topEdge - tooltipHeight
				};
				break;
			case 'bottom' :
				positions = {
					left 	: leftEdge + leftCentered,
					top 	: bottomEdge
				};
				break;
			case 'left' :
				positions = {
					left 	: leftEdge - tooltipWidth,
					top 	: topEdge + topCentered
				};
				break;
		}
			
		tooltip
			.offset(positions)
			.css('opacity', '1');
	}
};
$(document).ready(function () {
	$('a.work-list__new-item').click(function(event) {
		event.preventDefault();
		$('.overlay').fadeIn(400, function() {
				$('#modal').show().animate({opacity: 1}, 200);
		});
	});
	
	$('.close-icon__button, .overlay').click(function() { 
		$('#modal').animate({opacity: 0}, 200, function() { 
					$(this).hide();
					$('.overlay').fadeOut(400);
			});
	});

	$('.contact__form').on('submit', function(e) {
		e.preventDefault();
		$('.validate').tooltip({
			position : 'left',
			content : 'fuck you!'
		});
	});
	
});


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
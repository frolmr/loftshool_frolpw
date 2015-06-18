$(document).ready(function() {
	$('a.work-list__new-item').click( function(event){
		event.preventDefault();
		$('.overlay').fadeIn(400, function() {
				$('#modal').show().animate({opacity: 1}, 200);
		});
	});
	
	$('.close-icon__button, .overlay').click( function(){ 
		$('#modal').animate({opacity: 0}, 200, function() { 
					$(this).hide();
					$('.overlay').fadeOut(400); 
				}
			);
	});
	
});

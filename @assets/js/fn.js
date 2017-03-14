function watchActionBar()
{
	var element;
	
	$('.sfa_action_button, .sfa_action_text_button').each(function(e)
	{
		element = $(this);
		
		$(element).css('display',$(element).css('visibility') == 'hidden' ? 'none':'inline-block');
	});
}

function sfaSetActive(element,array)
{
	ob = array || '#click_1, #click_2, #click_3';
	$(ob).removeClass('sfa_active');
	$(element).addClass('sfa_active');
}
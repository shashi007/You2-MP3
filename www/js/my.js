$(document).ready(function(){

	// Formdan içerikleri çek
	$('.arabtn').on('click',function(e){
		e.preventDefault();

		var request = gapi.client.youtube.search.list({
			part: "snippet",
			order: "rating",
			type: "video",
			q: $('#query').val(),
			maxResults: 10
		});

		/**
		* KALAN İŞLEMLER 
		* 1- İNDİRME BAŞLARKEN LOADİNG EKRANI GELSİN
		**/

		request.execute(function(response){
			$('.benimkiler').html("");
			var results = response.result;
			$.each(results.items,function(index,item){
				$('.benimkiler').append('<div class="list card"><div class="item item-avatar"><img src="'+item.snippet.thumbnails.default.url+'"><h2>'+item.snippet.title+'</h2><p>'+item.snippet.channelTitle+'</p></div><a data-link="'+item.id.videoId+'" class="indirmelinki item item-icon-left balanced" href="#"><i class="icon ion-android-download"></i>indir</a></div></div>');
			});

			// 3 kez indirme işlemi :D
			$('a.indirmelinki').click(function(){
				////www.youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=i62Zjga8JOM
				var id = $(this).data('link');
				$('iframe.indirbakalim').attr('src',"//www.youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v="+id);
				return false;
			});
		});
		
	});


	// URL'den indirme sayfası
	$('.urlbtn').on('click',function(){
		var q = $('#uquery').val();
		$('iframe.indirbakalim').attr('src',"//www.youtubeinmp3.com/fetch/?video="+q);
	});
	

});

function init(){
	gapi.client.setApiKey("AIzaSyAZE1z94ro_Qv4F5DHtnyoksXA4NBlteAg");
	gapi.client.load("youtube","v3",function(){
		// api is ready
	});
}
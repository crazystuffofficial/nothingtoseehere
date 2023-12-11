const defaultVolume = 75;

$(document).ready(function(){
	
	$(".mainBackground").flexBackground({birds:'10',
		size:'15',
		interval : '30',
		velocity : '3',
		color : 'rgb(0, 0, 0, .5)'
		});

	// $(".mainBackground").flexBackground({numberOfPoints:'400',
	// 	radius:'2',
	// 	interval : '30',
	// 	velocity : '2',
	// 	color : 'rgb(256, 256, 256)' //Only In RGB format. don't use #hex or any other color format
	// 	});

	hashSearch();

	$('.buttonQuery').keypress(function (e) {
		var key = e.which;
		if(key == 13)
		{
			var query = $('.buttonQuery').val();
			if (query) vkSearch(query, 'q');
		}
	});

	$("#informer").click(function() {
		$(this).hide();
	});

	$("#btc").click(function() {
		$('#btc').append('<strong>ETH BSC ( BEP20 ):</strong> <input type="text" name="ETH" class="ETH" value="0x0f96ee2e4847e7c019c51caad20a52eb2c924db8" style="width: 350px;text-align: center;display: inline;"></input>');
		$("#btc").unbind();
	});

	if (localStorage.getItem("disclamer12") != 1) {
		$('#fullwrapper').animate({ opacity: "show" }, "slow");
		$('#fullwrapper').html(`
			<div onclick="hideDisc()" style="background: #000; color: #fff; margin: auto; width: 80%; margin-top: 60px; cursor: pointer; border: 3px solid green; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">
				<p>Hey everyone reading this,</p>
				<p>Sitting in front of a blank screen, I’m trying to find the words that could convey all the emotions I'm feeling right now, but I realize that words are just pale shadows of what we truly feel. And here comes that difficult moment to say goodbye to slider.kz.</p>
				<p>We started as a simple idea – to give everyone the chance to enjoy music, and over the years, we became something like a cozy room you could enter at any time to find old friends waiting. You helped bring slider.kz to life, sharing tracks that touched your soul and responding to the ones that touched mine.</p>
				<p>Every day that I’ve kept our site going, I’ve seen how music brings people together, regardless of everything else in the world. Music is more than just sounds. It’s a memory of a first love, it’s that very beat we laughed to with friends, it’s the tune that was there for us in hard times.</p>
				<p>Now, as slider.kz is closing down, I want you to take a piece of that warmth with you. Let the music you found here stay with you. Don’t forget the songs that made you dance; let them keep playing in your headphones, your speakers, and your hearts.</p>
				<p>I don’t know what will happen to the domain from here on, but that’s not important. What matters is that we were part of something bigger, part of a community where everyone could be themselves, alone with their thoughts and at the same time – together with thousands of other hearts.</p>
				<p>So thank you for this incredible journey. And may your life be filled with new songs and new experiences, just like these years with slider.kz.</p>
				<p>With warmth and always yours, <br>slider</p>
			</div>`);
	}

	$("#searchButton").click(function() {
		var query = $('.buttonQuery').val();
		if (query) vkSearch(query, 'q');
	});

	soundManager.setup({url: '/media/swf/'});
	
	$("#r_bash").click(function() {
		getBash();
	});
	getBash();
})

function hashSearch(){
	setTimeout(function (){
		if (location.hash){
			var query = decodeURIComponent(window.location.hash.substr(1));
			$('.buttonQuery').val(query);
			vkSearch(query, 'q');
		} else {
			vkSearch("", "top");
		}
	}, 100);

}

function getBash(){
	$.get( "/modules/bash/", function( data ) {
		$("#r_bash").hide().html(data).fadeIn("fast");
	});
}

function volumizer(){

	let vol = localStorage.getItem("volume") || defaultVolume;
	soundManager.defaultOptions.volume = vol

	 $("#setVol").slider({
		range: "max",
		min: 0,
		max: 100,
		value: vol, 
		animate: true,
		slide: function(event, ui) {
			soundManager.setVolume(ui.value);
			localStorage.setItem("volume", ui.value);
			soundManager.defaultOptions.volume = ui.value;
		}
	});
}


function vkSearch(query, seType) {
	location.hash = query;
	if (seType == 'q') {
		$(document).attr("title", "Download: " + query);
	}

	$('#liveaudio').html('<center><img src="/media/images/preload.gif"></center>').show();


	$.getJSON("/vk_auth.php?" + seType + "=" + encodeURIComponent(query), function( data, keys) {
		var items = [];
		$.each(data['audios'], function( uid, d ) {
			if (d && d.length > 0){
				console.log(d.length);
				$.each( d, function( key, track ) {
					var flag = (key % 2 != 0 ? 'stripe-even' : 'stripe-odd');
					items.push('<div class="num">'+key+'.</div>' +
					'<div class="track '+flag+'">' +
						'<div class="ui360">' + '<a href="' + track['url'] + '">'+ track['tit_art']+'</a>' + '</div>' +
						'<div class="controlPanel">' +
							'<div class="trackTime" onclick="get_btrate(\'' +track['id'] +  "/" + track['duration']+ "/" + track['durl'] + '.mp3\')">'+toHHMMSS(track['duration'])+'</div>' +
							'<div class="trackDownload">' +'<a href="/' +track['id'] +  "/" + track['duration']+ "/" + track['durl'] + "/" + encodeURIComponent(track['tit_art']) + '.mp3"><img alt="download" src="/media/images/download.gif"></a>' +'</div>' +
						'</div>' +
					'</div>');
				})
				$('#liveaudio').html(items);
				soundManager.reboot();
				volumizer();

				$.getJSON( "/similar/artist/" + $('.buttonQuery').val(), function( data ) {
					var items = [];
					if(data["similarartists"]["artist"].length > 0){
				
						$.each( data["similarartists"]["artist"], function( key, val ) {
						items.push( "<a href='#" + val.name +"' onclick=hashSearch();>" + val.name + "</a>" );
						});
					
						$('#similarArtists').html(
							items.join(" ")
						);
						
						$('#similarArtists').show();
					} else {
						$('#similarArtists').hide();
					}
				  });
				  
			} else {
				$('#liveaudio').html("something went wrong..").show();
			}
		})
	})
}

function toHHMMSS(secs)
{
	var t = new Date(1970,0,1);
	t.setSeconds(secs);
	var s = t.toTimeString().substr(0,8);
	if(secs > 86399) s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
	if(s.substr(0, 2) == 00) return s.substr(3);
	return s;
}

function get_btrate(id,)
{
	$('#informer').show().html('<img src="/media/images/preload.gif">');
	$.get('/info/'+id, function(data){$('#informer').html(data)});
}


function hideDisc()
{
	localStorage.setItem("disclamer12", 1);
	$('#fullwrapper').animate({ opacity: "hide" }, "slow");
}

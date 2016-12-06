(function($) {
	var cssStyle;
	function setScreenPosition() {
		var topPos = $(window).scrollTop();
		var sidebar = $('#sidebar-menu');
		var defaultSidebarTop;
		
		if ($('body').css('font-size') == '24px') {
			cssStyle = 'overhead';
			defaultSidebarTop = 136;
		} else {
			cssStyle = 'normal';
			defaultSidebarTop = 104;
			
		}
		
		//var expandSidebar = $('#expand-sidebar');
		
		if (topPos == 0) {
			sidebar.css('top', defaultSidebarTop+'px');
		}
		if (topPos > 0 && topPos <= 40) {
			sidebar.css('top', (defaultSidebarTop-topPos)+'px');
			//expandSidebar.css('top',(120-topPos)+'px');
		}
		if (topPos > 40) {
			$('#top-nav').addClass('top-nav-fixed');
			sidebar.css('top',$('#top-nav').outerHeight());
			//expandSidebar.css('top',$('#top-nav').outerHeight()+10);
		} else {
			$('#top-nav').removeClass('top-nav-fixed');
		}
	}
	
	$(document).on('click','#collapse-sidebar',function() {
		$('#main-column').addClass('no-sidemenu');
		$('#sidebar-menu').hide();
		$('#expand-sidebar').show();
	});
	
	$(document).on('click','#expand-sidebar a', function() {
		$(this).parent('#expand-sidebar').hide();
		$('#main-column').removeClass('no-sidemenu');
		$('#sidebar-menu').show();
	});
	
	$(document).on('click','#sidebar-menu a[href^="#"]',function() {
		if (cssStyle == 'overhead') {
			$('#collapse-sidebar').click();
		}
	});
	
	$(window).scroll(function() {
		setScreenPosition();
	});
	
	$(document).ready(function() {
		setScreenPosition();
		var url = document.location.href.replace(/.*\/\/[^\/]*/, '');
		var pathname, documentName;
		if (url.substr(-1) == '/') {
			documentName = 'index.html';
			pathname = url.slice(0,-1);
		} else {
			documentName = url.substr(url.lastIndexOf('/')+1);
			pathname = url.substr(0,url.lastIndexOf('/'));
		}
		
		$('#top-nav ul li a[href="'+pathname+'"]').parent('li:first').addClass('active');
		
		if (documentName.substr(0,1) != '#') {
			$('#sidebar-menu ul li a[href="'+documentName+'"]').parent('li:first').addClass('active');
		}
		
		if ($('#sidebar-menu').length == 0) {
			$('#expand-sidebar a').hide();
		}
		
	});
}) ( jQuery );
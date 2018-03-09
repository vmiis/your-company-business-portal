//--------------------------------------------------------
window.addEventListener('message', function(e) {
	if(e.data.sandbox_id=='sandbox__ID'){
		if(e.data.module_name!=undefined){
			$vm.nav_load_module(e.data.module_name);
		}
		else if(e.data.cmd=='source'){
            var url_content=$('#sandbox__ID').attr('src').replace('frame.html','modules/'+page);
			$vm.url_source(url_content);
		}
	}
}, false)
//--------------------------------------------------------

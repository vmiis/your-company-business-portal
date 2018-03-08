//--------------------------------------------------------
$('#sandbox__ID').attr('src',url_frame);
//--------------------------------------------------------
$('#sandbox__ID').on('load',(function(){
	$vm.load_module_content(url_content,function(sandbox_content){
		var fm=document.getElementById("sandbox__ID").contentWindow;
		fm.postMessage({id:'__ID',content:sandbox_content},'*');
	})
}));
//--------------------------------------------------------
window.addEventListener('message', function(e) {
	if(e.data.sandbox_id=='sandbox__ID'){
		if(e.data.module_name!=undefined){
			$vm.nav_load_module(e.data.module_name);
		}
		else if(e.data.cmd=='source'){
			$vm.url_source(url_content);
		}
	}
}, false)
//--------------------------------------------------------

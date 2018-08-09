$vm={};	$vm.start_time=new Date().getTime();
$.ajaxSetup({cache:true});
$.get('sys/version.html',function(v){
//------------------------------------------
console.log(v);	if(window.location.hostname=='127.0.0.1' || window.location.hostname=='localhost')	$vm.localhost=true;
$vm.ver=v.trim().split(',');
var url=window.location.href.split('?')[0];
var ver_h=localStorage.getItem(url+"h_ver");
var txt_h=localStorage.getItem(url+"h_txt");
var ver_j=localStorage.getItem(url+"j_ver");
var txt_j=localStorage.getItem(url+"j_txt");
var new_txt_h="";
var new_txt_j="";
//------------------------------------------
var process=function(){
	if(new_txt_j=="") return;
	else{
		if(new_txt_h=="") return;
		$('#vm_framework').html(new_txt_h);
		$('head').append('<scr'+'ipt>'+new_txt_j+'</scr'+'ipt>');
	}
}
//------------------------------------------
if(ver_h!=$vm.ver[0] || txt_h===null || $vm.localhost==true){
	console.log('loading from url. layout.html');
	$.get('sys/layout.html?_='+$vm.ver[0],function(new_txt){
		new_txt_h=new_txt;
		localStorage.setItem(url+"h_txt",new_txt_h);
        localStorage.setItem(url+"h_ver",$vm.ver[0]);
		process();
	},'text');
}
else{
	console.log('loading from storage. layout.html');
	new_txt_h=txt_h;
	process();
}
if(ver_j!=$vm.ver[0] || txt_j===null || $vm.localhost==true){
	console.log('loading from url. os.js');
	$.get('sys/app.js?_='+$vm.ver[0]+$vm.reload,function(new_txt){
		new_txt_j=new_txt;
		localStorage.setItem(url+"j_txt",new_txt_j);
        localStorage.setItem(url+"j_ver",$vm.ver[0]);
		process();
	},'text');
}
else{
	console.log('loading from storage. layout.html');
	new_txt_j=txt_j;
	process();
}
//------------------------------------------
},'text')

//-------------------------------------
var this_module=$vm.module_list[$vm.vm['__ID'].name];
var prefix=this_module.prefix; if(prefix==undefined) prefix="";
var form_module=prefix+this_module.form_module;
//-------------------------------------
$('#new__ID').off('click').on('click',function(){$vm.load_module_v2(prefix+form_module,'',{goback:1})})
//-------------------------------------
$('#D__ID').on('load',function(){  m.set_req(); m.request_data(); })
//-------------------------------------

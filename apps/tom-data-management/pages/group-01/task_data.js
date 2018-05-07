//-------------------------------------
//var _json='';
//-------------------------------------
var this_module=$vm.module_list[$vm.vm['__ID'].name];
var prefix=this_module.prefix; if(prefix==undefined) prefix="";
var form_module=prefix+this_module.form_module;
//-------------------------------------
$('#new__ID').off('click').on('click',function(){$vm.load_module_v2(form_module,'',{goback:1})})
//-------------------------------------
$('#D__ID').on('load',function(){
    if($vm.vm['__ID'].input.preload==true) return;
    _set_req(); _request_data();
})
//-------------------------------------
var _before_submit=function(record,dbv){
    if(typeof(before_submit)!='undefined') before_submit(record,dbv);
};
//-------------------------------------

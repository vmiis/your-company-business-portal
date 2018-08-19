//-------------------------------------
//var _json='';
//-------------------------------------
var this_module=$vm.module_list[$vm.vm['__ID'].name];
var prefix=this_module.prefix; if(prefix==undefined) prefix="";
var form_module=prefix+this_module.form_module;
//-------------------------------------
$('#new__ID').off('click').on('click',function(){$vm.load_module_v2(form_module,'',{goback:1})})
//-------------------------------------
$('#D__ID').on('load',function(){  _set_req(); _request_data(); })
//-------------------------------------
var _before_submit=function(record,dbv){
    if(typeof(before_submit)!='undefined') before_submit(record,dbv);
};
//-------------------------------------
$('#toolbar__ID').on('dblclick',function(){
    var txt="";
    var flds=_fields.replace('_Form,','').replace(',Submit Date|DateTime,Submitted by|Author,_Delete','');
    var A=[],B=[];
    var s=fields.split(',');
    for(var i=0;i<s.length;i++){
        var L=s[i].split('|')[0].replace(/_/g,' ');
        var N=s[i].split('|').pop();
        txt+="<div class='row row__"+"ID'>\r\n";
        txt+="<div class=col>\r\n";
        txt+="<span>"+L+"</span>\r\n";
        txt+="<input type=text class=form-control name="+N+">\r\n";
        txt+="</div>\r\n";
        txt+="</div>\r\n";
    }
    $vm.view_code(txt,"Form")
})
//-------------------------------------

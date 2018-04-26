//-------------------------------------
//var _json='';
//-------------------------------------
var this_module=$vm.module_list[$vm.vm['__ID'].name];
var prefix=this_module.prefix; if(prefix==undefined) prefix="";
//-------------------------------------
$('#D__ID').on('load',function(){
    $('#F__ID')[0].reset();
    $('#submit__ID').show();
    var input=$vm.vm['__ID'].op;
    var input_record=input.record;
    if(input_record==undefined){
        input=input.input;
        input_record=input.record;
    }
    $('#delete__ID').hide(); if(input_record!=undefined && input_record.ID!==undefined) $('#delete__ID').show();
    $vm.deserialize(input_record,'#F__ID');
	if(typeof(on_load)!='undefined') on_load(input_record);
})
//-------------------------------------
$('#F__ID').submit(function(event){
    //--------------------------------------------------------
    event.preventDefault();
    $('#submit__ID').hide();
    //--------------------------------------------------------
    var data=$vm.serialize('#F__ID');
    var dbv={}
    if(typeof(before_submit)!=undefined) before_submit(data,dbv);
    //--------------------------------------------------------
    var db_pid=this_module.table_id;
    //-------------------------------------------------------
    var rid=undefined;
    var input=$vm.vm['__ID'].op;
    var input_record=input.record;
    if(input_record!=undefined) rid=input_record.ID;
    if(rid==undefined){
        input=input.input;
        input_record=input.record;
        rid=input_record.ID;
    }
    //-------------------------------------------------------
    var req={cmd:"add_json_record",db_pid:db_pid,data:data,dbv:dbv};
    if(rid!=undefined) req={cmd:"modify_json_record",rid:rid,db_pid:db_pid,data:data,dbv:dbv};
    $VmAPI.request({data:req,callback:function(res){
        $vm.refresh=1;
        if(rid!=undefined) window.history.go(-1);
        else if($vm.vm['__ID'].op.input!=undefined && $vm.vm['__ID'].op.input.goback!=undefined) window.history.go(-1);
        else $vm.alert('Your data has been successfully submitted');
    }});
    //--------------------------------------------------------
})
//--------------------------------------------------------

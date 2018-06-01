//-------------------------------------
var this_module=$vm.module_list[$vm.vm['__ID'].name];
var prefix=this_module.prefix; if(prefix==undefined) prefix="";
//-------------------------------------
$('#D__ID').on('load',function(){
    $('#F__ID')[0].reset();
    $('#submit__ID').show();
    var grid_record=$vm.vm['__ID'].input.record;
    $('#delete__ID').hide(); if(grid_record!=undefined && grid_record.ID!==undefined) $('#delete__ID').show();
    $vm.deserialize(grid_record,'#F__ID');
    if(typeof(on_load)!='undefined') on_load(grid_record);
})
//-------------------------------------
$('#F__ID').submit(function(event){
    //--------------------------------------------------------
    event.preventDefault();
    $('#submit__ID').hide();
    //--------------------------------------------------------
    var data=$vm.serialize('#F__ID');
    var dbv={}
    var R=true;
    if(typeof(before_submit)!='undefined') R=before_submit(data,dbv);
    if(R==false) return;
    //--------------------------------------------------------
    var db_pid=this_module.table_id;
    var rid=undefined; if($vm.vm['__ID'].op.record!=undefined) rid=$vm.vm['__ID'].op.record.ID;
    var req={cmd:"add_json_record",db_pid:db_pid,data:data,dbv:dbv};
    if(rid!=undefined) req={cmd:"modify_json_record",rid:rid,db_pid:db_pid,data:data,dbv:dbv};
    $VmAPI.request({data:req,callback:function(res){
        $vm.refresh=1;
        if(rid!=undefined) window.history.go(-1);
        else if($vm.vm['__ID'].input!=undefined && $vm.vm['__ID'].input.goback!=undefined) window.history.go(-1);
        else $vm.alert('Your data has been successfully submitted');
    }});
    //--------------------------------------------------------
})
//--------------------------------------------------------

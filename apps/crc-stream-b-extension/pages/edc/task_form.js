//-------------------------------------
var participant_tid     ="20005167";
var participant_sql		="Convert(varchar,UID)+'-'+@('Subject_Initials')";
//-------------------------------------
var this_module			=$vm.module_list[$vm.vm['__ID'].name];
var prefix				=this_module.prefix; if(prefix==undefined) prefix="";
var form_tid      		=this_module.table_id;
//-------------------------------------
if(participant_tid!=undefined){
	var sql="with tb as (select name="+participant_sql+",value2=uid from [TABLE-"+participant_tid+"])";
	sql+=" select top 10 name,value=name,value2 from tb where Name like '%'+@S1+'%' ";
	$vm.autocomplete($('#Participant__ID'),sql,function(key,value){
		$("#F__ID input[name="+key+"]").val($vm.text(value));
	})
}
//-------------------------------------
$('#D__ID').on('load',function(){
    $('#F__ID')[0].reset();
    $('#submit__ID').show();
    var input_record=$vm.vm['__ID'].input.record;
    $('#delete__ID').hide(); if(input_record!=undefined && input_record.ID!==undefined) $('#delete__ID').show();
    $vm.deserialize(input_record,'#F__ID');
	//--------------------------
	//particioant info from parent grid
	var input=$vm.vm['__ID'].input;
	if($("#F__ID input[name=Participant]").val()=='' && input!=undefined){
		//$("#F__ID input[name=Participant]").val(input.participant_name);
		//$("#F__ID input[name=Participant_uid]").val(input.participant_uid);
		if(input.record!=undefined){
			$("#F__ID input[name=Participant]").val(input.record.Participant);
			$("#F__ID input[name=Participant_uid]").val(input.record.Participant_uid);
		}
	}
	//$('#row_participant__ID').hide(); if( $("#F__ID input[name=Participant_uid]").val()=='') $('#row_participant__ID').show();
	$("#F__ID input[name=Participant]").prop('disabled',false);
	if($("#F__ID input[name=Participant]").val()!='') $("#F__ID input[name=Participant]").prop('disabled',true);
	//--------------------------
	if(typeof(on_load)!='undefined') on_load(input_record);
})
//-------------------------------------
var _before_submit=function(record,dbv){
	if(typeof(before_submit)!='undefined') before_submit(record,dbv);
	dbv.PUID=record.Participant_uid;
	dbv.S3=$vm.status_of_data(record);
	if(dbv.PUID==''){
		$vm.alert('No participant was selected.');
		$('#submit__ID').show();
		return false;
	}
	return true;
};
//-------------------------------------
$('#F__ID').submit(function(event){
	//--------------------------------------------------------
	event.preventDefault();
	$('#submit__ID').hide();
	//--------------------------------------------------------
	var data=$vm.serialize('#F__ID'); var dbv={}
	if(_before_submit(data,dbv)==false) return;
	//--------------------------------------------------------
	var rid=undefined; if($vm.vm['__ID'].op.record!=undefined) rid=$vm.vm['__ID'].op.record.ID;
	var req={cmd:"add_record",db_pid:form_tid,data:data,dbv:dbv};
	if(rid!=undefined) req={cmd:"modify_record",rid:rid,db_pid:form_tid,data:data,dbv:dbv};
	$VmAPI.request({data:req,callback:function(res){
		$vm.refresh=1;
		if(rid!=undefined) window.history.go(-1);
		else if($vm.vm['__ID'].input!=undefined && $vm.vm['__ID'].input.goback!=undefined) window.history.go(-1);
		else $vm.alert('Your data has been successfully submitted');
	}});
	//--------------------------------------------------------
})
//--------------------------------------------------------

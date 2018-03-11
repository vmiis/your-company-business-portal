//-------------------------------------
_record_type="s2";
var _task_fields='';
//-------------------------------------
_set_req=function(){
    _records=[];
	$('#new__ID').triggerHandler('click');
	var form=$('#grid__ID tr:nth-child(2)').find('u:first');
	form.triggerHandler('click');
}
//-------------------------------------
var _set_status_and_participant=function(record,dbv){
    var flds=_task_fields.split(',');
    var J=0,K=0,N=flds.length;
    for(var i=0;i<N;i++){
        var id=flds[i].split('|').pop();
        if(id=='UID') K++;
        else if(record[id]==='' || record[id]===undefined || record[id]===null)  J++;
    }
    N=N-K;
    if(N==J) 		    dbv.S3='#FF0000';
    else if(J===0)  	dbv.S3='#00FF00';
    else 			    dbv.S3='#FFCC00';
    if(record.Participant===undefined || record.Participant===null || record.Participant==""){
        $vm.alert("No participant was selected");
        return false;
    }
    if(record.Participant_uid!==undefined) dbv.PUID=record.Participant_uid;
    return true;
};
//-------------------------------------
_new_pre_data_process=function(){
    if($vm.vm['__ID'].op.input.participant_uid!==undefined) _records[0].Participant_uid=$vm.vm['__ID'].op.input.participant_uid;
    if($vm.vm['__ID'].op.input.participant_name!==undefined) _records[0].Participant=$vm.vm['__ID'].op.input.participant_name;
}
//-------------------------------------

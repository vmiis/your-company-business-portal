//-------------------------------------
//for auto select participant
var participant_tid =$vm.module_list[m.prefix+'participant-data'].table_id;
var participant_sql	="JSON_VALUE(Information,'$.Subject_Initials')+' '+JSON_VALUE(Information,'$.DOB')";
var sql="with tb as (select name="+participant_sql+",value2=uid from [TABLE-"+participant_tid+"])";
sql+=" select top 10 name,value=name,value2 from tb where Name like '%'+@S1+'%' ";
$vm.autocomplete($('#Participant__ID'),sql,function(key,value){
    $("#F__ID input[name="+key+"]").val($vm.text(value));
})
//-------------------------------------
var participant_name =function(record){ if(record.Subject_Initials!=undefined) return record.Subject_Initials+' '+record.DOB; else return record.UID;}
//-------------------------------------
m.load=function(){
    m.input=$vm.vm['__ID'].input; if(m.input==undefined) m.input={};
    $('#F__ID')[0].reset();
    $('#submit__ID').show();
    var task_record=m.input.record;
    $vm.deserialize(task_record,'#F__ID');
    //--------------------------
    //from new or questionnaire
    var participant_record=m.input.participant_record;
    if(task_record==undefined && participant_record!=undefined && participant_record.UID!=undefined){
        $("#F__ID input[name=Participant]").val(participant_name(participant_record));
        $("#F__ID input[name=Participant_uid]").val(participant_record.UID);
    }
    //--------------------------
    $('#F__ID input[name=Participant]').prop('disabled',false); if($("#F__ID input[name=Participant_uid]").val()!='') $('#F__ID input[name=Participant]').prop('disabled',true);
    //--------------------------
}
//-------------------------------------
m.before_submit=function(record,dbv){
   if(record.Participant_uid!=""){
       dbv.PUID=record.Participant_uid;
       dbv.S3=$vm.status_of_data(record);
   }
   return true;
};
//-------------------------------------

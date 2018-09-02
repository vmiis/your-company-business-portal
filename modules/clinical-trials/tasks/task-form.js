//-------------------------------------
//for auto select participant
var participant_tid =$vm.module_list[m.prefix+'participant-data'].table_id;
var participant_sql	="JSON_VALUE(Information,'$.Subject_Initials')+' '+JSON_VALUE(Information,'$.DOB')";
var sql="with tb as (select name="+participant_sql+",value2=uid from [TABLE-"+participant_tid+"])";
sql+=" select top 10 name,value=name,value2 from tb where Name like '%'+@S1+'%' ";
var start=function(){
    $vm.autocomplete($('#Participant__ID'),sql,function(key,value){
        $("#F__ID input[name="+key+"]").val($vm.text(value));
    })
}
//-------------------------------------
var I=0;
var loop__ID=setInterval(function (){
    if($vm['jquery-ui-min-js']!=undefined){
        clearInterval(loop__ID); start();
    }
    I++; if(I>50){
        clearInterval(loop__ID); alert("jquery-ui.min.js is not installed.");
    }
},100);
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
    $('#F__ID input[name=Participant]').prop('readonly',false);
    $('#F__ID input[name=Participant]').autocomplete( "enable" );
    if($("#F__ID input[name=Participant_uid]").val()!=''){
        $('#F__ID input[name=Participant]').prop('readonly',true);
        $('#F__ID input[name=Participant]').autocomplete( "disable" );
    }
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

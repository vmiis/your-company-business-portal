//-------------------------------------
var participant_tid     ="20005167";
var notes_tid			="20005164";
var participant_sql		="Convert(varchar,UID)+'-'+@('Subject_Initials')";
var site_sql_where		="";
//-------------------------------------
var _json='';
//_record_type="s2";
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
_set_req=function(){
    if($vm.online_questionnaire===1){
        _records=[];
        return;
    }
    var participant_where="";
    var participant_uid="";
	if($vm.vm['__ID'].input!=undefined) participant_uid=$vm.vm['__ID'].input.participant_uid;
    if(participant_uid!=="" && participant_uid!==undefined){
        site_sql_where='';
        participant_where=" where uid="+participant_uid;
    }
    var sql="with notes as (select PUID,NT=S1,NC=S2,NRowNum=row_number() over (PARTITION BY PUID order by ID DESC) from [FORM-"+notes_tid+"] where ppid="+_db_pid+")";
    sql+=",participant as (select Site=S1,ParticipantUID=UID,participant_sql="+participant_sql+" from [FORM-"+participant_tid+"]"+site_sql_where+participant_where+" )";
    sql+=",task as (select ID,UID,PUID,S3,Site=participant.Site,Information,participant_sql,DateTime,Author,RowNum=row_number() over (order by ID DESC) from [FORM-"+_db_pid+"-@S1] left join participant on PUID=ParticipantUID)";
    sql+="select Information,ID,S3,UID,Site,Participant=participant_sql,DateTime,Author,RowNum,NT,NC,dirty=0, valid=1 from task left join notes on UID=notes.PUID and NRowNum=1 where RowNum between @I6 and @I7";
    var sql_n="with participant as (select Site=S1,ParticipantUID=UID from [FORM-"+participant_tid+"]"+site_sql_where+" )";
    sql_n+=" select count(ID) from [FORM-"+_db_pid+"-@S1] left join participant on PUID=ParticipantUID";

    _req={cmd:'query_records',sql:sql,sql_n:sql_n,s1:'"'+$('#keyword__ID').val()+'"',I:$('#I__ID').text(),page_size:$('#page_size__ID').val()}
}
//-------------------------------------
_set_req_export=function(i1,i2){
    _fields_e="Participant ID|ParticipantUID,Participant,"+fields
    var sql="with participant as (select Site=S1,ParticipantUID=UID,participant_sql="+participant_sql+" from [FORM-"+participant_tid+"]"+site_sql_where+" )";
    sql+=",task as (select ID,UID,PUID,S3,Information,DateTime,Author from [FORM-"+_db_pid+"-@S1])";
    sql+=",records as (select ID,ParticipantUID,Site,Information,Participant=participant_sql,DateTime,Author,RowNum=row_number() over (order by ID DESC) from task left join participant on PUID=ParticipantUID)";
	sql+=" select * from records where RowNum between @I1 and @I2";
    _req={cmd:'query_records',sql:sql,i1:i1,i2:i2}
}
//-------------------------------------
var _set_status_and_participant=function(record,dbv){
    dbv.PPID=participant_tid;
	dbv.S3=$vm.status_of_data(_row_data2(record));
    if(record.Participant_uid!==undefined) dbv.PUID=record.Participant_uid;
    return true;
};
//-------------------------------------

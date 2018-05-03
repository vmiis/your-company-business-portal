//-------------------------------------
var this_module			=$vm.module_list[$vm.vm['__ID'].name];
var prefix				=this_module.prefix;
var form_module			=prefix+this_module.form_module;
var form_tid      		=this_module.table_id;
//var participant_tid     =""; if($vm.module_list[prefix+'participant-data']!=undefined) participant_tid=$vm.module_list[prefix+'participant-data'].table_id;
//var notes_tid			=""; if($vm.module_list[prefix+'edc-notes-data']!=undefined) notes_tid=$vm.module_list[prefix+'edc-notes-data'].table_id;
var participant_pid     =""; if($vm.module_list[prefix+'participant']!=undefined) participant_pid=$vm.module_list[prefix+'participant'].table_id;
var notes_pid			=""; if($vm.module_list[prefix+'edc-notes']!=undefined) notes_pid=$vm.module_list[prefix+'edc-notes'].table_id;
//var participant_sql		="Convert(varchar,UID)+'-'+JSON_VALUE(Information,'$.Screening_ID')";
var sql_participant		="Convert(varchar,UID)+'-'+JSON_VALUE(Information,'$.Screening_ID')";
var site_sql_where		="";
//var edc_notes_module	=prefix+'edc-notes-data';
var edc_notes_module	=prefix+'edc-notes';
//-------------------------------------
_record_type="s2";
var _task_fields='';
//-------------------------------------
$('#new__ID').off('click').on('click',function(){$vm.nav_load_module(form_module,'',{goback:1})})
$('#D__ID').on('load',function(){  _set_req(); _request_data();  })
//-------------------------------------
_set_req=function(){
    if($vm.online_questionnaire===1){
        _records=[];
        return;
    }
    var participant_where="";
    var participant_uid="";
	if($vm.vm['__ID'].op.input!=undefined) participant_uid=$vm.vm['__ID'].op.input.participant_uid;
    if(participant_uid!=="" && participant_uid!==undefined){
        site_sql_where='';
        participant_where=" where uid="+participant_uid;
    }
	/*
    var sql="with notes as (select PUID,NT=S1,NC=S2,NRowNum=row_number() over (PARTITION BY PUID order by ID DESC) from [FORM-"+notes_tid+"] where ppid="+_db_pid+")";
    sql+=",participant as (select Site=S1,ParticipantUID=UID,participant_sql="+participant_sql+" from [FORM-"+participant_tid+"]"+site_sql_where+participant_where+" )";
    sql+=",task as (select ID,UID,PUID,S3,Site=participant.Site,Information,participant_sql,DateTime,Author,RowNum=row_number() over (order by ID DESC) from [FORM-"+_db_pid+"-@S1] left join participant on PUID=ParticipantUID)";
    sql+="select Information,ID,S3,UID,Site,Participant=participant_sql,DateTime,Author,RowNum,NT,NC,dirty=0, valid=1 from task left join notes on UID=notes.PUID and NRowNum=1 where RowNum between @I6 and @I7";
    var sql_n="with participant as (select Site=S1,ParticipantUID=UID from [FORM-"+participant_tid+"]"+site_sql_where+" )";
    sql_n+=" select count(ID) from [FORM-"+_db_pid+"-@S1] left join participant on PUID=ParticipantUID";
	*/
	var sql="with notes as (select PUID,NT=S1,NC=S2,NRowNum=row_number() over (PARTITION BY PUID order by ID DESC) from [FORM-"+notes_pid+"] where ppid="+_db_pid+")";
    sql+=",participant as (select Site=S1,ParticipantUID=UID,sql_participant="+sql_participant+" from [FORM-"+participant_pid+"]"+site_sql_where+participant_where+" )";
    sql+=",task as (select ID,UID,PUID,S3,Site=participant.Site,Information,sql_participant,DateTime,Author,RowNum=row_number() over (order by ID DESC) from [FORM-"+_db_pid+"-@S1] join participant on PUID=ParticipantUID)";
    sql+="select Information,ID,S3,UID,Site,Participant=sql_participant,DateTime,Author,RowNum,NT,NC,dirty=0, valid=1 from task left join notes on UID=notes.PUID and NRowNum=1 where RowNum between @I6 and @I7";
    var sql_n="with participant as (select Site=S1,ParticipantUID=UID from [FORM-"+participant_pid+"]"+site_sql_where+" )";
    sql_n+=" select count(ID) from [FORM-"+_db_pid+"-@S1] join participant on PUID=ParticipantUID";

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
var _default_cell_render=function(records,I,field,td,set_value,source){
    switch(field){
        case 'Participant':
            /*
			var sql="with tb as (select name="+participant_sql+",value2=uid from [TABLE-"+participant_tid+"])";
			sql+=" select top 10 name,value=name,value2 from tb where Name like '%'+@S1+'%' ";
			$vm.autocomplete(td,sql,function(key,value){
				records[I][key]=value;
			})
            */
            records[I].vm_custom[field]=true;
            break;
        case 'Site':
            records[I].vm_custom[field]=true;
            break;
        case '_S3':
            records[I].vm_custom[field]=true;
            td.html("<span style='color:"+records[I].S3+"'>&#x25cf;</span>");
            break;
        case '_NT':
            records[I].vm_custom[field]=true;
            if(_records[I].UID===undefined) return;
            var color=_records[I].NC;     if(color==="") color="#000000"
            var value=$vm.text(records[I].NT);  if(value==="") value='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            td.html("<u style='cursor:pointer;color:"+color+"'>"+value+"</u>");
            td.find('u').on('click',function(){
				var pid=$vm.module_list[$vm.vm['__ID'].name].table_id;
				$vm.nav_load_module(edc_notes_module,$vm.root_layout_content_slot,{record:records[I],pid:pid,task_module:$vm.vm['__ID'].name});
            });
            break;
    }
}
//-------------------------------------
var _set_status_and_participant=function(record,dbv){
    dbv.PPID=participant_tid;
	dbv.S3=$vm.status_of_data(_row_data2(record));
    if(record.Participant_uid!==undefined) dbv.PUID=record.Participant_uid;
    return true;
};
//-------------------------------------

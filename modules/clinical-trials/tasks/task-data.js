//-------------------------------------
var prefix=$vm.module_list[$vm.vm['__ID'].name].prefix; if(prefix==undefined) prefix="";
//-------------------------------------
var participant_pid=$vm.module_list[prefix+'participant-data'].table_id;
var notes_pid=$vm.module_list[prefix+'edc-notes-data'].table_id;
var participant_info=function(record){ if(record.Subject_Initials!=undefined) return record.Subject_Initials+' '+record.DOB; else return record.UID; }
//-------------------------------------
m.set_req=function(){
    var participant_where="";
    var participant_uid="";
	if($vm.vm['__ID'].input!=undefined){
        var participant_record=$vm.vm['__ID'].input.record;//participant_uid=$vm.vm['__ID'].input.participant_uid;
        if(participant_record!=undefined) participant_uid=participant_record.UID;
    }
    if(participant_uid!=="" && participant_uid!==undefined){
        participant_where=" where uid="+participant_uid;
    }
    var sql="with notes as (select PUID,NT=S1,NC=S2,NRowNum=row_number() over (PARTITION BY PUID order by ID DESC) from [FORM-"+notes_pid+"] where ppid="+m.db_pid+")";
    sql+=",participant as (select ParticipantUID=UID from [FORM-"+participant_pid+"] "+participant_where+" )";
    sql+=",task as (select ID,UID,PUID,S3,Information,DateTime,Author,RowNum=row_number() over (order by ID DESC) from [FORM-"+m.db_pid+"-@S1] join participant on PUID=ParticipantUID)";
    sql+="select ID,S3,UID,Information,DateTime,Author,RowNum,NT,NC from task left join notes on UID=notes.PUID and NRowNum=1 where RowNum between @I6 and @I7";
    var sql_n="with participant as (select ParticipantUID=UID from [FORM-"+participant_pid+"] )";
    sql_n+=" select count(ID) from [FORM-"+m.db_pid+"-@S1] join participant on PUID=ParticipantUID";

    m.req={cmd:'read',qid:m.qid,sql:sql,sql_n:sql_n,s1:'"'+$('#keyword__ID').val()+'"',I:$('#I__ID').text(),page_size:$('#page_size__ID').val()}
}
//-------------------------------------
m.set_req_export=function(i1,i2){
    m.fields_e=m.form_fields;
    var sql="with participant as (select ParticipantUID=UID from [FORM-"+participant_pid+"] )";
    sql+=",task as (select ID,UID,PUID,S3,Information,DateTime,Author from [FORM-"+m.db_pid+"-@S1])";
    sql+=",records as (select ID,ParticipantUID,Site,Information,Participant=sql_participant,DateTime,Author,RowNum=row_number() over (order by ID DESC) from participant left join task on PUID=ParticipantUID)";
	sql+=" select * from records where RowNum between @I1 and @I2";
    m.req={cmd:'read',qid:m.qid,sql:sql,i1:i1,i2:i2}
}
//-------------------------------------
m.cell_render=function(records,I,field,td,set_value,source){
    switch(field){
        case 'S3':
            records[I].vm_custom[field]=true;
            td.html("<span style='color:"+records[I][field]+"'>&#x25cf;</span>");
            break;
        case 'NT':
            records[I].vm_custom[field]=true;
            if(m.records[I].UID===undefined) return;
            var color=m.records[I].NC;     if(color==="") color="#000000"
            var value=records[I][field];  if(value==="") value='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            td.html("<u style='cursor:pointer;color:"+color+"'>"+value+"</u>");
            td.find('u').on('click',function(){
                var visit_task=$vm.module_list[$vm.vm['__ID'].name].notes;
                $vm.load_module_v2(prefix+'task-notes',$vm.root_layout_content_slot,{
                    task_record_uid:m.records[I].UID,
                    task_record_pid:_db_pid,
                    //task_name:task_name,
                    Visit_Task:visit_task,
                    Participant:m.records[I].Participant,
                    Participant_uid:m.records[I].Participant_uid,
                    sql_where:" PPID="+_db_pid+ "and PUID="+m.records[I].UID,
                });
            });
            break;
    }
}
//-------------------------------------
m.before_submit=function(record,dbv){
    dbv.PPID=participant_tid;
	dbv.S3=$vm.status_of_data(m.row_data(record));
    if(record.Participant_uid!==undefined) dbv.PUID=record.Participant_uid;
    return true;
}
//-------------------------------------
m.new_pre_data_process=function(){
    var input=$vm.vm['__ID'].input;
    if(input!=undefined && input.record!=undefined){
        m.records[0].Participant_uid=input.record.UID;
        m.records[0].Participant=participant_info(input.record);
    }
}
//-------------------------------------

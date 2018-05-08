$('#back__ID').hide();
//-------------------------------------
var prefix=$vm.module_list[$vm.vm['__ID'].name].prefix; if(prefix==undefined) prefix="";
var sql_participant="@('Initials')+' '+@('DOB')";
var participant_tid	=$vm.module_list[prefix+'participant'].table_id;
//-------------------------------------
$('#Participant__ID').autocomplete({
    minLength:0,
    source:function(request,response){
        var sql="with tb as (select name="+sql_participant+",value2=UID,value3=S1 from [FORM-"+participant_tid+"])";
        sql+=" select top 10 name,value=name,value2,value3 from tb where Name like '%'+@S1+'%' ";
        $VmAPI.request({data:{cmd:'auto',s1:request.term,sql:sql,minLength:0},callback:function(res){
            response($vm.autocomplete_list(res.table));
        }});
    },
    select: function(event,ui){
        $('#Participant_uid__ID').val(ui.item.value2);
        $('#save__ID').css('background','#E00');
    }
})
$('#Participant__ID').focus(function(){$('#Participant__ID').autocomplete("search","");});
$('#Participant_r__ID').on('click',function(){$('#Participant__ID').val('');$('#Participant_uid__ID').val('');})
//-------------------------------------
var _task_fields;
//-------------------------------------
var _set_participant_field=function(){
	$('#tr_participant__ID').show();
	if($vm.online_questionnaire===1){
		$('#tr_participant__ID').hide();
	}
}
//-------------------------------------

var fields="Record_ID,Date,Name,Description,Amount,Additional_Info,Notes,Link,Document";
_fields="_Form,"+fields+",Submit Date|DateTime,Submitted by|Author,_Delete";
//-------------------------------------
var prefix=_mlist[$vm.vm['__ID'].name].prefix;
var predefined_transaction_item_tid=_mlist[prefix+'predefined_transaction_item'].table_id;
//-------------------------------------
var this_module=$vm.module_list[$vm.vm['__ID'].name];
var prefix=this_module.prefix; if(prefix==undefined) prefix="";
var form_module=prefix+this_module.form_module;
$('#new__ID').off('click').on('click',function(){$vm.load_module_v2(form_module,'',{goback:1})})
//-------------------------------------
$('#name__ID').autocomplete({
    minLength:0,
    source:function(request,response){
        var sql="with tb as (select name=@('Name') from [FORM-"+predefined_transaction_item_tid+"])";
        sql+=" select top 10 name,value=name from tb where name like '%'+@S1+'%' ";
        $VmAPI.request({data:{cmd:'auto',s1:request.term,sql:sql,minLength:0},callback:function(res){
            response($vm.autocomplete_list(res.table));
        }});
    },
})
$('#name__ID').focus(function(){$('#name__ID').autocomplete("search","");});
//-------------------------------------
_cell_render=function(records,I,field,td,set_value,source){
    switch(field){
        case 'Record_ID':
            records[I].vm_readonly[field]=true;
            td.text(records[I].UID);
            break;
        case 'Date':
            VmInclude:__PARTS__/grid/field_date.js
            break;
        case 'Name':
            var sql="with tb as (select name=@('Name') from [FORM-"+predefined_transaction_item_tid+"])";
            sql+=" select top 10 name,value=name from tb where name like '%'+@S1+'%' ";
            VmInclude:__PARTS__/grid/field_auto.js
            break;
        case 'Amount':
            if(source=="grid") td.css("text-align","right").css('white-space','nowrap');
            break;
        case 'Document':
            VmInclude:__PARTS__/grid/field_file.js
            break;
    }
}
//-------------------------------------
_before_submit=function(record,dbv){
    dbv.DT1=record.Date;
    dbv.S1=record.Name;
    dbv.V1='0'; if(record.Amount!=='') dbv.V1=record.Amount;
    return true;
};
//-------------------------------------
$('#D__ID').on('load',function(){  _set_req(); _request_data();  })
//-------------------------------------
//convert the existed date to the new standard format
_data_process=function(){
    for(var i=0;i<_records.length;i++){
        _records[i].Date=$vm.au_date_to_string_yyyymmdd(_records[i].Date);
        _records[i].Date_of_Payment=$vm.au_date_to_string_yyyymmdd(_records[i].Date_of_Payment);
    }
}
//-------------------------------------

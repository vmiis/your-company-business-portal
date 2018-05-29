var fields="Date,Name,Description,Transaction Type|I2_IE,Tax|I2_Tax_Rate,Item of Tax Return|I2_Tax_Return,Accounting Code|I2_Accounting_Code,Amount";
_fields="_Form,"+fields;
//-------------------------------------
var prefix=_mlist[$vm.vm['__ID'].name].prefix;
var predefined_transaction_item_tid=_mlist[prefix+'predefined_transaction_item'].table_id;
//-------------------------------------
$('#name__ID').autocomplete({
    minLength:0,
    source:function(request,response){
        var sql="with tb as (select name=S1 from [TABLE-"+predefined_transaction_item_tid+"])";
        sql+=" select top 10 name,value=name from tb where name like '%'+@S1+'%' ";
        $VmAPI.request({data:{cmd:'auto',s1:request.term,sql:sql,minLength:0},callback:function(res){
            response($vm.autocomplete_list(res.table));
        }});
    },
})
$('#name__ID').focus(function(){$('#name__ID').autocomplete("search","");});
//-------------------------------------
$('#type__ID').autocomplete({
    minLength:0,
    source:function(request,response){
        var sql="with tb as (select distinct name=S2 from [TABLE-"+predefined_transaction_item_tid+"])";
        sql+=" select top 10 name,value=name from tb where name like '%'+@S1+'%' ";
        $VmAPI.request({data:{cmd:'auto',s1:request.term,sql:sql,minLength:0},callback:function(res){
            response($vm.autocomplete_list(res.table));
        }});
    },
})
$('#type__ID').focus(function(){$('#type__ID').autocomplete("search","");});
//-------------------------------------
$('#D__ID').on('load',function(){  _set_req(); _request_data();  })
//-------------------------------------
_cell_render=function(records,I,field,td,set_value,source){
    switch(field){
        case 'Amount':
            if(source=="grid") td.css("text-align","right").css('white-space','nowrap');
            td.text(parseFloat(records[I][field]).toFixed(2));
            break;
    }
}
//-------------------------------------

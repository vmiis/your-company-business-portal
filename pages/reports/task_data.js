//-------------------------------------
var this_module=$vm.module_list[$vm.vm['__ID'].name];
var prefix=this_module.prefix; if(prefix==undefined) prefix="";
var form_module=prefix+this_module.form_module;
//-------------------------------------
$('#new__ID').off('click').on('click',function(){$vm.load_module_v2(form_module,'',{goback:1})})
//-------------------------------------
$('#D__ID').on('load',function(){  _set_req(); _request_data(); })
//-------------------------------------



//-------------------------------------
//The following code is use to pick up a part of records in a table
//-------------------------------------
var v3=$vm.module_list[$vm.vm['__ID'].name].v3;
if(v3!=undefined){
    //-------------------------------------
    _before_submit=function(record,dbv){
        dbv.V3=v3;
        if(typeof(before_submit)!='undefined') before_submit(record,dbv);
    };
    //-------------------------------------
    _set_req=function(){
        var sql="with tb as (select Information,ID,UID,PUID,DateTime,Author,RowNum=row_number() over (order by ID DESC) from [TABLE-"+_db_pid+"-@S1] where V3="+v3+")";
        sql+="select Information,ID,UID,PUID,DateTime,Author,RowNum from tb where RowNum between @I6 and @I7";
        var sql_n="select count(ID) from [TABLE-"+_db_pid+"-@S1] where V3="+v3;
        _req={cmd:'query_records',db_pid:_db_pid,sql:sql,sql_n:sql_n,s1:'"'+$('#keyword__ID').val()+'"',I:$('#I__ID').text(),page_size:$('#page_size__ID').val()}
    }
    //-------------------------------------
    _set_req_export=function(i1,i2){
        var sql="with tb as (select Information,DateTime,Author,RowNum=row_number() over (order by ID DESC) from [TABLE-"+_db_pid+"-@S1] where V3="+v3+" )";
        sql+="select Information,DateTime,Author from tb where RowNum between @I1 and @I2";
        _req={cmd:'query_records',sql:sql,i1:i1,i2:i2};
    }
    //-----------------------------------------------
}
else{
    _before_submit=function(record,dbv){
        if(typeof(before_submit)!='undefined') before_submit(record,dbv);
    };
}
//-------------------------------------

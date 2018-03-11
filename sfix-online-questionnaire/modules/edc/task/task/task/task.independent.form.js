var db_pid=$vm.module_list[$vm.vm["__ID"].name].table_id;
var _before_submit="";
//--------------------------------------------------------
$('#D__ID').on('load',function(){
    $("#F__ID")[0].reset();
})
//--------------------------------------------------------
var N1,N2;
$('#F__ID').submit(function(event){
    //--------------------------------------------------------
    event.preventDefault();
    //--------------------------------------------------------
	N1=0;N2=0;
	var data={}; var a=$("#F__ID").serializeArray(); $.each(a, function () { N2=1; if(this.value=='') N1++; data[this.name]=this.value || '';});
	if($vm.vm['__ID'].op.input.participant_uid!==undefined) data.Participant_uid=$vm.vm['__ID'].op.input.participant_uid;
	var dbv={}
	set_status_and_participant(data,dbv)
	var r=true;	if(_before_submit!='') r=_before_submit(data,dbv);
	if(r==true){
	    //--------------------------------------------------------
		var req={cmd:"add_json_record_s2",db_pid:db_pid,data:data,dbv:dbv};
	    $VmAPI.request({data:req,callback:function(res){
	        if(res.ret<=0)	alert("Sorry there is a problem. You can try again later.")
	        else{
	            //$vm.alert('Your data has been successfully submitted')
	            window.history.back(-1);
	        }
	    }});
	    //--------------------------------------------------------
	}
})
//--------------------------------------------------------
var set_status_and_participant=function(record,dbv){
    if(N2==0) 		    dbv.S3='#FF0000';
    else if(N1==0)  	dbv.S3='#00FF00';
    else 			    dbv.S3='#FFCC00';
    if(record.Participant_uid!==undefined) dbv.PUID=record.Participant_uid;
    return true;
};
//--------------------------------------------------------

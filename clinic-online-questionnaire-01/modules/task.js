//--------------------------------------------------------
var _before_submit_form='';
//--------------------------------------------------------
var db_pid=$vm.module_list[$vm.vm["__ID"].name].table_id;
var rid;
//--------------------------------------------------------
$('#D__ID').on('load',function(){
	$("#F__ID")[0].reset();
	$('#submit__ID').hide();
	load_data();
})
//--------------------------------------------------------
var load_data=function(){
	rid='';
	var req={cmd:"query_records_s2",db_pid:db_pid,fields:"ID,Information"};
	$VmAPI.request({data:req,callback:function(res){
		if(res.records.length==1){
			rid=res.records[0].ID;
			$.each(res.records[0], function(name, value){
				var $el = $('#F__ID *[name='+name+']');
				var type = $el.attr('type');
				switch(type){
					case 'checkbox':
						if(value!='off') $el.attr('checked', true);
						else $el.attr('checked', false);
						break;
					case 'radio':
						$('input[name="' + name+ '"][value="' + value + '"]').prop('checked', true);
						break;
					default:
						$el.val(value);
				}
			});
		}
		$('#submit__ID').show();
	}});
}
//--------------------------------------------------------
$('#F__ID').submit(function(event){
	//--------------------------------------------------------
	event.preventDefault();
	$('#submit__ID').hide();
	//--------------------------------------------------------
	if(_before_submit_form!==''){
		_before_submit_form();
	}
	//--------------------------------------------------------
	var data={}; var a=$("#F__ID").serializeArray(); $.each(a, function () { data[this.name]=this.value || '';});
	var dbv={
		S1:'clinic-online-questionnaire-01'
	}
	//--------------------------------------------------------
	var req={cmd:"add_json_record_s2",db_pid:db_pid,data:data,dbv:dbv};
	if(rid!='') req={cmd:"modify_json_record_s2",rid:rid,db_pid:db_pid,data:data,dbv:dbv};
	$VmAPI.request({data:req,callback:function(res){
		if(res.ret<=0)	alert("Sorry there is a problem. You can try again later.")
		else{
			$vm.alert('Your data has been successfully submitted')
			window.history.back(-1);
		}
	}});
	//--------------------------------------------------------
})
//--------------------------------------------------------



/*
var rid,pid;
var alert_validation="";
$('#D__ID').on('load',function(){
	$("#F__ID")[0].reset();
    rid=$vm.vm['__ID'].op.sys.config.rid;
    db_pid=$vm.vm['__ID'].op.sys.config.db_pid;
	//if(_any_change!=='') _any_change();
    if(rid!=undefined && rid!=''){
        $VmAPI.request({data:{cmd:'read_record_s2',rid:rid,db_pid:db_pid},callback:function(res){
            if(res.records.length==1){
                $.each(res.records[0], function(name, value){
                    //var $el = $('#'+name+'__ID');
					var $el = $('#F__ID *[name='+name+']');
                    var type = $el.attr('type');
                    switch(type){
						case 'checkbox':
							if(value!='off') $el.attr('checked', true);
							else $el.attr('checked', false);
                            break;
                        case 'radio':
							$('input[name="' + name+ '"][value="' + value + '"]').prop('checked', true);
                            break;
                        default:
                            $el.val(value);
                    }
                });
            }
        }})
    }
})
$('#F__ID').submit(function(event){
	event.preventDefault();
	if(alert_validation!="") {$vm.alert(alert_validation); return false;}
	var module_name=$vm.vm["__ID"].name;
	var db_pid=$vm.module_list[module_name].table_id
	if(module_name=='panel_first_epworth-sleepiness-scale'){
		$('#ESS__ID').val(parseInt($('#ESS_1__ID:checked').val())+parseInt($('#ESS_2__ID:checked').val())+parseInt($('#ESS_3__ID:checked').val())+parseInt($('#ESS_4__ID:checked').val())+parseInt($('#ESS_5__ID:checked').val())+parseInt($('#ESS_6__ID:checked').val())+parseInt($('#ESS_7__ID:checked').val())+parseInt($('#ESS_8__ID:checked').val()))
	}
	var data={};
	var a=$("#F__ID").serializeArray(); $.each(a, function () {	data[this.name]=this.value || '';});
	$("#F__ID input:checkbox:not(:checked)").each(function(){
		data[this.name]="off";
	})
alert(JSON.stringify(a))
return;
	data.Participant=$vm.coq_participant;
	data.Participant_uid=$vm.coq_participant_uid;
	var dbv={
		S1:$vm.coq_visit,
		PPID:$vm.coq_participant_pid,
		PUID:$vm.coq_participant_uid,
	}
	//-------------------------------------
    if(rid=='' || rid=='0' || rid==undefined){
    	var req={cmd:"add_json_record_s2",db_pid:db_pid,data:data,dbv:dbv};
    	$VmAPI.request({data:req,callback:function(res){
    		if(res.ret<=0)	alert("Sorry there is a problem. You can try again later or wait until you are at Woolcock.")
    		else{
    			if($vm.module_list[module_name].alert=="1"){
    				$vm.alert('Your data has been successfully submitted')
    			}
    			window.history.back(-1);
    		}
    	}});
    }
    else{
        var req={cmd:"modify_json_record_s2",rid:rid,db_pid:db_pid,data:data,dbv:dbv};
    	$VmAPI.request({data:req,callback:function(res){
    		if(res.ret<=0)	alert("Sorry there is a problem. You can try again later or wait until you are at Woolcock.")
    		else{
    			if($vm.module_list[module_name].alert=="1"){
    				$vm.alert('Your data has been successfully submitted')
    			}
    			window.history.back(-1);
    		}
    	}});
    }
	//-------------------------------------

});
*/

//------------------------
//number dropdown
var $List2=$('#YY__ID');
var y=new Date().getFullYear();
for(var i=0;i<7;i++){
    $List2.append(  $('<option></option>').val(y-i).html(y-i)  );
}
$List2.val(y);
//---------------------------------------------
_fields="Item,Total,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec";
//-------------------------------------
$('#aquery__ID').on('click',function(){_set_req(); _request_data();})
//-------------------------------------
var data_process=function(data_records){
    var results={}
    for(var i=0;i<data_records.length;i++){
        var month=data_records[i].V2;
        for(var item in data_records[i]){
            if(item!='V2'){
                if(results[item]==undefined){
                    results[item]={}
                }
                switch(month){
                    case '1': results[item].M1=data_records[i][item]; break;
                    case '2': results[item].M2=data_records[i][item]; break;
                    case '3': results[item].M3=data_records[i][item]; break;
                    case '4': results[item].M4=data_records[i][item]; break;
                    case '5': results[item].M5=data_records[i][item]; break;
                    case '6': results[item].M6=data_records[i][item]; break;
                    case '7': results[item].M7=data_records[i][item]; break;
                    case '8': results[item].M8=data_records[i][item]; break;
                    case '9': results[item].M9=data_records[i][item]; break;
                    case '10': results[item].M10=data_records[i][item]; break;
                    case '11': results[item].M11=data_records[i][item]; break;
                    case '12': results[item].M12=data_records[i][item]; break;
                }
            }
        }
    }
    var r=[];
    for(var p in results){
        if(p.substring(0,2)==report_type){
            var record={}
            record.Item=p.substring(2).replace(/_1_1_1_/g,'/').replace(/_/g,' ');
            record.Total=0;
            record.Jan=''; if(results[p].M1!=undefined){ record.Jan=parseFloat(results[p].M1).toFixed(2); record.Total+=parseFloat(results[p].M1);}
            record.Feb=''; if(results[p].M2!=undefined){ record.Feb=parseFloat(results[p].M2).toFixed(2); record.Total+=parseFloat(results[p].M2);}
            record.Mar=''; if(results[p].M3!=undefined){ record.Mar=parseFloat(results[p].M3).toFixed(2); record.Total+=parseFloat(results[p].M3);}
            record.Apr=''; if(results[p].M4!=undefined){ record.Apr=parseFloat(results[p].M4).toFixed(2); record.Total+=parseFloat(results[p].M4);}
            record.May=''; if(results[p].M5!=undefined){ record.May=parseFloat(results[p].M5).toFixed(2); record.Total+=parseFloat(results[p].M5);}
            record.Jun=''; if(results[p].M6!=undefined){ record.Jun=parseFloat(results[p].M6).toFixed(2); record.Total+=parseFloat(results[p].M6);}
            record.Jul=''; if(results[p].M7!=undefined){ record.Jul=parseFloat(results[p].M7).toFixed(2); record.Total+=parseFloat(results[p].M7);}
            record.Aug=''; if(results[p].M8!=undefined){ record.Aug=parseFloat(results[p].M8).toFixed(2); record.Total+=parseFloat(results[p].M8);}
            record.Sep=''; if(results[p].M9!=undefined){ record.Sep=parseFloat(results[p].M9).toFixed(2); record.Total+=parseFloat(results[p].M9);}
            record.Oct=''; if(results[p].M10!=undefined){ record.Oct=parseFloat(results[p].M10).toFixed(2); record.Total+=parseFloat(results[p].M10);}
            record.Nov=''; if(results[p].M11!=undefined){ record.Nov=parseFloat(results[p].M11).toFixed(2); record.Total+=parseFloat(results[p].M11);}
            record.Dec=''; if(results[p].M12!=undefined){ record.Dec=parseFloat(results[p].M12).toFixed(2); record.Total+=parseFloat(results[p].M12);}
            record.Total=record.Total.toFixed(2);
            r.push(record);
        }
    }
    var record={}
    record.Item='Total';
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Total!='') a+=parseFloat(r[i].Total); record.Total=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Jan!='') a+=parseFloat(r[i].Jan); record.Jan=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Feb!='') a+=parseFloat(r[i].Feb); record.Feb=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Mar!='') a+=parseFloat(r[i].Mar); record.Mar=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Apr!='') a+=parseFloat(r[i].Apr); record.Apr=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].May!='') a+=parseFloat(r[i].May); record.May=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Jun!='') a+=parseFloat(r[i].Jun); record.Jun=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Jul!='') a+=parseFloat(r[i].Jul); record.Jul=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Aug!='') a+=parseFloat(r[i].Aug); record.Aug=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Sep!='') a+=parseFloat(r[i].Sep); record.Sep=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Oct!='') a+=parseFloat(r[i].Oct); record.Oct=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Nov!='') a+=parseFloat(r[i].Nov); record.Nov=a.toFixed(2);
    var a=0; for(var i=0;i<r.length;i++)  if(r[i].Dec!='') a+=parseFloat(r[i].Dec); record.Dec=a.toFixed(2);

    r.sort(function(a,b) {
        if (a.Item < b.Item)
          return -1;
        if (a.Item > b.Item)
          return 1;
        return 0;
    })
    r.push(record);
    return r;
}
//-------------------------------------
_data_process=function(){
    var r=_records;
    _records=data_process(r);
    chart(_records);
    /*
    $vm.alert('Working hard...');
    var r=_records;
    _records=data_process(r);
    chart(_records);
    setTimeout(function(){
        $vm.close_alert();
    }, 500);
    */
}
//-------------------------------------
var selected_item='';
_set_req=_set_req_export=function(){
    selected_item=$('#item__ID').val();
    var sql="select V2,Information from [TABLE-"+_db_pid+"] where V1=@I1 ";
    _req={cmd:'query_records',sql:sql,i1:$('#YY__ID').val()}
}
//-------------------------------------
var _request_data_export=function(){
    $VmAPI.request({data:_req,callback:function(res){
        _records=data_process(res.records);
        _export_data(_filename);
    }})
}
//-------------------------------------
var chart=function(records){
    //------------------------
    //number dropdown
    var $List=$('#item__ID');
    $List.html('');
    for(var i=0;i<_records.length;i++){
        var v=records[i].Item;
        $List.append(  $('<option></option>').val(v).html(v)  );
    }
    if(selected_item==null){
        selected_item="Total";
    }
    $List.val(selected_item);
    //---------------------------------------------
    $('#chart__ID').html('');
    var top1=$('#chart__ID').offset().top;
    $('#chart__ID').css("height",($(window).height()-top1-30)+'px');

    var d=[["Month","Amount",{ role: "tooltip" }]];
    for(var i=0;i<_records.length;i++){
        var v=records[i].Item;
        if(v==selected_item){
            d.push(['Jan',parseFloat(records[i].Jan),records[i].Jan])
            d.push(['Feb',parseFloat(records[i].Feb),records[i].Feb])
            d.push(['Mar',parseFloat(records[i].Mar),records[i].Mar])
            d.push(['Apr',parseFloat(records[i].Apr),records[i].Apr])
            d.push(['May',parseFloat(records[i].May),records[i].May])
            d.push(['Jun',parseFloat(records[i].Jun),records[i].Jun])
            d.push(['Jul',parseFloat(records[i].Jul),records[i].Jul])
            d.push(['Aug',parseFloat(records[i].Aug),records[i].Aug])
            d.push(['Sep',parseFloat(records[i].Sep),records[i].Sep])
            d.push(['Oct',parseFloat(records[i].Oct),records[i].Oct])
            d.push(['Nov',parseFloat(records[i].Nov),records[i].Nov])
            d.push(['Dec',parseFloat(records[i].Dec),records[i].Dec])
        }
    }
    var data = google.visualization.arrayToDataTable(d);
    var view = new google.visualization.DataView(data);
    var options = {
        title: selected_item,
        titleFontSize: 20,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
        hAxis: {
            //title: 'Month',
            //format: '0.00',
        },
        vAxis: {
            title: 'Amount',
            minValue:0,
            format: '0.00',
        }
    };
    var c= new google.visualization.ColumnChart(document.getElementById("chart__ID"));
    c.draw(view, options);
}

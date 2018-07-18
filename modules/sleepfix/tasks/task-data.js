//-------------------------------------
m.before_submit=function(record,dbv){
   var r=true; if(m.before_submit_2!=undefined) r=m.before_submit_2(record,dbv); if(r==false) { return false; }
   if(record.Participant_uid!=""){
       dbv.PUID=record.Participant_uid;
       dbv.S3=$vm.status_of_data(record);
   }
   return r;
};
//-------------------------------------

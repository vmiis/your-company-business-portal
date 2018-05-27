$('#toolbar__ID').on('dblclick',function(){
	var txt="";
	var flds=_fields.replace('_Form,','').replace(',Submit Date|DateTime,Submitted by|Author,_Delete','');
	var A=[],B=[];
	var s=flds.split(',');
	for(var i=0;i<s.length;i++){
		var L=s[i].split('|')[0].replace(/_/g,' ');
		var N=s[i].split('|').pop();
		txt+="<div class='row row__"+"ID'>\r\n";
		txt+="\t<div class=col>\r\n";
		txt+="\t\t<span>"+L+"</span>\r\n";
		txt+="\t\t<input type=text class=form-control name="+N+">\r\n";
		txt+="\t</div>\r\n";
		txt+="</div>\r\n";
	}
	$vm.view_code(txt,"Form")
})
//-------------------------------------

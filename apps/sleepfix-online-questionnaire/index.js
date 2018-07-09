//------------------------------------
$vm.module_links=[
    "index.json"
];
$vm.module_list={
    "Home":     {"url":"modules/home.html"}
}
//------------------------------------
$vm.app_config={
    "api_path_development":"https://cbs.wappsystem.com/dev/",
    "api_path_production":"https://cbs.wappsystem.com/pro/",
    "default_production":"No",
}
//------------------------------------
$vm.qid='20011572';
$vm.website_module_list_for_search=[];
//------------------------------------
$vm.app_init=function(callback){
    console.log((new Date().getTime()-$vm.start_time).toString()+"---"+"********************* start running init ************************");
    //--------------------------------------------------------
    //check and clear localstorage
    var data=''; for(var key in window.localStorage){ if(window.localStorage.hasOwnProperty(key)){ data+=window.localStorage[key]; }}
    if(data.length>3000000) localStorage.clear();
    if(window.location.href.indexOf('?clearcache=1')!=-1){
        localStorage.clear();
        alert("Cache is cleard!");
        return;
    }
    $VmAPI={};
    //--------------------------------------------------------
    //get hosting path
    var href = window.location.href.split('?')[0];
    var path=href.split('/index.html')[0];
    var lastChar=path[path.length-1];
    if(lastChar=='/') path=path.substring(0,path.length-1);
    $vm.hosting_path=path;
    if(window.location.hostname=='127.0.0.1' || window.location.hostname=='localhost') $vm.localhost=true;
    //--------------------------------------------------------
    $vm.reload='';
    if(window.location.toString().indexOf('_d=3')!=-1){
        $vm.reload=new Date().getTime().toString();
    }
    $vm.version=$vm.ver[0];
    //--------------------------------------------------------
    $vm.parts_path="https://vmiis.github.io/component";
    if(window.location.hostname=='127.0.0.1' || window.location.hostname=='localhost'){
        $vm.library_path =window.location.protocol+'//'+window.location.host;
    }
    //--------------------------------------------------------
    if($vm.app_config.default_production=='No'){
        if(window.location.toString().indexOf('database=production')!=-1){
            $vm.server          ='production';
            $VmAPI.api_base     =$vm.app_config.api_path_production;
        }
        else if(window.location.toString().indexOf('database=woolcock')!=-1){
            $vm.server          ='production';
            $VmAPI.api_base     =$vm.app_config.api_path_woolcock;
        }
        else{
            $vm.server          ='development';
            $VmAPI.api_base     =$vm.app_config.api_path_development;
        }
    }
    else {
        if(window.location.toString().indexOf('database=development')!=-1){
            $vm.server          ='development';
            $VmAPI.api_base     =$vm.app_config.api_path_development;
        }
        else{
            $vm.server          ='production';
            $VmAPI.api_base     =$vm.app_config.api_path_production;
        }
    }
    $vm.debug_message=true; //show debug message in console
    //--------------------------------------------------------
    //load vm framework, vm api and first module
    var load_vmapi   =function(){ load_js($vm.url('https://api.vmiis.com/distribution/vmapi.min.js'),load_vm);	}
    var load_vm      =function(){ load_js($vm.url('https://framework.vmiis.com/distribution/vmframework.min.js'),init);}
    var init         =function(){
         $vm.init_v3({callback:function(){
            $vm.init_status=1;
            $vm._id=0;
            callback();
        }})
    }
    //--------------------------------------------------------
    var load_js=function(url,next){
        //this is js loader
        var ver=localStorage.getItem(url+"_ver");
        var txt=localStorage.getItem(url+"_txt");
        //------------------------------------------
        if(ver!=$vm.ver[1] || txt===null || $vm.localhost==true){
            console.log('loading from url. '+url)
            $.get(url+'?_='+$vm.reload,function(data){
                localStorage.setItem(url+"_txt",data);
                localStorage.setItem(url+"_ver",$vm.ver[1]);
                $('head').append('<scr'+'ipt>'+data+'</scr'+'ipt>');
                next();
            },'text');
        }
        else{
            console.log('loading from stotage. '+url)
            $('head').append('<scr'+'ipt>'+txt+'</scr'+'ipt>'); next();
        }
        //------------------------------------------
    }
    //--------------------------------------------------------
    $vm.url=function(text){
        //replace some text in old modules to the correct ones
		text=text.replace(/__HOST__\//g,$vm.hosting_path+'/');
		text=text.replace(/__VER__/g,$vm.ver[0]);
		text=text.replace(/__BASE__\/vmiis\/Common-Code\//g,'__COMPONENT__/');
		text=text.replace(/__LIB__\/vmiis\/Common-Code\//g,'__COMPONENT__/');
		text=text.replace(/__BASE__\/vmiis\/common-code\//g,'__COMPONENT__/');
		text=text.replace(/__LIB__\/vmiis\/common-code\//g,'__COMPONENT__/');
        text=text.replace(/__PARTS__\//g,'__COMPONENT__/');
		text=text.replace(/__COMPONENT__\//g,'https://component.vmiis.com/');

		if(window.location.toString().indexOf('_d=1')!=-1){
			//use local system files
            var host=window.location.protocol+'//'+window.location.host;
			text=text.replace(/https:\/\/api.vmiis.com/g,host+'/vmiis/api-2');
			text=text.replace(/https:\/\/framework.vmiis.com/g,host+'/vmiis/framework-2');
			text=text.replace(/https:\/\/component.vmiis.com/g,host+'/vmiis/component-2');
		}
		return text;
	}
	//--------------------------------------------------------
    load_vmapi();
    //------------------------------------
}
//------------------------------------
$vm.app_init(function(){
    //-----------------------------------------
    window.onmessage=function(e){
        if(e.data.username!=undefined && e.data.user_id!=undefined){
            $vm.user=e.data.username;
            $vm.user_id=e.data.user_id;
            $VmAPI.set_token(e.data.token,e.data.api_url,e.data.username,e.data.user_id,e.data.nickname);
            location.reload(true);
        }
    };
    //-----------------------------------------
    var resources=[
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
      "https://ajax.aspnetcdn.com/ajax/jquery.ui/1.12.1/themes/redmond/jquery-ui.css",

      "https://unpkg.com/react@16/umd/react.production.min.js",
      "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js",
      "https://ajax.aspnetcdn.com/ajax/jquery.ui/1.12.1/jquery-ui.min.js",
      "https://apis.google.com/js/plusone.js",
      "https://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js",
      "https://sdk.amazonaws.com/js/aws-sdk-2.1.34.min.js",
      "https://www.gstatic.com/charts/loader.js"
    ];
    //------------------------------------
    var load_resources=function(links){
      for(i in links){
        var e=links[i].split('.').pop();
        if(e=='css'){
          $('head').append("<link rel='stylesheet' href='"+links[i]+"'>");
        }
        else if(e=='js'){
          load_js_link(links[i])
        }
      }
      var load_system_modules=function(){
          //-------------------------------------
          $vm.module_list['_system_export_dialog_module']={table_id:'',url:'__COMPONENT__/dialog/export_dialog_module.html',"name_for_search":""};
          $vm.load_module_v2('_system_export_dialog_module','hidden',{})
          //-------------------------------------
          $vm.module_list['_system_import_dialog_module']={table_id:'',url:'__COMPONENT__/dialog/import_dialog_module.html',"name_for_search":""};
          $vm.load_module_v2('_system_import_dialog_module','hidden',{})
          //-------------------------------------
          $vm.module_list['uploading_file_dialog_module']={table_id:'',url:'__COMPONENT__/dialog/uploading_file_dialog_module.html',"name_for_search":""};
          $vm.load_module_v2('uploading_file_dialog_module','hidden',{})
          //-------------------------------------
      }
      var load_hot_modules=function(){
          //pre load into memory, for fast showing on screen
          //-------------------------------------
          var nm=[];
          for(var k in $vm.module_list){
              if($vm.module_list[k].preload!=undefined) nm.push(k);
          }
          var i=0
          var N=nm.length;
          if(N>0){
              var load_module_loop=setInterval(function (){
                  if(i>=N){
                      clearInterval(load_module_loop);
                      return;
                  }
                  $vm.load_module_v2(nm[i],'hidden',{})
                  i++;
              },100);
          }
      }
      //------------------------------------
      load_system_modules();
      load_hot_modules();
    }
    //------------------------------------
    var load_js_link=function(link){
      $.getScript(link,function(){
        var nm=link.split('/').pop();
        nm=nm.replace(/\./g,'-');
        $vm[nm]=1;
        if(nm=='loader-js'){
          google.charts.load('current', {packages: ['corechart']});
        }
      });
    }
    //------------------------------------
    var over_write_alert=function(){
      $vm.alert=function(msg){
        $('#vm_alert_information div.modal-body').html( $('<div/>').html(msg).text() );
        $("#vm_alert_information").modal();
      }
      $vm.close_alert=function(){
        $('#vm_alert_information').modal('hide');
      }
    }
    //------------------------------------
    var load_search_module=function(){
        var a=window.location.href.split('page=');
        if(a.length==2){
            var name=a[1].split('&')[0];
            if(name.length>0){
                if($vm.module_list[name]!=undefined){
                    $vm.load_module_v2(name,'',{});
                    return;
                }
                else alert("The module "+name+" is not in the module list!");
            }
            else alert("The module "+name+" is not correct!");
        }
    }
    //------------------------------------
    var set_module_search=function(){
        var search_loop=setInterval(function (){
			if($vm['jquery-ui-min-js']==1){
				clearInterval(search_loop);
                $("#vm_system_search").autocomplete({
                    minLength:0,
                    source: function(request, response) {
                        var results=$.ui.autocomplete.filter($vm.website_module_list_for_search, request.term);
                        response(results.slice(0, 10));
                    },
                    select: function(event,ui) {
                        event.preventDefault();
                        $('.navbar-collapse').collapse('hide');
                        $("#vm_system_search").val('');
                        $("#vm_system_search").blur();
                        $('.ui-helper-hidden-accessible').html('');
                        $vm.load_module_v2(ui.item.value,'',{});
                    },
                    position: {  collision: "flip"  }
                });
                $("#vm_system_search").focus(function(){$("#vm_system_search").autocomplete("search","");});
				console.log((new Date().getTime()-$vm.start_time).toString()+"---"+"********************* search is ready ************************");
			}
		},100);
		//------------------------------------
    }
    //------------------------------------
    var loading_back_image=function(){
        //This is the place we can add background image to body (Asynchronous)
        var $image1 = $("<img>");
        $image1.on('load',(function(){
            $('body').css("background", "url("+$(this).attr("src")+") no-repeat bottom center"); $('body').css("background-size", "cover");
            console.log((new Date().getTime()-$vm.start_time).toString()+"---"+"********************* background image is ready ************************");
        }));
        $image1.attr("src", "layout.jpg");
    }
    //------------------------------------
    var module_links=function(){
        var rm=$vm.module_links;
        var i=0
        var N=rm.length;
        var process=function(I,prefix,nm){
            $.get(nm+'?_='+$vm.ver[0]+$vm.reload,function(txt){
                var config;	try{ config=JSON.parse(txt);} catch (e){ alert("Error in config file\n"+e); return; }
                var modules=config.modules;
                var path=nm.replace('index.json','');
                for (var k in modules){
                    modules[k].url=path+modules[k].url;
                    $vm.module_list[prefix+k]=modules[k];
                    $vm.module_list[prefix+k].prefix=prefix;
                    var snm=modules[k]['name_for_search'];
                    if(snm!=""){
                        if(snm==undefined) snm=prefix+k;
                        $vm.website_module_list_for_search.push({label:snm,value:prefix+k})
                    }
                }
                if(I==N-1){ //all module's link are ready
                    if($vm.home_process!=undefined) $vm.home_process();
                    else load_search_module();
                }
            },'text');
        }
        if(N>0){
            var link_remote_module_loop=setInterval(function (){
                if(i>=N){
                    clearInterval(link_remote_module_loop);
                    //load_search_module();
                    return;
                }
                var ns=rm[i].split('|');
                if(ns.length==1) process(i,"",ns[0])
                else process(i,ns[0]+"_",ns[1]);
                i++;
            },10);
        }
    }
    //------------------------------------
    $vm.layout();
    $vm.top_right_corner();
    $vm.header();
    $vm.footer();
    $('#vm_system_info').text((new Date().getTime()-$vm.start_time).toString()+"ms")
    $vm.load_module_v2("Home",'',{});
    setTimeout(function (){	$.ajaxSetup({cache:true}); load_resources(resources); },10);
    loading_back_image();
    over_write_alert();
    set_module_search();
    module_links();
})
//------------------------------------

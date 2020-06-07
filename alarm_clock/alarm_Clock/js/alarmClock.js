function alarmClock(){
	var actual_JSON;
	var alarmData;
	var currScreen = "screen_1";
	var saveMode = "";
	var currentAlarm;
	var playAlarmNo;
	this.init = function(){
		loadJSON("./json/config.json", function(text){
			actual_JSON = JSON.parse(text);
			console.log(actual_JSON);
			alarmData = actual_JSON.alarmData;
			console.log(alarmData);
		});
		startTime();
		addclickEvents();
		setTimeout(function(){
			loadScreen();
			localStorage.setItem("AlarmData", alarmData);
			checkAlarm();
		},100);
		
	}
	function checkAlarm(){
	  //console.log("checking alarm");
	  var today = new Date();
	  var h = today.getHours();
	  var m = today.getMinutes();
	  var s = today.getSeconds();
	  var day = today.getSeconds();
	  var hourData;
	 // m = checkTime(m);
	 // s = checkTime(s);
	 //console.log(h+":"+m);
	  for(var i=0;i<alarmData.length;i++)
	  {
		  if(alarmData[i].snoozeVal == "")
		  {
			  if(alarmData[i].ampm == "PM" && h!=12)
			  {
				hourData = Number(alarmData[i].hour) + 12*1+":"+alarmData[i].minute;
			  }
			  else
			  {
				hourData = Number(alarmData[i].hour) +":"+alarmData[i].minute;
			  }
			  //console.log(h+":"+m,hourData);
			if(h+":"+m == hourData && s == 00)
			{
				//console.log("!!!!!!!!!Alarm!!!!!!!!");
				playAlarmNo = i;
				changeScreen("playAlarm");
			}
		  }
		  else
		  {
		   if(h+":"+m == alarmData[i].snoozeVal && s == 00)
			{
				//console.log("!!!!!!!!!Alarm!!!!!!!!");
				playAlarmNo = i;
				changeScreen("playAlarm");
			}
		  }
	  }
	  var t = setTimeout(checkAlarm, 1000);
	}
	
	function addclickEvents(){
		var buttonElement = document.getElementsByTagName("button");
			//console.log(buttonElement);
			for(i in buttonElement)
			{
				buttonElement[i].onclick = function(e){
					//console.log("i am here",e.target.id);
					changeScreen(e.target.id);
				}
			}
	}
	function addCheckBoxEvents(){
		var CheckBoxElement = document.getElementsByClassName("checkBoxComp");
			//console.log(CheckBoxElement);
			for(var i=0; i<CheckBoxElement.length; i++)
			{
				CheckBoxElement[i].setAttribute("elementNo", i);
				CheckBoxElement[i].onclick = function(e){
					if(e.target.getAttribute("clicked") == "true")
					{
						e.target.style.backgroundColor = "white";
						e.target.setAttribute("clicked",false);
						e.target.parentElement.style.opacity = "0.4"
						alarmData[e.target.getAttribute("elementNo")].enable = false;
					}
					else
					{
						e.target.style.backgroundColor = "#000fff";
						e.target.setAttribute("clicked",true);
						e.target.parentElement.style.opacity = "1"
						alarmData[e.target.getAttribute("elementNo")].enable = true;
					}
					//console.log(alarmData);
				}
			}
			
	}
	function addDayCheckBoxEvents(){
		var checkBoxDayElement = document.getElementsByClassName("checkBoxDayComp");
			//console.log(checkBoxDayElement);
			for(i in checkBoxDayElement)
			{
				checkBoxDayElement[i].onclick = function(e){
					if(e.target.getAttribute("clicked") == "true")
					{
						e.target.style.backgroundColor = "white";
						e.target.setAttribute("clicked",false);
					}
					else
					{
						e.target.style.backgroundColor = "#000fff";
						e.target.setAttribute("clicked",true);
					}
				}
			}
	}
	function addSnoozeCheckBoxEvents(){
		var checkBoxSnoozeElement = document.getElementsByClassName("checkBoxSnoozeComp");
			for(i in checkBoxSnoozeElement)
			{
				checkBoxSnoozeElement[i].onclick = function(e){
					if(e.target.getAttribute("clicked") == "true")
					{
						e.target.style.backgroundColor = "white";
						e.target.setAttribute("clicked",false);
					}
					else
					{
						e.target.style.backgroundColor = "#000fff";
						e.target.setAttribute("clicked",true);
					}
				}
			}
	}
	function addRadioEvents(){
		var radioElement = document.getElementsByClassName("radioComp");
			//console.log(radioElement);
			for(i in radioElement)
			{
				radioElement[i].onclick = function(e){
					if(e.target.getAttribute("clicked") == "false")
					{
						for(var j=0;j<radioElement.length;j++)
								{
									radioElement[j].style.backgroundColor = "white";
									radioElement[j].setAttribute("clicked",false);
								}
						e.target.style.backgroundColor = "#000fff";
						e.target.setAttribute("clicked",true);
					}
					else
					{
						for(var j=0;j<radioElement.length;j++)
							{
								radioElement[j].style.backgroundColor = "white";
								radioElement[j].setAttribute("clicked",false);
							}
					}
				}
			}
	}
	function changeScreen(btn,ele){
		switch(btn) {
		  case "Alarm":
			currScreen = "screen_2"
			document.getElementById("midPanel").innerHTML = "";
			for(i in alarmData)
			{
				createAlarmElement(i,alarmData[i]);
			}
			addCheckBoxEvents();
			break;
		  case "playAlarm":
			currScreen = "screen_5"
			document.getElementById("midPanel").innerHTML = "";
			playAlarm();
			break;	
		  case "Clock":
			currScreen = "screen_1"
			document.getElementById("midPanel").innerHTML = "";
			createClock();
			break;
		case "Edit":
			currScreen = "screen_3"
			//document.getElementById("midPanel").innerHTML = "";
			editClock();
			break;	
		case "Done":
			currScreen = "screen_2"
			document.getElementById("midPanel").innerHTML = "";
			for(i in alarmData)
			{
				createAlarmElement(i,alarmData[i]);
			}
			addCheckBoxEvents();
			break;
		case "editAlarm":
			currScreen = "screen_4"
			document.getElementById("midPanel").innerHTML = "";
			//addAlarm();
			saveMode = "edit"
			editAlarm(ele);
			break;	
		case "Cancel":
			currScreen = "screen_2"
			document.getElementById("midPanel").innerHTML = "";
			for(i in alarmData)
			{
				createAlarmElement(i,alarmData[i]);
			}
			document.getElementById("lowerPanel").style.height = "40px";
			document.getElementsByClassName("saveAlarmComp")[0].remove();
			document.getElementsByClassName("deleteAlarmComp")[0].remove();
			addCheckBoxEvents();
			break;	
		case "Save":
			currScreen = "screen_2"
			document.getElementById("midPanel").innerHTML = "";
			for(i in alarmData)
			{
				createAlarmElement(i,alarmData[i]);
			}
			document.getElementById("lowerPanel").style.height = "40px";
			document.getElementsByClassName("saveAlarmComp")[0].remove();
			document.getElementsByClassName("deleteAlarmComp")[0].remove();
			addCheckBoxEvents();
			break;	
		case "Add":
			saveMode = "Add"
			currScreen = "screen_4"
			document.getElementById("midPanel").innerHTML = "";
			addAlarm();
			break;
		case "saveAlarm":
			currScreen = "screen_2"
			document.getElementById("midPanel").innerHTML = "";
			for(i in alarmData)
			{
				createAlarmElement(i,alarmData[i]);
			}
			document.getElementById("lowerPanel").style.height = "40px";
			document.getElementsByClassName("saveAlarmComp")[0].remove();
			document.getElementsByClassName("deleteAlarmComp")[0].remove();
			addCheckBoxEvents();
			break;		
		case "deleteAlarm":
			currScreen = "screen_2"
			document.getElementById("midPanel").innerHTML = "";
			for(i in alarmData)
			{
				createAlarmElement(i,alarmData[i]);
			}
			document.getElementById("lowerPanel").style.height = "40px";
			document.getElementsByClassName("saveAlarmComp")[0].remove();
			document.getElementsByClassName("deleteAlarmComp")[0].remove();
			addCheckBoxEvents();
			break;		
		  default:
			// code block
		}
		loadScreen();
	}
	function loadJSON(file, callback) {
		var rawFile = new XMLHttpRequest();
		rawFile.overrideMimeType("application/json");
		rawFile.open("GET", file, true);
		rawFile.onreadystatechange = function() {
			if (rawFile.readyState === 4 && rawFile.status == "200") {
				callback(rawFile.responseText);
			}
		}
		rawFile.send(null);
	}
	function editClock(){
			for (var i = 0; i < document.getElementsByClassName("alarmComp").length; i++ ) 
			{
				document.getElementsByClassName("checkBoxComp")[i].style.display = "none";
				document.getElementsByClassName("alarmComp")[i].style.paddingLeft = "80px"
				
				crossDiv = document.createElement('button');
				crossDiv.classList.add("crossDiv")
				crossDiv.innerHTML = "X"
				document.getElementsByClassName("alarmComp")[i].append(crossDiv);
				
				nextDiv = document.createElement('button');
				nextDiv.classList.add("nextDiv")
				nextDiv.innerHTML = ">"
				document.getElementsByClassName("alarmComp")[i].append(nextDiv);
			}
			applyEventOnCross();
			applyEventOnAlarm();
	}
	
	function applyEventOnCross(){
			var crossElement = document.getElementsByClassName("crossDiv");
			for(i in crossElement)
			{
				crossElement[i].onclick = function(e){
					removeAlarm(e.target,i)
				}
			}
	}
	function applyEventOnAlarm(){
			var alarmElement = document.getElementsByClassName("nextDiv");
			for(var i=0; i<alarmElement.length; i++)
			{
				alarmElement[i].onclick = function(e){
					changeScreen("editAlarm",e.target);
				}
			}
	}
	function removeAlarm(element,num){
		//console.log("ALarm removed",num);
		element.parentElement.style.display = "none"
		var eleNo = Number(element.parentElement.getAttribute("elementno"));
		alarmData.splice(eleNo, 1)
		console.log(alarmData);
	}
	function createClock(){
		var clockTimeComp = document.createElement('div');
		clockTimeComp.setAttribute("id", "time");
		document.getElementById('midPanel').append(clockTimeComp);
		
		var clockDateComp = document.createElement('div');
		clockDateComp.setAttribute("id", "date");
		document.getElementById('midPanel').append(clockDateComp);
		
		startTime();
		addclickEvents();
	}
	function playAlarm(){
		var clockTimeComp = document.createElement('div');
		clockTimeComp.setAttribute("id", "alarmTime");
		clockTimeComp.innerHTML = alarmData[playAlarmNo].hour+":"+ alarmData[playAlarmNo].minute+" "+ alarmData[playAlarmNo].ampm;
		document.getElementById('midPanel').append(clockTimeComp);
		
		var clockDateComp = document.createElement('div');
		clockDateComp.setAttribute("id", "date");
		document.getElementById('midPanel').append(clockDateComp);
		
		var noteComp = document.createElement('div');
		noteComp.setAttribute("id", "noteComp");
		noteComp.innerHTML = alarmData[playAlarmNo].note.split(", ")[0];
		document.getElementById('midPanel').append(noteComp);
		console.log(alarmData[playAlarmNo].snooze,playAlarmNo);
		if(alarmData[playAlarmNo].snooze == "true")
		{
			snoozeBtnComp = document.createElement('button');
			snoozeBtnComp.classList.add("snoozeBtnComp");
			snoozeBtnComp.innerHTML = "Snooze"
			document.getElementById("midPanel").append(snoozeBtnComp);
			snoozeAlarm();
		}
		stopBtnComp = document.createElement('button');
		stopBtnComp.classList.add("stopBtnComp");
		stopBtnComp.innerHTML = "Stop"
		document.getElementById("midPanel").append(stopBtnComp);
		
		document.getElementById('midPanel').style.backgroundColor = "#5bba6f";
		document.getElementById('midPanel').style.padding = "40px 0px 40px 0px";
		document.getElementById('alarmTime').style.fontSize = "60px";
		document.getElementById('date').style.fontSize = "25px";
		document.getElementById('date').style.color = "black";
		//startTime();
		
		stopAlarm();
	}
	function snoozeAlarm(){
		var snoozeBtn = document.getElementsByClassName("snoozeBtnComp")[0];
				snoozeBtn.onclick = function(e){
					console.log("snoozeBtn clicked");
					var min = Number(alarmData[playAlarmNo].minute)+10;
					var ampm = alarmData[playAlarmNo].ampm;
					if(min>=60)
					{
						var hr = Number(alarmData[playAlarmNo].hour)+1;
					}
					else
					{
						var hr = Number(alarmData[playAlarmNo].hour);
					}
					
					if(ampm=="PM" && hr!=12)
					{
						hr=Number(hr)+12
					}
					//console.log(hr,min);
					alarmData[playAlarmNo].snoozeVal = hr+":"+min;
					console.log(alarmData);
					
					document.getElementById('midPanel').style.backgroundColor = "white";
					document.getElementById('midPanel').style.padding = "0px 0px 0px 0px";
					document.getElementById('alarmTime').style.fontSize = "40px";
					document.getElementById('date').style.fontSize = "21px";
					document.getElementById('date').style.color = "#9b9696";
					
					changeScreen("Clock");
				}
				
	}
	function stopAlarm(){
		var stopBtn = document.getElementsByClassName("stopBtnComp")[0];
				stopBtn.onclick = function(e){
					console.log("stopBtn clicked");
					document.getElementById('midPanel').style.backgroundColor = "white";
					document.getElementById('midPanel').style.padding = "0px 0px 0px 0px";
					document.getElementById('alarmTime').style.fontSize = "40px";
					document.getElementById('date').style.fontSize = "21px";
					document.getElementById('date').style.color = "#9b9696";
					alarmData[playAlarmNo].snooze = false;
					alarmData[playAlarmNo].snoozeVal ="";
					changeScreen("Clock");
				}
	}
	function addAlarm(){
		subTitleComp = document.createElement('div');
		subTitleComp.classList.add("subTitleComp")
		subTitleComp.innerHTML = "SELECT TIME";
		document.getElementById('midPanel').append(subTitleComp);
		
		infoSelectComp = document.createElement('div');
		infoSelectComp.classList.add("infoSelectComp")
		document.getElementById('midPanel').append(infoSelectComp);
		
		infoSelectComp.appendChild(buildTimePicker());
		
		snoozComp = document.createElement('div');
		snoozComp.classList.add("snoozComp")
		snoozComp.innerHTML = "Snooze";
		infoSelectComp.append(snoozComp);
		
		checkBoxComp = document.createElement('button');
		checkBoxComp.classList.add("checkBoxSnoozeComp");
		checkBoxComp.setAttribute("clicked", false);
		infoSelectComp.append(checkBoxComp);
		
		labelComp = document.createElement('div');
		labelComp.classList.add("labelComp")
		labelComp.innerHTML = "Label";
		infoSelectComp.append(labelComp);
		
		inputComp = document.createElement('input');
		inputComp.classList.add("inputBox")
		infoSelectComp.append(inputComp);
		
		subTitleComp = document.createElement('div');
		subTitleComp.classList.add("subTitleComp")
		subTitleComp.innerHTML = "REPEAT";
		document.getElementById('midPanel').append(subTitleComp);
		
		selectDayComp = document.createElement('div');
		selectDayComp.classList.add("selectDayComp")
		document.getElementById('midPanel').append(selectDayComp);
		
		var dayArr = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
		for(var i=0; i<7; i++)
		{
			dayComp = document.createElement('div');
			dayComp.classList.add("dayComp")
			dayComp.innerHTML = dayArr[i];
			selectDayComp.append(dayComp);
			
			checkBoxDayComp = document.createElement('button');
			checkBoxDayComp.classList.add("checkBoxDayComp");
			checkBoxDayComp.setAttribute("clicked", false);
			dayComp.append(checkBoxDayComp);
		}
		
		subTitleComp = document.createElement('div');
		subTitleComp.classList.add("subTitleComp");
		subTitleComp.innerHTML = "SOUND";
		document.getElementById('midPanel').append(subTitleComp);
		
		selectSoundComp = document.createElement('div');
		selectSoundComp.classList.add("selectSoundComp")
		document.getElementById('midPanel').append(selectSoundComp);
		
		var soundArr = ["None","Radar","Beep"]
		for(var i=0; i< soundArr.length; i++)
		{
			dayComp = document.createElement('div');
			dayComp.classList.add("dayComp")
			dayComp.innerHTML = soundArr[i];
			selectSoundComp.append(dayComp);
			
			radioComp = document.createElement('button');
			radioComp.classList.add("radioComp");
			radioComp.setAttribute("clicked", false);
			dayComp.append(radioComp);
		}
		document.getElementById("lowerPanel").style.height ="120px"
		
		saveAlarmComp = document.createElement('button');
		saveAlarmComp.classList.add("saveAlarmComp");
		saveAlarmComp.innerHTML = "Save Alarm";
		document.getElementById("lowerPanel").append(saveAlarmComp);
		
		deleteAlarmComp = document.createElement('button');
		deleteAlarmComp.classList.add("deleteAlarmComp");
		deleteAlarmComp.innerHTML = "Delete Alarm"
		document.getElementById("lowerPanel").append(deleteAlarmComp);
		
		addDayCheckBoxEvents();
		addSnoozeCheckBoxEvents();
		addRadioEvents();
		saveAlarm();
		deleteAlarm();
		}
	function editAlarm(element){
		addAlarm();
		var eleNo = Number(element.parentElement.getAttribute("elementno"));
		console.log(alarmData[eleNo].minute);
		currentAlarm = eleNo;
		document.getElementById("hour").value = alarmData[eleNo].hour;
		document.getElementById("minute").value = alarmData[eleNo].minute;
		document.getElementById("ampm").value = alarmData[eleNo].ampm; 
		document.getElementsByClassName("inputBox")[0].value = alarmData[eleNo].note.split(",")[0];
		
		var checkDayComp = document.getElementsByClassName("checkBoxDayComp");
		var dayArr = [" Mon"," Tue"," Wed"," Thr"," Fri"," Sat"," Sun"];
		for(var i=0;i<checkDayComp.length;i++)
		{
			if(alarmData[eleNo].note.split(",")[1] == " Everyday")
			{
				checkDayComp[i].setAttribute("clicked","true");
				checkDayComp[i].style.backgroundColor = "blue";
			}
		}
		if(alarmData[eleNo].snooze)
		{
			document.getElementsByClassName("checkBoxSnoozeComp")[0].setAttribute("clicked","true");
			document.getElementsByClassName("checkBoxSnoozeComp")[0].style.backgroundColor = "blue";
		}
		for(var j=1;j<alarmData[eleNo].note.split(",").length;j++)
			{
				if(dayArr.indexOf(alarmData[eleNo].note.split(",")[j]) != -1)
				{
					checkDayComp[dayArr.indexOf(alarmData[eleNo].note.split(",")[j])].setAttribute("clicked","true");
					checkDayComp[dayArr.indexOf(alarmData[eleNo].note.split(",")[j])].style.backgroundColor = "blue";
				}
			}
	}
	function buildTimePicker() {
		var result = document.createElement('span');
		var hours = document.createElement('select');
		hours.setAttribute('id', 'hour');
		
		var option = document.createElement('option');
			option.setAttribute('value', "HH");
			option.appendChild(document.createTextNode("HH"));
			hours.appendChild(option);
		for (var h=1; h<13; h++) {
			var option = document.createElement('option');
			
			if(h<10)
			{
				option.appendChild(document.createTextNode("0"+h));
				option.setAttribute('value',"0"+h);
			}
			else
			{
				option.appendChild(document.createTextNode(h));
				option.setAttribute('value',h);
			}
			hours.appendChild(option);
		}
		var minutes = document.createElement('select');
		minutes.setAttribute('id', 'minute');
		
		var option = document.createElement('option');
			option.setAttribute('value', "MM");
			option.appendChild(document.createTextNode("MM"));
			minutes.appendChild(option);
		for (var m=0; m<60; m++) {
			var option = document.createElement('option');
			
			if(m<10)
			{
				option.appendChild(document.createTextNode("0"+m));
				option.setAttribute('value', "0"+m);
			}
			else
			{
				option.appendChild(document.createTextNode(m));
				option.setAttribute('value', m);
			}
			minutes.appendChild(option);
		}
		var ampm = document.createElement('select');
		ampm.setAttribute('id', 'ampm');
		
			var option = document.createElement('option');
			option.setAttribute('value', "AM");
			option.appendChild(document.createTextNode("AM"));
			ampm.appendChild(option);
			
			var option = document.createElement('option');
			option.setAttribute('value', "PM");
			option.appendChild(document.createTextNode("PM"));
			ampm.appendChild(option);
		
		result.appendChild(hours);
		result.appendChild(minutes);
		result.appendChild(ampm);

		return result;
	}
	function saveAlarm(){
		console.log("save alarm");
		var saveElement = document.getElementsByClassName("saveAlarmComp")[0];
				saveElement.onclick = function(){
					console.log("save alarm clicked");
					var ele1 = document.getElementById("hour");
					var strUser1 = ele1.options[ele1.selectedIndex].text;
					
					var ele2 = document.getElementById("minute");
					var strUser2 = ele2.options[ele2.selectedIndex].text;
					
					var ele3 = document.getElementById("ampm");
					var strUser3 = ele3.options[ele3.selectedIndex].text;
					
					var noteEle = document.getElementsByClassName("inputBox")[0].value;
					console.log(strUser1,strUser2,strUser3);
					
					var checkBoxDayElement = document.getElementsByClassName("checkBoxDayComp");
					var dayArr = ["Mon","Tue","Wed","Thr","Fri","Sat","Sun"];
					var dayEle="";
					var count=0;
					for(var i=0; i<checkBoxDayElement.length; i++)
					{
						if(checkBoxDayElement[i].getAttribute("clicked")=="true")
						{
							dayEle = dayEle+", "+dayArr[i];
							count++;
							if(count==7)
							{
								dayEle=", Everyday";
							}
						}
					}
					if(saveMode != "edit")
					{
						if(!isNaN(strUser1) && !isNaN(strUser2))
						{
						 alarmData.push({
								"hour":strUser1,
								"minute":strUser2,
								"ampm":strUser3,
								"note":noteEle+dayEle,
								"enable":true,
								"snooze":document.getElementsByClassName("checkBoxSnoozeComp")[0].getAttribute("clicked"),
								"snoozeVal":""
							});
						}
					}
					else
					{
						alarmData[currentAlarm]={
								"hour":strUser1,
								"minute":strUser2,
								"ampm":strUser3,
								"note":noteEle+dayEle,
								"enable":true,
								"snoozeVal":""
							};
					}
					changeScreen("saveAlarm");
				}
			
	}
	function deleteAlarm(){
		console.log("delete alarm");
		var deleteElement = document.getElementsByClassName("deleteAlarmComp")[0];
				deleteElement.onclick = function(e){
					console.log("delete alarm clicked");
					alarmData.splice(currentAlarm, 1)
					changeScreen("deleteAlarm");
				}
	}
	function createAlarmElement(num,data){
		alarmComp = document.createElement('div');
		alarmComp.classList.add("alarmComp")
		alarmComp.setAttribute("elementNo",num);
		document.getElementById('midPanel').append(alarmComp);
		
		timeComp = document.createElement('div');
		timeComp.classList.add("timeComp");
		timeComp.innerHTML = data.hour +":"+ data.minute +" "+ data.ampm;
		document.getElementsByClassName('alarmComp')[num].append(timeComp);
		
		reasonComp = document.createElement('div');
		reasonComp.classList.add("reasonComp");
		reasonComp.innerHTML = data.note;
		document.getElementsByClassName('alarmComp')[num].append(reasonComp);
		
		checkBoxComp = document.createElement('button');
		checkBoxComp.classList.add("checkBoxComp");
		checkBoxComp.setAttribute("clicked", false);
		document.getElementsByClassName('alarmComp')[num].append(checkBoxComp);
		
		//to enable and disable state
		if(!data.enable)
		{
			alarmComp.style.opacity = "0.4";
			checkBoxComp.style.backgroundColor = "white";
		}
		else
		{
			alarmComp.style.opacity = "1";
			checkBoxComp.style.backgroundColor = "#000fff";
			checkBoxComp.setAttribute("clicked", true);
		}
	}
	function startTime() {
	 //console.log(actual_JSON);
	  var today = new Date();
	  var h = today.getHours();
	  var m = today.getMinutes();
	  var s = today.getSeconds();
	  var day = today.getSeconds();
	  m = checkTime(m);
	  s = checkTime(s);
	  var todayStr = today.toString();
	  todayStr = todayStr.split(" ");
	  if(!document.getElementById('time'))
	  {
		return;
	  }
	  document.getElementById('time').innerHTML =
	  h + ":" + m + ":" + s;
	  document.getElementById('date').innerHTML =
	  todayStr[0] + " " + todayStr[2] + " " + todayStr[1] + ", " + todayStr[3];
	  
	  
		var t = setTimeout(startTime, 1000);
	  
	}
	function checkTime(i) {
	  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	  return i;
	}
	
	function loadScreen(){
		for (var i in actual_JSON[currScreen]) {
			if (actual_JSON[currScreen].hasOwnProperty(i)) {
				if(actual_JSON[currScreen][i] == true)
				{
					document.getElementById(i).style.display = "block"
				}
				else
				{
					document.getElementById(i).style.display = "none"
				}
				
			}
		}
	}
	
	
}
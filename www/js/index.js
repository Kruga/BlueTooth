document.addEventListener("deviceready", onDeviceReady, false);
var mac = "";
function onDeviceReady(){	//Phonegap ready
	alert(device.platform);
	if(device.platform == "Android") mac = "20:13:06:14:01:72";
	if(device.platform == "iPhone") mac = "";
	connect(mac);
	bluetoothSerial.subscribe('\n', read);
}

function connect(mac){
	bluetoothSerial.isEnabled(
		function(){
			connectedStatus('connecting');
			bluetoothSerial.connect(mac,
				function(){
					connectedStatus(true);
				},
				function(){
					testStatus();
					alert("Failed to connect!");
				}
			);
		},
		function(){
			alert("Bluetooth must be enabled first!");
		}
	);
	
}

function disconnect(){
	connectedStatus('disconnecting');
	bluetoothSerial.disconnect(
		function(){
			connectedStatus(false);
		},
		function(){
			testStatus();
			alert("Failed to diconnect!");
		}
	);
}

function send(msg){
	bluetoothSerial.isConnected(
		function(){
			connectedStatus(true);
			bluetoothSerial.write(
				msg,
				function(){
					//Success
				},
				function(){
					alert("Error writing data!");
				}
			);
		},
		function(){
			connectedStatus(false);
		}
	);
}

function read(data){
	document.getElementById("textbox").value = data;
}

function testStatus(){
	bluetoothSerial.isConnected(
		function(){
			connectedStatus(true);
		},
		function(){
			connectedStatus(false);
		}
	);
}
function connectedStatus(status){
	if(status === true){
		document.getElementById("status").style.backgroundColor = "green";
		document.getElementById("status").style.boxShadow = "0 0 15px green";
	}
	else if(status === false){
		document.getElementById("status").style.backgroundColor = "red";
		document.getElementById("status").style.boxShadow = "0 0 15px red";
	}
	else{
		document.getElementById("status").style.backgroundColor = "yellow";
		document.getElementById("status").style.boxShadow = "0 0 15px yellow";
	}
}

function listBondedDevices(){
	bluetoothSerial.list(
		function(devices){
			alert(JSON.stringify(devices));
		},
		function(){
			alert("Error lising bonded devices!");
			//Error
		}
	);
}


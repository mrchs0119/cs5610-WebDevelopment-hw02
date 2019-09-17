// initial display
var displayVal = '0';
// array save data
var stringArray = [];

// Clear Button: clear the display and current number
document.getElementById("empty").addEventListener("click",function(){
	displayVal = '0';
	stringArray = [];
	document.getElementById("output").innerHTML = displayVal;
});

// Minus button
document.getElementById("-").addEventListener("click", function(){
	if (document.getElementById("output").innerHTML == "0"){
		document.getElementById("output").innerHTML = "-";
		return;
	}
	if (typeof(stringArray[stringArray.length -1]) != "number"){
		stringArray.push(Number(document.getElementById("output").innerHTML));}
	stringArray.push("-");
	document.getElementById("output").innerHTML = "";
});

// Divide button
document.getElementById("/").addEventListener("click", function(){
	if (typeof(stringArray[stringArray.length -1]) != "number"){
		stringArray.push(Number(document.getElementById("output").innerHTML));}
	stringArray.push("/");
	document.getElementById("output").innerHTML = "";	
});

// Times button
document.getElementById("*").addEventListener("click", function(){
	if (typeof(stringArray[stringArray.length -1]) != "number"){
		stringArray.push(Number(document.getElementById("output").innerHTML));}
	stringArray.push("*");
	document.getElementById("output").innerHTML = "";	
});

// Plus and equals button
document.getElementById("+/=").addEventListener("click", function(){
	if(stringArray.length <= 1){
		if (stringArray.length < 1){
                        stringArray.push(Number(document.getElementById("output").innerHTML));
                }
                stringArray.push("+")
                document.getElementById("output").innerHTML = "";
	
	}else{
                stringArray.push(Number(document.getElementById("output").innerHTML));

                var calculate = function(){
                        var postfix = function(infix){
                        var helpArray = [];
                        var result = [];
                        var x;
                        var isGreaterThan = function(opa, opb){
                                if(["*", "/"].indexOf(opa)>-1 && ["+", "-"].indexOf(opb) > -1){
                                        return true;
                                }       
                                return false;
                        }       
                        
                        for (x of infix){
                                if (typeof(x) == "number"){
                                        result.push(x);
                                }else{  
                                        if (helpArray.length == 0){
                                                helpArray.push(x);
                                        }else{  
                                                while(helpArray.length != 0 && !isGreaterThan(x, helpArray[helpArray.length -1])){
                                                        result.push(helpArray.pop());
                                                }       
                                                helpArray.push(x);
                                        }       
                                }       
                        }       
                        while(helpArray.length != 0){
                                result.push(helpArray.pop());
                        }       
                        return result;
                };      
                
                
                var helpArray = [];
                var x;
                for (x of postfix(stringArray)){
                        if (typeof(x) == "number"){
                        helpArray.push(x); 
                        }
                        else {
                                var a = helpArray.pop();
                                var b = helpArray.pop();
                                
                                switch(x){
                                        case"+":
                                                helpArray.push(a + b);
                                                break;
                                        case "*":
                                                helpArray.push(a*b);
                                                break;
                                        case "-":
                                                helpArray.push(b-a);
                                                break;
 					case "/":
                                                helpArray.push(b/a);
                                                break;
                                }               
                        }       
                }       
                return helpArray[0];                 
                };
                var result = calculate();
                document.getElementById("output").innerHTML = result;
                stringArray = [result];
        }       
});


(function(){
	for(var btn of document.getElementsByClassName("number")){
		btn.addEventListener("click", function(){
			var pressed = this.innerHTML;
			var cur = document.getElementById("output").innerHTML;
			if (stringArray.length == 1){
				document.getElementById("display").innerHTML = pressed;
				stringArray.pop();
				return;
			}

			if (pressed != "." || cur.indexOf(".") == -1){
				if(cur == "0"){
				    document.getElementById("output").innerHTML = pressed;
				}else{
			            document.getElementById("output").innerHTML =cur + pressed;
				}
			}
	
		});
	}

})();


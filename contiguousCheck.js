var jurisdictionConJson = {
			"AB":["BC","NT","SK","MT"],
			"AL":["MS","TN","GA","FL"],
			"AR":["MO","TN","MS","LA","TX","OK"],
			"AZ":["CA","NV","UT","CO","NM"],
			"BC":["WA","ID","MT","AB","NT","YT"],
			"CA":["OR","NV","AZ"],
			"CO":["WY","NE","KS","OK","NM","AZ","UT"],
			"CT":["NY","MA","RI"],
			"DC":["MD","VA"],
			"DE":["MD","PA","NJ"],
			"FL":["AL","GA"],
			"GA":["FL","AL","TN","NC","SC"],
			"IA":["MN","WI","IL","MO","NE","SD"],
			"ID":["BC","MT","WY","UT","NV","OR","WA"],
			"IL":["IN","KY","MO","IA","WI"],
			"IN":["MI","OH","KY","IL"],
			"KS":["NE","MO","OK","CO"],
			"KY":["IN","OH","WV","VA","TN","MO","IL"],
			"LA":["TX","AR","MS"],
			"MA":["RI","CT","NY","NH","VT"],
			"MB":["SK","ON","ND","MN"],
			"MD":["VA","WV","PA","DC","DE"],
			"ME":["NH","NB","QC"],
			"MI":["WI","IN","OH","ON"],
			"MN":["WI","IA","SD","ND","ON","MB"],
			"MO":["IA","IL","KY","TN","AR","OK","KS","NE"],
			"MS":["LA","AR","TN","AL"],
			"MT":["BC","AB","SK","ND","SD","WY","ID"],
			"NB":["NS","PE","NF","ME","QC"],
			"NC":["VA","TN","GA","SC"],
			"ND":["MN","SD","MT","SK","MB"],
			"NE":["SD","IA","MO","KS","CO","WY"],
			"NF":["QC","NB"],
			"NH":["VT","ME","MA","QC"],
			"NJ":["DE","PA","NY"],
			"NM":["AZ","UT","CO","OK","TX"],
			"NS":["NB","PE"],
			"NT":["YT","BC","AB","SK","MB"],
			"NV":["ID","UT","AZ","CA","OR"],
			"NY":["NJ","PA","VT","MA","CT","ON","QC"],
			"OH":["PA","WV","KY","IN","MI"],
			"OK":["KS","MO","AR","TX","NM","CO"],
			"ON":["MB","MN","MI","QC","OH","NY"],
			"OR":["CA","NV","ID","WA"],
			"PA":["NY","NJ","DE","MD","WV","OH"],
			"PE":["NB"],
			"QC":["ON","NF","NY","VT","NH","ME","NB"],
			"RI":["CT","MA"],
			"SC":["GA","NC"],
			"SD":["ND","MN","IA","NE","WY","MT"],
			"SK":["AB","MT","ND","MB","NT"],
			"TN":["KY","VA","NC","GA","AL","MS","AR","MO"],
			"TX":["NM","OK","AR","LA"],
			"UT":["ID","WY","CO","NM","AZ","NV"],
			"VA":["NC","TN","KY","WV","MD","DC"],
			"VT":["NY","NH","MA","QC"],
			"WA":["ID","OR","BC"],
			"WI":["MI","MN","IA","IL","ON"],
			"WV":["OH","PA","MD","VA","KY"],
			"WY":["MT","SD","NE","CO","UT","ID"],
			"YT":["BC","NT","BC"]
		},
		
		abToFull = {
				"AB":"Alberta",
				"AL":"Alabama",
				"AR":"Arkansas",
				"AZ":"Arizona",
				"BC":"British Columbia",
				"CA":"California",
				"CO":"Colorado",
				"CT":"Connecticut",
				"DC":"District of Columbia",
				"DE":"Delaware",
				"FL":"Florida",
				"GA":"Georgia",
				"IA":"Iowa",
				"ID":"Idaho",
				"IL":"Illinois",
				"IN":"Indiana",
				"KS":"Kansas",
				"KY":"Kentucky",
				"LA":"Louisiana",
				"MA":"Massachusetts",
				"MB":"Manitoba",
				"MD":"Maryland",
				"ME":"Maine",
				"MI":"Michigan",
				"MN":"Minnesota",
				"MO":"Missouri",
				"MS":"Mississippi",
				"MT":"Montana",
				"NB":"New Brunswick",
				"NC":"North Carolina",
				"ND":"North Dakota",
				"NE":"Nebraska",
				"NF":"Newfoundland and Labrador",
				"NH":"New Hampshire",
				"NJ":"New Jersey",
				"NM":"New Mexico",
				"NS":"Nova Scotia",
				"NT":"Northwest Territories",
				"NV":"Nevada",
				"NY":"New York",
				"OH":"Ohio",
				"OK":"Oklahoma",
				"ON":"Ontario",
				"OR":"Oregon",
				"PA":"Pennsylvania",
				"PE":"Prince Edward Island",
				"QC":"Québec",
				"RI":"Rhode Island",
				"SC":"South Carolina",
				"SD":"South Dakota",
				"SK":"Saskatchewan",
				"TN":"Tennessee",
				"TX":"Texas",
				"UT":"Utah",
				"VA":"Virginia",
				"VT":"Vermont",
				"WA":"Washington",
				"WI":"Wisconsin",
				"WV":"West Virginia",
				"WY":"Wyoming",
				"YT":"Yukon"
			};

function checkContiguity(arr){
		
		function getContiguousStates(stateName){
			if(stateName in jurisdictionConJson){
				var arr = jurisdictionConJson[stateName];
				return arr;
			} else {
				return "Not a valid US state."
			}
		}
	
		var arrStates = arr,
			arrStatesCon = [],
			curState = "LA",
			tempArr = [];
	
		if(arrStates.length===1){
			return "Mileage is required in "+ baseState+" and at least one other jurisdiction.  Please review and make corrections."
		}
		
		if(arrStates.indexOf(curState)==-1){
			return "Mileage is required in "+ baseState+" and at least one other jurisdiction.  Please review and make corrections."
		}
		
		if(arrStates.indexOf(curState)>=0){
			arrStates.splice(arrStates.indexOf(curState),1);
			arrStatesCon = getContiguousStates(curState);
			for(var i=0;i<arrStatesCon.length;i++){
				if(arrStates.indexOf(arrStatesCon[i])>=0){
					tempArr.push(arrStatesCon[i]);
					arrStates.splice(arrStates.indexOf(arrStatesCon[i]),1);
				}
			}
			while(tempArr.length>0){
				arrStatesCon = [];
				for(var i=0;i<tempArr.length;i++){
					arrStatesCon = arrStatesCon.concat(getContiguousStates(tempArr[i]));
				}
				tempArr = [];
				for(var i=0;i<arrStatesCon.length;i++){
					if(arrStates.indexOf(arrStatesCon[i])>=0){
						tempArr.push(arrStatesCon[i]);
						arrStates.splice(arrStates.indexOf(arrStatesCon[i]),1);
					}
				}
			}
			
			if(arrStates.length===0){
				return true;
			} else {
				var arrStatesFullName = [];
				for (var i=0;i<arrStates.length;i++){
					arrStatesFullName.push(" "+abToFull[arrStates[i]]);
				}
				if(isInternalUser=='Y')
					return "The jurisdictions: [ "+arrStatesFullName+" ] you've entered miles into are not contiguous with "+ abToFull[curState]+". Please override contiguous check to proceed."
				else
					return "The jurisdictions: [ "+arrStatesFullName+" ] you've entered miles into are not contiguous with "+ abToFull[curState]+". Please review and correct."
			}
			
		} else {
			return "Mileage is required in Louisiana and at least one other jurisdiction. Please review and make corrections.";
		}
	}
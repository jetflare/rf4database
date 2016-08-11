function getPriceTable(){
	
	document.getElementById('profitTable').innerHTML=""
	
	var headerArray=["Lv.","Multiplier<br>(Type: ","Sell Price","Increment","Cumulative<br>Increment"];
	headerArray[1]+=currentItem.pricemultiplier+")";
	
	var integerCorrector = 1e8;
	var currentPriceMultiplier = getPriceMultiplierArray(currentItem.pricemultiplier);
	
	var lvArray = [];
	var priceMultiArray = [];
	var sellPriceArray = [];
	var incrementArray = ["N/A"];
	var cumulativeArray = [];
	
	var ROIarray = [];
	var ROIperDayArray = [];
	
	var cumSum = 0;
	
	for (i=0;i<maxLv;i++){
		lvArray.push(i+1);
		priceMultiArray.push(currentPriceMultiplier[i].toPrecision(3))
		sellPriceArray.push(getSellPriceAtLevel(currentItem,i+1))
		if (i>0){
			incrementArray.push(sellPriceArray[i]-sellPriceArray[i-1])
			cumSum+=incrementArray[i];
		}
		cumulativeArray.push(cumSum)
	}
	
	if (currentItem.harvested!==undefined){
		headerArray.push("Return On<br>Investment")
		headerArray.push("ROI/Day<br>(Normal Growth)")
		for (i=0;i<maxLv;i++){
			var currentValue = currentItem.value*currentItem.harvested*priceMultiArray[i] // Must account for weird maths
			var currentROI = (currentValue-currentItem.buy)/currentItem.buy
			var currentROIperDay = currentROI/currentItem.growth
			ROIarray.push(currentROI)
			ROIperDayArray.push(currentROIperDay.toPrecision(3))
		}
	}
	
	var priceTableEntry = lvArray
	priceTableEntry.arrayPush(priceMultiArray)
	priceTableEntry.arrayPush(sellPriceArray)
	priceTableEntry.arrayPush(incrementArray)
	priceTableEntry.arrayPush(cumulativeArray)
	priceTableEntry.arrayPush(ROIarray)
	priceTableEntry.arrayPush(ROIperDayArray)
	//priceTableEntry.arrayPush()
	
	var priceTable = document.createElement('table')
	var priceTableHeader = document.createElement('tr')
	priceTable.appendChild(priceTableHeader)
	
	document.getElementById('profitTable').appendChild(priceTable);
	
	for (i=0;i<headerArray.length;i++){
		var c = document.createElement('td');
		priceTableHeader.appendChild(c);
		c.innerHTML=headerArray[i];
	}
	
	for (i=0;i<maxLv;i++){
		var lvRow = document.createElement('tr')
		priceTable.appendChild(lvRow)
		
		for (j=0;j<(priceTableEntry.length)/maxLv;j++){
			var c = document.createElement('td');
			c.innerHTML=priceTableEntry[i+j*maxLv];
			lvRow.appendChild(c);
		}
	}
	
}

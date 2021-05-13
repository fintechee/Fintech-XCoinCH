function isNumeric (number) {
	if (typeof number == "undefined" || number == null) return false

	return !isNaN(parseFloat(number)) && isFinite(number);
}

function isInteger (number) {
	return !isNaN(number) &&
		parseInt(Number(number)) == number &&
		!isNaN(parseInt(number, 10))
}

function sma (dataInput, dataOutput, calculatedLength, period) {
	var i = calculatedLength

	if (calculatedLength > 0) {
		i--
	} else {
		for (var j = 0; j < period - 1; j++) {
			dataOutput[j] = 0
		}

		i = period - 1
	}

	var sum = 0

	for (var j = i - period + 1; j < i; j++) {
		sum += dataInput[j]
	}

	for (var j = i; j < dataInput.length; j++) {
		sum += dataInput[j]
		dataOutput[j] = sum / period
		sum -= dataInput[j - period + 1]
	}
}

function ema (dataInput, dataOutput, calculatedLength, period) {
	var i = calculatedLength
	var smthFctr = 2.0 / (period + 1)

	if (i == 0) {
		dataOutput[0] = dataInput[0]
		i++
	} else if (i == 1) {
	} else {
		i--
	}

	while (i < dataInput.length) {
		dataOutput[i] = dataInput[i] * smthFctr + dataOutput[i - 1] * (1 - smthFctr)
		i++
	}
}

function smma (dataInput, dataOutput, calculatedLength, period) {
	var i = calculatedLength
	var sum = 0

	if (i > 0) {
		i--
	} else {
		i = period - 1

		for (var j = 1; j < period; j++) {
			dataOutput[i - j] = 0
			sum += dataInput[i - j]
		}

		sum += dataInput[i]
		dataOutput[i] = sum / period
		i++
	}

	while (i < dataInput.length) {
		sum = dataOutput[i - 1] * period - dataOutput[i - 1] + dataInput[i]
		dataOutput[i] = sum / period
		i++
	}
}

function lwma (dataInput, dataOutput, calculatedLength, period) {
	var i = calculatedLength

	if (i > 0) {
		i--
	} else {
		for (var j = 0; j < period - 1; j++) {
			dataOutput[j] = 0
		}

		i = period - 1
	}

	var sum = 0
	var diffsum = 0
	var weight = 0

	for (var j = 1; j < period; j++) {
		sum += dataInput[i - j] * (period - j)
		diffsum += dataInput[i - j]
		weight += j
	}
	weight += period

	while (i < dataInput.length) {
		sum += dataInput[i] * period
		dataOutput[i] = sum / weight
		diffsum += dataInput[i]
		sum -= diffsum
		diffsum -= dataInput[i - period + 1]
		i++
	}
}

function importBuiltInIndicators () {
	importBuiltInIndicator("sma", "Simple Moving Average(v1.0)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataOutput = getDataOutput(context, "sma")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		sma(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "sma", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	}],
	[{
		name: "sma",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicatorOnArray("sma_for_mql", "Simple Moving Average for MQL(v1.0)", function (context) {
		var appliedPrice = getIndiParameter(context, "appliedPrice")
		appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
		var dataInput = getDataInput(context, appliedPrice)
		var dataOutput = getDataOutput(context, "sma")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		sma(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "sma", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
		name: "sma",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("ema", "Exponential Moving Average(v1.0)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataOutput = getDataOutput(context, "ema")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		ema(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "ema", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	}],
	[{
		name: "ema",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicatorOnArray("ema_for_mql", "Exponential Moving Average for MQL(v1.0)", function (context) {
		var appliedPrice = getIndiParameter(context, "appliedPrice")
		appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
		var dataInput = getDataInput(context, appliedPrice)
		var dataOutput = getDataOutput(context, "ema")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		ema(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "ema", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
		name: "ema",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("smma", "Smoothed Moving Average(v1.0)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataOutput = getDataOutput(context, "smma")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		smma(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "smma", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	}],
	[{
		name: "smma",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicatorOnArray("smma_for_mql", "Smoothed Moving Average for MQL(v1.0)", function (context) {
		var appliedPrice = getIndiParameter(context, "appliedPrice")
		appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
		var dataInput = getDataInput(context, appliedPrice)
		var dataOutput = getDataOutput(context, "smma")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		smma(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "smma", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
		name: "smma",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("lwma", "Linear Weighted Moving Average(v1.0)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataOutput = getDataOutput(context, "lwma")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		lwma(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "lwma", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	}],
	[{
		name: "lwma",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicatorOnArray("lwma_for_mql", "Linear Weighted Moving Average for MQL(v1.0)", function (context) {
		var appliedPrice = getIndiParameter(context, "appliedPrice")
		appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
		var dataInput = getDataInput(context, appliedPrice)
		var dataOutput = getDataOutput(context, "lwma")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		lwma(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "lwma", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
		name: "lwma",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("macd", "MACD(v1.01)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataFEMA = getDataOutput(context, "fastEMA")
		var dataSEMA = getDataOutput(context, "slowEMA")
		var dataOutputMain = getDataOutput(context, "main")
		var dataOutputSignal = getDataOutput(context, "signal")

		var fEMA = getIndiParameter(context, "fastEMA")
		var sEMA = getIndiParameter(context, "slowEMA")
		var sgnlSMA = getIndiParameter(context, "signalSMA")

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		if (i == 0) {
			dataFEMA[0] = dataInput[0]
			dataSEMA[0] = dataInput[0]
			dataOutputMain[0] = 0
			i++
		} else if (i == 1) {
		} else {
			i--
		}

		ema(dataInput, dataFEMA, calculatedLength, fEMA)
		ema(dataInput, dataSEMA, calculatedLength, sEMA)

		while (i < dataInput.length) {
			dataOutputMain[i] = dataFEMA[i] - dataSEMA[i]
			i++
		}

		sma(dataOutputMain, dataOutputSignal, calculatedLength, sgnlSMA)
	},[{
		name: "fastEMA",
		value: 12,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "slowEMA",
		value: 26,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "signalSMA",
		value: 9,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	}],
	[{
        name: "main",
        visible: true,
        renderType: RENDER_TYPE.HISTOGRAM,
        color: "#4EC2B4"
    },{
        name: "signal",
        visible: true,
        renderType: RENDER_TYPE.LINE,
        color: "#CCCCCC"
    },{
		name: "fastEMA",
		visible: false
	},{
		name: "slowEMA",
		visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicatorOnArray("macd_for_mql", "MACD for MQL(v1.01)", function (context) {
		var appliedPrice = getIndiParameter(context, "appliedPrice")
		appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
		var dataInput = getDataInput(context, appliedPrice)
		var dataFEMA = getDataOutput(context, "fastEMA")
		var dataSEMA = getDataOutput(context, "slowEMA")
		var dataOutputMain = getDataOutput(context, "main")
		var dataOutputSignal = getDataOutput(context, "signal")

		var fEMA = getIndiParameter(context, "fastEMA")
		var sEMA = getIndiParameter(context, "slowEMA")
		var sgnlSMA = getIndiParameter(context, "signalSMA")

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		if (i == 0) {
			dataFEMA[0] = dataInput[0]
			dataSEMA[0] = dataInput[0]
			dataOutputMain[0] = 0
			i++
		} else if (i == 1) {
		} else {
			i--
		}

		ema(dataInput, dataFEMA, calculatedLength, fEMA)
		ema(dataInput, dataSEMA, calculatedLength, sEMA)

		while (i < dataInput.length) {
			dataOutputMain[i] = dataFEMA[i] - dataSEMA[i]
			i++
		}

		sma(dataOutputMain, dataOutputSignal, calculatedLength, sgnlSMA)
	},[{
		name: "fastEMA",
		value: 12,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "slowEMA",
		value: 26,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "signalSMA",
		value: 9,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
        name: "main",
        visible: true,
        renderType: RENDER_TYPE.HISTOGRAM,
        color: "#4EC2B4"
    },{
        name: "signal",
        visible: true,
        renderType: RENDER_TYPE.LINE,
        color: "#CCCCCC"
    },{
		name: "fastEMA",
		visible: false
	},{
		name: "slowEMA",
		visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("rsi", "Relative Strength Index(v1.01)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataOutput = getDataOutput(context, "rsi")
		var dataOutputHL = getDataOutput(context, "rsiHighLevel")
		var dataOutputLL = getDataOutput(context, "rsiLowLevel")
		var gainTmp = getDataOutput(context, "gainTmp")
		var lossTmp = getDataOutput(context, "lossTmp")

		var period = getIndiParameter(context, "period")
		var highLevel = getIndiParameter(context, "highLevel")
		var lowLevel = getIndiParameter(context, "lowLevel")

		var calculatedLength = getCalculatedLength(context)

		var ptr = null
		var ptr2 = null

		var diff = null
		var gain = null
		var loss = null
		var gainSum = 0
		var lossSum = 0

		if (calculatedLength > 0) {
			ptr = calculatedLength - 1
			ptr2 = calculatedLength - period
		} else {
			for (var i = 0; i < period; i++) {
				dataOutput[i] = 0
				dataOutputHL[i] = highLevel
				dataOutputLL[i] = lowLevel
			}

			ptr = period
			ptr2 = 1

			while (ptr2 <= ptr) {
				diff = dataInput[ptr2] - dataInput[ptr2 - 1]
				if (0 < diff) {
					gainSum += diff
				} else {
					lossSum -= diff
				}
				ptr2++
			}
			gain = gainSum / period
			loss = lossSum / period
			if (0 == (gain + loss)) {
				dataOutput[ptr] = 0
			} else {
				dataOutput[ptr] = 100 * gain / (gain + loss)
			}
			dataOutputHL[ptr] = highLevel
			dataOutputLL[ptr] = lowLevel
			gainTmp[ptr] = gain
			lossTmp[ptr] = loss
			ptr++
		}

		while (ptr < dataInput.length) {
			gain = gainTmp[ptr - 1] * (period - 1)
			loss = lossTmp[ptr - 1] * (period - 1)

			diff = dataInput[ptr] - dataInput[ptr - 1]
			if (0 < diff) {
				gain += diff
			} else {
				loss -= diff
			}
			gain = gain / period
			loss = loss / period

			if (0 == (gain + loss)) {
				dataOutput[ptr] = 0
			} else {
				dataOutput[ptr] = 100 * gain / (gain + loss)
			}
			dataOutputHL[ptr] = highLevel
			dataOutputLL[ptr] = lowLevel
			gainTmp[ptr] = gain
			lossTmp[ptr] = loss
			ptr++
		}
	},[{
		name: "period",
		value: 14,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "highLevel",
		value: 70,
		required: false,
		type: PARAMETER_TYPE.NUMBER,
		range: [1, 100]
	},{
		name: "lowLevel",
		value: 30,
		required: false,
		type: PARAMETER_TYPE.NUMBER,
		range: [1, 100]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	}],
	[{
		name: "rsi",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	},{
		name: "rsiHighLevel",
		visible: true,
		renderType: RENDER_TYPE.DASHARRAY,
		color: "#AAAAAA"
	},{
		name: "rsiLowLevel",
		visible: true,
		renderType: RENDER_TYPE.DASHARRAY,
		color: "#AAAAAA"
	},{
        name: "gainTmp",
        visible: false
    },{
        name: "lossTmp",
        visible: false
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicatorOnArray("rsi_for_mql", "Relative Strength Index for MQL(v1.0)", function (context) {
		var appliedPrice = getIndiParameter(context, "appliedPrice")
		appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
		var dataInput = getDataInput(context, appliedPrice)
		var dataOutput = getDataOutput(context, "rsi")
		var dataOutputHL = getDataOutput(context, "rsiHighLevel")
		var dataOutputLL = getDataOutput(context, "rsiLowLevel")
		var gainTmp = getDataOutput(context, "gainTmp")
		var lossTmp = getDataOutput(context, "lossTmp")

		var period = getIndiParameter(context, "period")
		var highLevel = getIndiParameter(context, "highLevel")
		var lowLevel = getIndiParameter(context, "lowLevel")

		var calculatedLength = getCalculatedLength(context)

		var ptr = null
		var ptr2 = null

		var diff = null
		var gain = null
		var loss = null
		var gainSum = 0
		var lossSum = 0

		if (calculatedLength > 0) {
			ptr = calculatedLength - 1
			ptr2 = calculatedLength - period
		} else {
			for (var i = 0; i < period; i++) {
				dataOutput[i] = 0
				dataOutputHL[i] = highLevel
				dataOutputLL[i] = lowLevel
			}

			ptr = period
			ptr2 = 1

			while (ptr2 <= ptr) {
				diff = dataInput[ptr2] - dataInput[ptr2 - 1]
				if (0 < diff) {
					gainSum += diff
				} else {
					lossSum -= diff
				}
				ptr2++
			}
			gain = gainSum / period
			loss = lossSum / period
			if (0 == (gain + loss)) {
				dataOutput[ptr] = 0
			} else {
				dataOutput[ptr] = 100 * gain / (gain + loss)
			}
			dataOutputHL[ptr] = highLevel
			dataOutputLL[ptr] = lowLevel
			gainTmp[ptr] = gain
			lossTmp[ptr] = loss
			ptr++
		}

		while (ptr < dataInput.length) {
			gain = gainTmp[ptr - 1] * (period - 1)
			loss = lossTmp[ptr - 1] * (period - 1)

			diff = dataInput[ptr] - dataInput[ptr - 1]
			if (0 < diff) {
				gain += diff
			} else {
				loss -= diff
			}
			gain = gain / period
			loss = loss / period

			if (0 == (gain + loss)) {
				dataOutput[ptr] = 0
			} else {
				dataOutput[ptr] = 100 * gain / (gain + loss)
			}
			dataOutputHL[ptr] = highLevel
			dataOutputLL[ptr] = lowLevel
			gainTmp[ptr] = gain
			lossTmp[ptr] = loss
			ptr++
		}
	},[{
		name: "period",
		value: 14,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "highLevel",
		value: 70,
		required: false,
		type: PARAMETER_TYPE.NUMBER,
		range: [1, 100]
	},{
		name: "lowLevel",
		value: 30,
		required: false,
		type: PARAMETER_TYPE.NUMBER,
		range: [1, 100]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
		name: "rsi",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	},{
		name: "rsiHighLevel",
		visible: true,
		renderType: RENDER_TYPE.DASHARRAY,
		color: "#AAAAAA"
	},{
		name: "rsiLowLevel",
		visible: true,
		renderType: RENDER_TYPE.DASHARRAY,
		color: "#AAAAAA"
	},{
        name: "gainTmp",
        visible: false
    },{
        name: "lossTmp",
        visible: false
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("atr", "Average True Range(v1.0)", function (context) {
		var dataInputClose = getDataInput(context, 0)
		var dataInputHigh = getDataInput(context, 1)
		var dataInputLow = getDataInput(context, 2)
		var tmpLine = getDataOutput(context, "tmp")
		var dataOutput = getDataOutput(context, "atr")

		var period = getIndiParameter(context, "period")

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength
		var high = null
		var low = null
		var prevClose = null

		if (i > 0) {
			i--
		} else {
			tmpLine[i] = 0
			i = 1
		}

		while (i < dataInputClose.length) {
			high = dataInputHigh[i]
			low = dataInputLow[i]
			prevClose = dataInputClose[i - 1]

			tmpLine[i] = Math.max(high, prevClose) - Math.min(low, prevClose)

			i++
		}

		sma(tmpLine, dataOutput, calculatedLength, period)
	},[{
		name: "period",
		value: 14,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.HIGH,
		index: 1
	},{
		name: DATA_NAME.LOW,
		index: 2
	}],
	[{
        name: "tmp",
        visible: false
    },{
        name: "atr",
        visible: true,
        renderType: RENDER_TYPE.LINE,
        color: "steelblue"
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("adx", "Average Directional Index(v1.0)", function (context) {
		var dataInputClose = getDataInput(context, 0)
		var dataInputHigh = getDataInput(context, 1)
		var dataInputLow = getDataInput(context, 2)

		var tmpLine = getDataOutput(context, "tmp")
		var plusSdiTmp = getDataOutput(context, "plusSdiTmp")
		var minusSdiTmp = getDataOutput(context, "minusSdiTmp")

		var dataOutputAdx = getDataOutput(context, "adx")
		var dataOutputPlusDi = getDataOutput(context, "plusDi")
		var dataOutputMinusDi = getDataOutput(context, "minusDi")

		var period = getIndiParameter(context, "period")

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		if (i > 0) {
			i--
		} else {
			plusSdiTmp[i] = 0
			minusSdiTmp[i] = 0
			i = 1
		}

		var plusDM = null
		var minusDM = null
		var trueRange = null
		var currH = null
		var currL = null
		var prevH = null
		var prevL = null
		var prevC = null

		while (i < dataInputClose.length) {
			currH = dataInputHigh[i]
			currL = dataInputLow[i]
			prevH = dataInputHigh[i - 1]
			prevL = dataInputLow[i - 1]
			prevC = dataInputClose[i - 1]

			plusDM = currH - prevH
			minusDM = prevL - currL
			if (0 > plusDM) {
				plusDM = 0
			}
			if (0 > minusDM) {
				minusDM = 0
			}
			if (plusDM == minusDM) {
				plusDM = 0
				minusDM = 0
			} else if (plusDM < minusDM) {
				plusDM = 0
			} else if (plusDM > minusDM) {
				minusDM = 0
			}

			trueRange = Math.max(Math.abs(currH - currL), Math.abs(currH - prevC))
			trueRange = Math.max(trueRange, Math.abs(currL - prevC))

			if (0 == trueRange) {
				plusSdiTmp[i] = 0
				minusSdiTmp[i] = 0
			}else{
				plusSdiTmp[i] = 100 * plusDM / trueRange
				minusSdiTmp[i] = 100 * minusDM / trueRange
			}

			i++
		}

		ema(plusSdiTmp, dataOutputPlusDi, calculatedLength, period)
		ema(minusSdiTmp, dataOutputMinusDi, calculatedLength, period)

		i = calculatedLength
		if (i > 0) {
			i--
		}

		while (i < dataInputClose.length) {
			var tmp = Math.abs(dataOutputPlusDi[i] + dataOutputMinusDi[i])

			if (0 == tmp) {
				tmpLine[i] = 0
			} else {
				tmpLine[i] = 100 * (Math.abs(dataOutputPlusDi[i] - dataOutputMinusDi[i]) / tmp)
			}

			i++
		}

		ema(tmpLine, dataOutputAdx, calculatedLength, period)
	},[{
		name: "period",
		value: 14,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.HIGH,
		index: 1
	},{
		name: DATA_NAME.LOW,
		index: 2
	}],
	[{
        name: "adx",
        visible: true,
        renderType: RENDER_TYPE.LINE,
        color: "#CCCCCC"
    },{
        name: "plusDi",
        visible: true,
        renderType: RENDER_TYPE.DASHARRAY,
        color: "#4EC2B4"
    },{
        name: "minusDi",
        visible: true,
        renderType: RENDER_TYPE.DASHARRAY,
        color: "#DE5029"
    },{
        name: "tmp",
        visible: false
    },{
        name: "plusSdiTmp",
        visible: false
    },{
        name: "minusSdiTmp",
        visible: false
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicatorOnArray("adx_for_mql", "Average Directional Index for MQL(v1.0)", function (context) {
		var appliedPrice = getIndiParameter(context, "appliedPrice")
		appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
		var dataInputClose = getDataInput(context, appliedPrice)
		var dataInputHigh = getDataInput(context, 2)
		var dataInputLow = getDataInput(context, 3)

		var tmpLine = getDataOutput(context, "tmp")
		var plusSdiTmp = getDataOutput(context, "plusSdiTmp")
		var minusSdiTmp = getDataOutput(context, "minusSdiTmp")

		var dataOutputAdx = getDataOutput(context, "main")
		var dataOutputPlusDi = getDataOutput(context, "plusDi")
		var dataOutputMinusDi = getDataOutput(context, "minusDi")

		var period = getIndiParameter(context, "period")

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		if (i > 0) {
			i--
		} else {
			plusSdiTmp[i] = 0
			minusSdiTmp[i] = 0
			i = 1
		}

		var plusDM = null
		var minusDM = null
		var trueRange = null
		var currH = null
		var currL = null
		var prevH = null
		var prevL = null
		var prevC = null

		while (i < dataInputClose.length) {
			currH = dataInputHigh[i]
			currL = dataInputLow[i]
			prevH = dataInputHigh[i - 1]
			prevL = dataInputLow[i - 1]
			prevC = dataInputClose[i - 1]

			plusDM = currH - prevH
			minusDM = prevL - currL
			if (0 > plusDM) {
				plusDM = 0
			}
			if (0 > minusDM) {
				minusDM = 0
			}
			if (plusDM == minusDM) {
				plusDM = 0
				minusDM = 0
			} else if (plusDM < minusDM) {
				plusDM = 0
			} else if (plusDM > minusDM) {
				minusDM = 0
			}

			trueRange = Math.max(Math.abs(currH - currL), Math.abs(currH - prevC))
			trueRange = Math.max(trueRange, Math.abs(currL - prevC))

			if (0 == trueRange) {
				plusSdiTmp[i] = 0
				minusSdiTmp[i] = 0
			}else{
				plusSdiTmp[i] = 100 * plusDM / trueRange
				minusSdiTmp[i] = 100 * minusDM / trueRange
			}

			i++
		}

		ema(plusSdiTmp, dataOutputPlusDi, calculatedLength, period)
		ema(minusSdiTmp, dataOutputMinusDi, calculatedLength, period)

		i = calculatedLength
		if (i > 0) {
			i--
		}

		while (i < dataInputClose.length) {
			var tmp = Math.abs(dataOutputPlusDi[i] + dataOutputMinusDi[i])

			if (0 == tmp) {
				tmpLine[i] = 0
			} else {
				tmpLine[i] = 100 * (Math.abs(dataOutputPlusDi[i] - dataOutputMinusDi[i]) / tmp)
			}

			i++
		}

		ema(tmpLine, dataOutputAdx, calculatedLength, period)
	},[{
		name: "period",
		value: 14,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
        name: "main",
        visible: true,
        renderType: RENDER_TYPE.LINE,
        color: "#CCCCCC"
    },{
        name: "plusDi",
        visible: true,
        renderType: RENDER_TYPE.DASHARRAY,
        color: "#4EC2B4"
    },{
        name: "minusDi",
        visible: true,
        renderType: RENDER_TYPE.DASHARRAY,
        color: "#DE5029"
    },{
        name: "tmp",
        visible: false
    },{
        name: "plusSdiTmp",
        visible: false
    },{
        name: "minusSdiTmp",
        visible: false
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("sar", "Parabolic SAR(v1.01)", function (context) {
		var dataInputHigh = getDataInput(context, 0)
		var dataInputLow = getDataInput(context, 1)

		var dataOutput = getDataOutput(context, "sar")
		var dataOutputIsLong = getDataOutput(context, "isLong")
		var dataOutputAf = getDataOutput(context, "af")
		var dataOutputEp = getDataOutput(context, "ep")

		var acceleration = getIndiParameter(context, "acceleration")
		var afMax = getIndiParameter(context, "afMax")

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		var prevH = null
		var prevL = null
		var currH = null
		var currL = null
		var sar = null
		var isLong = null
		var af = acceleration
		var ep = null

		if (i > 0) {
			i -= 2
			prevH = dataInputHigh[i - 1]
			prevL = dataInputLow[i - 1]
			isLong = dataOutputIsLong[i]
			sar = dataOutput[i]
			af = dataOutputAf[i]
			ep = dataOutputEp[i]
		} else {
			dataOutput[i] = 0
			dataOutputIsLong[i] = true
			dataOutputAf[i] = af
			dataOutputEp[i] = 0

			i = 1

			prevH = dataInputHigh[i - 1]
			prevL = dataInputLow[i - 1]
			isLong = true
			sar = prevL
			ep = prevH
		}

		while (i < dataInputHigh.length) {
			currH = dataInputHigh[i]
			currL = dataInputLow[i]

			if (isLong) {
				if (currL <= sar) {
					isLong = false
					sar = Math.max(ep, currH, prevH)

					dataOutput[i] = sar

					af = acceleration
					ep = currL
					sar = sar + af * (ep - sar)
					sar = Math.max(sar, currH, prevH)
				} else {
					dataOutput[i] = sar

					if (currH > ep) {
						ep = currH
						if (af - dataOutputAf[i - 1] <= 0) {
							af += acceleration
						}
						if (af > afMax) {
							af = afMax
						}
					}
					sar = sar + af * (ep - sar)
					sar = Math.min(sar, currL, prevL)
				}
			} else {
				if (currH >= sar) {
					isLong = true
					sar = Math.min(ep, currL, prevL)

					dataOutput[i] = sar

					af = acceleration
					ep = currH
					sar = sar + af * (ep - sar)
					sar = Math.min(sar, currL, prevL)
				} else {
					dataOutput[i] = sar

					if (currL < ep) {
						ep = currL
						if (af - dataOutputAf[i - 1] <= 0) {
							af += acceleration
						}
						if (af > afMax) {
							af = afMax
						}
					}
					sar = sar + af * (ep - sar)
					sar = Math.max(sar, currH, prevH)
				}
			}

			dataOutputIsLong[i] = isLong
			dataOutputAf[i] = af
			dataOutputEp[i] = ep

			i++

			prevH = currH
			prevL = currL
		}
	},[{
		name: "acceleration",
		value: 0.02,
		required: true,
		type: PARAMETER_TYPE.NUMBER,
		range: [0.01, 0.1]
	},{
		name: "afMax",
		value: 0.2,
		required: true,
		type: PARAMETER_TYPE.NUMBER,
		range: [0.1, 1]
	}],
	[{
		name: DATA_NAME.HIGH,
		index: 0
	},{
		name: DATA_NAME.LOW,
		index: 1
	}],
	[{
		name: "sar",
		visible: true,
		renderType: RENDER_TYPE.ROUND,
		color: "steelblue"
	},{
		name: "isLong",
		visible: false
	},{
		name: "af",
		visible: false
	},{
		name: "ep",
		visible: false
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("stochastic", "Stochastic Ocillator(v1.01)", function (context) {
		var dataInputClose = getDataInput(context, 0)
		var dataInputHigh = getDataInput(context, 1)
		var dataInputLow = getDataInput(context, 2)

		var highestTmp = getDataOutput(context, "highestTmp")
		var lowestTmp = getDataOutput(context, "lowestTmp")

		var dataOutputMain = getDataOutput(context, "main")
		var dataOutputSignal = getDataOutput(context, "signal")

		var kP = getIndiParameter(context, "KPeriod")
		var slowing = getIndiParameter(context, "slowing")
		var dP = getIndiParameter(context, "DPeriod")
		var method = getIndiParameter(context, "method")

		var calculatedLength = getCalculatedLength(context)
		var ptr = calculatedLength
		var maxParam = Math.max(kP + slowing - 1, dP)

		if (ptr > 0) {
			ptr--
		} else {
			ptr = maxParam - 1

			for (var i = 1; i < maxParam; i++) {
				dataOutputMain[ptr - i] = 0
				highestTmp[ptr - i] = 0
				lowestTmp[ptr - i] = 0
			}
		}

		while (ptr < dataInputClose.length) {
			var tmp = null
			var highest = -Number.MAX_VALUE
			var lowest = Number.MAX_VALUE

			for (var ptr2 = (ptr - kP + 1); ptr2 <= ptr; ptr2++){
				tmp = dataInputHigh[ptr2]
				if (highest < tmp) {
					highest = tmp
				}

				tmp = dataInputLow[ptr2]
				if (lowest > tmp) {
					lowest = tmp
				}
			}

			highestTmp[ptr] = highest
			lowestTmp[ptr] = lowest

			ptr++
		}

		ptr = calculatedLength

		if (ptr > 0) {
			ptr--
		} else {
			ptr = maxParam - 1
		}

		while (ptr < dataInputClose.length) {
			var highestSum = 0
			var lowestSum = 0

			for (var ptr2 = ptr - slowing + 1; ptr2 <= ptr; ptr2++) {
				highestSum += highestTmp[ptr2] - lowestTmp[ptr2]
				lowestSum += dataInputClose[ptr2] - lowestTmp[ptr2]
			}

			if (0 == highestSum) {
				dataOutputMain[ptr] = 100
			}else{
				dataOutputMain[ptr] = lowestSum / highestSum * 100
			}

			ptr++
		}

		if ("sma" == method) {
			sma(dataOutputMain, dataOutputSignal, calculatedLength, dP)
		} else if ("ema" == method) {
			ema(dataOutputMain, dataOutputSignal, calculatedLength, dP)
		} else if ("smma" == method) {
			smma(dataOutputMain, dataOutputSignal, calculatedLength, dP)
		} else {
			lwma(dataOutputMain, dataOutputSignal, calculatedLength, dP)
		}
	},[{
		name: "KPeriod",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "slowing",
		value: 3,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "DPeriod",
		value: 3,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "method",
		value: "sma",
		required: true,
		type: PARAMETER_TYPE.STRING
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.HIGH,
		index: 1
	},{
		name: DATA_NAME.LOW,
		index: 2
	}],
	[{
        name: "main",
        visible: true,
        renderType: RENDER_TYPE.LINE,
        color: "#DE5029"
    },{
        name: "signal",
        visible: true,
        renderType: RENDER_TYPE.DASHARRAY,
        color: "#4EC2B4"
    },{
        name: "highestTmp",
        visible: false
    },{
        name: "lowestTmp",
        visible: false
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("alligator", "A series of Bill Williams' indicators(v1.01)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataOutputJaws = getDataOutput(context, "jaws")
		var dataOutputTeeth = getDataOutput(context, "teeth")
		var dataOutputLips = getDataOutput(context, "lips")

		var method = getIndiParameter(context, "method")
		var jawsPeriod = getIndiParameter(context, "jawsPeriod")
		var jawsShift = getIndiParameter(context, "jawsShift")
		var teethPeriod = getIndiParameter(context, "teethPeriod")
		var teethShift = getIndiParameter(context, "teethShift")
		var lipsPeriod = getIndiParameter(context, "lipsPeriod")
		var lipsShift = getIndiParameter(context, "lipsShift")

		var calculatedLength = getCalculatedLength(context)

		if ("smma" == method) {
			smma(dataInput, dataOutputJaws, calculatedLength, jawsPeriod)
			smma(dataInput, dataOutputTeeth, calculatedLength, teethPeriod)
			smma(dataInput, dataOutputLips, calculatedLength, lipsPeriod)
		} else if ("sma" == method) {
			sma(dataInput, dataOutputJaws, calculatedLength, jawsPeriod)
			sma(dataInput, dataOutputTeeth, calculatedLength, teethPeriod)
			sma(dataInput, dataOutputLips, calculatedLength, lipsPeriod)
		} else if("ema" == method) {
			ema(dataInput, dataOutputJaws, calculatedLength, jawsPeriod)
			ema(dataInput, dataOutputTeeth, calculatedLength, teethPeriod)
			ema(dataInput, dataOutputLips, calculatedLength, lipsPeriod)
		} else {
			lwma(dataInput, dataOutputJaws, calculatedLength, jawsPeriod)
			lwma(dataInput, dataOutputTeeth, calculatedLength, teethPeriod)
			lwma(dataInput, dataOutputLips, calculatedLength, lipsPeriod)
		}

		if (calculatedLength == 0) {
			setIndiShift(context, "jaws", jawsShift)
			setIndiShift(context, "teeth", teethShift)
			setIndiShift(context, "lips", lipsShift)
		}
	},[{
		name: "jawsPeriod",
		value: 13,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "jawsShift",
		value: 8,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "teethPeriod",
		value: 8,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "teethShift",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "lipsPeriod",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "lipsShift",
		value: 3,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "method",
		value: "smma",
		required: true,
		type: PARAMETER_TYPE.STRING
	}],
	[{
		name: DATA_NAME.HL2,
		index: 0
	}],
	[{
		name: "jaws",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	},{
		name: "teeth",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "#4EC2B4"
	},{
		name: "lips",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "#DE5029"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicatorOnArray("alligator_for_mql", "A series of Bill Williams' indicators for MQL(v1.0)", function (context) {
		var appliedPrice = getIndiParameter(context, "appliedPrice")
		appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
		var dataInput = getDataInput(context, appliedPrice)
		var dataOutputJaws = getDataOutput(context, "jaws")
		var dataOutputTeeth = getDataOutput(context, "teeth")
		var dataOutputLips = getDataOutput(context, "lips")

		var method = getIndiParameter(context, "method")
		var jawsPeriod = getIndiParameter(context, "jawsPeriod")
		var jawsShift = getIndiParameter(context, "jawsShift")
		var teethPeriod = getIndiParameter(context, "teethPeriod")
		var teethShift = getIndiParameter(context, "teethShift")
		var lipsPeriod = getIndiParameter(context, "lipsPeriod")
		var lipsShift = getIndiParameter(context, "lipsShift")

		var calculatedLength = getCalculatedLength(context)

		if ("smma" == method) {
			smma(dataInput, dataOutputJaws, calculatedLength, jawsPeriod)
			smma(dataInput, dataOutputTeeth, calculatedLength, teethPeriod)
			smma(dataInput, dataOutputLips, calculatedLength, lipsPeriod)
		} else if ("sma" == method) {
			sma(dataInput, dataOutputJaws, calculatedLength, jawsPeriod)
			sma(dataInput, dataOutputTeeth, calculatedLength, teethPeriod)
			sma(dataInput, dataOutputLips, calculatedLength, lipsPeriod)
		} else if("ema" == method) {
			ema(dataInput, dataOutputJaws, calculatedLength, jawsPeriod)
			ema(dataInput, dataOutputTeeth, calculatedLength, teethPeriod)
			ema(dataInput, dataOutputLips, calculatedLength, lipsPeriod)
		} else {
			lwma(dataInput, dataOutputJaws, calculatedLength, jawsPeriod)
			lwma(dataInput, dataOutputTeeth, calculatedLength, teethPeriod)
			lwma(dataInput, dataOutputLips, calculatedLength, lipsPeriod)
		}

		if (calculatedLength == 0) {
			setIndiShift(context, "jaws", jawsShift)
			setIndiShift(context, "teeth", teethShift)
			setIndiShift(context, "lips", lipsShift)
		}
	},[{
		name: "jawsPeriod",
		value: 13,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "jawsShift",
		value: 8,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "teethPeriod",
		value: 8,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "teethShift",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "lipsPeriod",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "lipsShift",
		value: 3,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	},{
		name: "method",
		value: "smma",
		required: true,
		type: PARAMETER_TYPE.STRING
	},{
		name: "appliedPrice",
		value: 4,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
		name: "jaws",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	},{
		name: "teeth",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "#4EC2B4"
	},{
		name: "lips",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "#DE5029"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("fractals", "Fractals(v1.0)", function (context) {
	    var dataInputHigh = getDataInput(context, 0)
	    var dataInputLow = getDataInput(context, 1)
	    var dataOutputUp = getDataOutput(context, "fractalsUp")
	    var dataOutputDown = getDataOutput(context, "fractalsDown")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = null

	    if (calculatedLength > 0) {
	        ptr = calculatedLength - 3
	    } else {
	        for (var i = 0; i < dataInputHigh.length; i++) {
	            dataOutputUp[i] = 0
	            dataOutputDown[i] = 0
	        }

	        ptr = 2
	    }

	    var bFound = false
	    var highest = null
	    var lowest = null

	    while (ptr < dataInputHigh.length - 2) {
	        bFound = false
	        highest = dataInputHigh[ptr]

	        if (highest > dataInputHigh[ptr - 1] && highest > dataInputHigh[ptr - 2] && highest > dataInputHigh[ptr + 1] && highest > dataInputHigh[ptr + 2]) {
	            bFound = true
	            dataOutputUp[ptr] = highest
	        }
	        if (!bFound && ptr >= 3) {
	            if (highest > dataInputHigh[ptr - 1] && highest > dataInputHigh[ptr - 2] && highest > dataInputHigh[ptr - 3] && highest > dataInputHigh[ptr + 1] && highest > dataInputHigh[ptr + 2]) {
	                bFound = true
	                dataOutputUp[ptr] = highest
	            }
	        }
	        if (!bFound && ptr >= 4) {
	            if (highest > dataInputHigh[ptr - 1] && highest > dataInputHigh[ptr - 2] && highest > dataInputHigh[ptr - 3] && highest > dataInputHigh[ptr - 4] && highest > dataInputHigh[ptr + 1] && highest > dataInputHigh[ptr + 2]) {
	                bFound = true
	                dataOutputUp[ptr] = highest
	            }
	        }
	        if (!bFound && ptr >= 5) {
	            if (highest > dataInputHigh[ptr - 1] && highest > dataInputHigh[ptr - 2] && highest > dataInputHigh[ptr - 3] && highest > dataInputHigh[ptr - 4] && highest > dataInputHigh[ptr - 5] && highest > dataInputHigh[ptr + 1] && highest > dataInputHigh[ptr + 2]) {
	                bFound = true
	                dataOutputUp[ptr] = highest
	            }
	        }
	        if (!bFound && ptr >= 6) {
	            if (highest > dataInputHigh[ptr - 1] && highest > dataInputHigh[ptr - 2] && highest > dataInputHigh[ptr - 3] && highest > dataInputHigh[ptr - 4] && highest > dataInputHigh[ptr - 5] && highest > dataInputHigh[ptr - 6] && highest > dataInputHigh[ptr + 1] && highest > dataInputHigh[ptr + 2]) {
	                bFound = true
	                dataOutputUp[ptr] = highest
	            }
	        }

	        bFound = false
	        lowest = dataInputLow[ptr]

	        if (lowest < dataInputLow[ptr - 1] && lowest < dataInputLow[ptr - 2] && lowest < dataInputLow[ptr + 1] && lowest < dataInputLow[ptr + 2]) {
	            bFound = true
	            dataOutputDown[ptr] = lowest
	        }
	        if (!bFound && ptr >= 3) {
	            if (lowest < dataInputLow[ptr - 1] && lowest < dataInputLow[ptr - 2] && lowest < dataInputLow[ptr - 3] && lowest < dataInputLow[ptr + 1] && lowest < dataInputLow[ptr + 2]) {
	                bFound = true
	                dataOutputDown[ptr] = lowest
	            }
	        }
	        if (!bFound && ptr >= 4) {
	            if (lowest < dataInputLow[ptr - 1] && lowest < dataInputLow[ptr - 2] && lowest < dataInputLow[ptr - 3] && lowest < dataInputLow[ptr - 4] && lowest < dataInputLow[ptr + 1] && lowest < dataInputLow[ptr + 2]) {
	                bFound = true
	                dataOutputDown[ptr] = lowest
	            }
	        }
	        if (!bFound && ptr >= 5) {
	            if (lowest < dataInputLow[ptr - 1] && lowest < dataInputLow[ptr - 2] && lowest < dataInputLow[ptr - 3] && lowest < dataInputLow[ptr - 4] && lowest < dataInputLow[ptr - 5] && lowest < dataInputLow[ptr + 1] && lowest < dataInputLow[ptr + 2]) {
	                bFound = true
	                dataOutputDown[ptr] = lowest
	            }
	        }
	        if (!bFound && ptr >= 6) {
	            if (lowest < dataInputLow[ptr - 1] && lowest < dataInputLow[ptr - 2] && lowest < dataInputLow[ptr - 3] && lowest < dataInputLow[ptr - 4] && lowest < dataInputLow[ptr - 5] && lowest < dataInputLow[ptr - 6] && lowest < dataInputLow[ptr + 1] && lowest < dataInputLow[ptr + 2]) {
	                bFound = true
	                dataOutputDown[ptr] = lowest
	            }
	        }

	        ptr++
	    }
	},[],
	[{
	    name: DATA_NAME.HIGH,
	    index: 0
	},{
	    name: DATA_NAME.LOW,
	    index: 1
	}],
	[{
	    name: "fractalsUp",
	    visible: true,
	    renderType: RENDER_TYPE.ROUND,
	    color: "green"
	},{
	    name: "fractalsDown",
	    visible: true,
	    renderType: RENDER_TYPE.ROUND,
	    color: "red"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("bands", "Bollinger Bands(v1.0)", function (context) {
	    var dataInput = getDataInput(context, 0)
	    var dataOutput = getDataOutput(context, "ma")
	    var dataOutputUpper = getDataOutput(context, "upper")
	    var dataOutputLower = getDataOutput(context, "lower")

	    var method = getIndiParameter(context, "method")
	    var period = getIndiParameter(context, "period")
	    var deviations = getIndiParameter(context, "deviations")
	    var shift = getIndiParameter(context, "shift")

	    var calculatedLength = getCalculatedLength(context)

	    if ("smma" == method) {
	        smma(dataInput, dataOutput, calculatedLength, period)
	    } else if("ema" == method) {
	        ema(dataInput, dataOutput, calculatedLength, period)
	    } else if ("lwma" == method) {
	        lwma(dataInput, dataOutput, calculatedLength, period)
	    } else {
	        sma(dataInput, dataOutput, calculatedLength, period)
	    }

	    var ptr = null
	    var ptr2 = null

	    if (calculatedLength > 0) {
	        ptr = calculatedLength - 1
	    } else {
	        for (var i = 0; i < period - 1; i++) {
	            dataOutputUpper[i] = 0
	            dataOutputLower[i] = 0
	        }

			ptr = period - 1
	    }

	    var devVal, sum, midVal, tmp

		while (ptr < dataInput.length) {
			sum = 0
			ptr2 = ptr - period + 1
			midVal = dataOutput[ptr]
			while (ptr2 <= ptr) {
				tmp = dataInput[ptr2] - midVal
				sum += tmp * tmp
				ptr2++
			}
			devVal = deviations * Math.sqrt(sum / period)
			dataOutputUpper[ptr] = midVal + devVal
			dataOutputLower[ptr] = midVal - devVal

			ptr++
		}

	    if (calculatedLength == 0) {
	        setIndiShift(context, "ma", shift)
	        setIndiShift(context, "upper", shift)
	        setIndiShift(context, "lower", shift)
	    }
	},[{
	    name: "period",
	    value: 5,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "deviations",
	    value: 2.0,
	    required: true,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [0, 10]
	},{
	    name: "shift",
	    value: 0,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [-30, 30]
	},{
	    name: "method",
	    value: "sma",
	    required: true,
	    type: PARAMETER_TYPE.STRING
	}],
	[{
	    name: DATA_NAME.CLOSE,
	    index: 0
	}],
	[{
	    name: "ma",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "upper",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "steelblue"
	},{
	    name: "lower",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicatorOnArray("bands_for_mql", "Bollinger Bands for MQL(v1.0)", function (context) {
			var appliedPrice = getIndiParameter(context, "appliedPrice")
			appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
			var dataInput = getDataInput(context, appliedPrice)
	    var dataOutput = getDataOutput(context, "main")
	    var dataOutputUpper = getDataOutput(context, "upper")
	    var dataOutputLower = getDataOutput(context, "lower")

	    var method = getIndiParameter(context, "method")
	    var period = getIndiParameter(context, "period")
	    var deviations = getIndiParameter(context, "deviations")
	    var shift = getIndiParameter(context, "shift")

	    var calculatedLength = getCalculatedLength(context)

	    if ("smma" == method) {
	        smma(dataInput, dataOutput, calculatedLength, period)
	    } else if("ema" == method) {
	        ema(dataInput, dataOutput, calculatedLength, period)
	    } else if ("lwma" == method) {
	        lwma(dataInput, dataOutput, calculatedLength, period)
	    } else {
	        sma(dataInput, dataOutput, calculatedLength, period)
	    }

	    var ptr = null
	    var ptr2 = null

	    if (calculatedLength > 0) {
	        ptr = calculatedLength - 1
	    } else {
	        for (var i = 0; i < period - 1; i++) {
	            dataOutputUpper[i] = 0
	            dataOutputLower[i] = 0
	        }

			ptr = period - 1
	    }

	    var devVal, sum, midVal, tmp

		while (ptr < dataInput.length) {
			sum = 0
			ptr2 = ptr - period + 1
			midVal = dataOutput[ptr]
			while (ptr2 <= ptr) {
				tmp = dataInput[ptr2] - midVal
				sum += tmp * tmp
				ptr2++
			}
			devVal = deviations * Math.sqrt(sum / period)
			dataOutputUpper[ptr] = midVal + devVal
			dataOutputLower[ptr] = midVal - devVal

			ptr++
		}

	    if (calculatedLength == 0) {
	        setIndiShift(context, "ma", shift)
	        setIndiShift(context, "upper", shift)
	        setIndiShift(context, "lower", shift)
	    }
	},[{
	    name: "period",
	    value: 5,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "deviations",
	    value: 2.0,
	    required: true,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [0, 10]
	},{
	    name: "shift",
	    value: 0,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [-30, 30]
	},{
	    name: "method",
	    value: "sma",
	    required: true,
	    type: PARAMETER_TYPE.STRING
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
	    name: "main",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "upper",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "steelblue"
	},{
	    name: "lower",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("envelopes", "Envelopes(v1.0)", function (context) {
	    var dataInput = getDataInput(context, 0)
	    var dataOutput = getDataOutput(context, "ma")
	    var dataOutputUpper = getDataOutput(context, "upper")
	    var dataOutputLower = getDataOutput(context, "lower")

	    var method = getIndiParameter(context, "method")
	    var period = getIndiParameter(context, "period")
	    var deviations = getIndiParameter(context, "deviations")
	    var shift = getIndiParameter(context, "shift")

	    var calculatedLength = getCalculatedLength(context)

	    if ("smma" == method) {
	        smma(dataInput, dataOutput, calculatedLength, period)
	    } else if("ema" == method) {
	        ema(dataInput, dataOutput, calculatedLength, period)
	    } else if ("lwma" == method) {
	        lwma(dataInput, dataOutput, calculatedLength, period)
	    } else {
	        sma(dataInput, dataOutput, calculatedLength, period)
	    }

	    var ptr = null

	    if (calculatedLength > 0) {
	        ptr = calculatedLength - 1
	    } else {
	        for (var i = 0; i < period - 1; i++) {
	            dataOutputUpper[i] = 0
	            dataOutputLower[i] = 0
	        }

	        ptr = period - 1
	    }

	    while (ptr < dataInput.length) {
	        dataOutputUpper[ptr] = (1 + deviations / 100) * dataOutput[ptr]
			dataOutputLower[ptr] = (1 - deviations / 100) * dataOutput[ptr]

	        ptr++
	    }

	    if (calculatedLength == 0) {
	        setIndiShift(context, "ma", shift)
	        setIndiShift(context, "upper", shift)
	        setIndiShift(context, "lower", shift)
	    }
	},[{
	    name: "period",
	    value: 5,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "deviations",
	    value: 0.05,
	    required: true,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [0, 10]
	},{
	    name: "shift",
	    value: 0,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [-30, 30]
	},{
	    name: "method",
	    value: "sma",
	    required: true,
	    type: PARAMETER_TYPE.STRING
	}],
	[{
	    name: DATA_NAME.CLOSE,
	    index: 0
	}],
	[{
	    name: "ma",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "upper",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "steelblue"
	},{
	    name: "lower",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicatorOnArray("envelopes_for_mql", "Envelopes for MQL(v1.0)", function (context) {
			var appliedPrice = getIndiParameter(context, "appliedPrice")
			appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
			var dataInput = getDataInput(context, appliedPrice)
	    var dataOutput = getDataOutput(context, "main")
	    var dataOutputUpper = getDataOutput(context, "upper")
	    var dataOutputLower = getDataOutput(context, "lower")

	    var method = getIndiParameter(context, "method")
	    var period = getIndiParameter(context, "period")
	    var deviations = getIndiParameter(context, "deviations")
	    var shift = getIndiParameter(context, "shift")

	    var calculatedLength = getCalculatedLength(context)

	    if ("smma" == method) {
	        smma(dataInput, dataOutput, calculatedLength, period)
	    } else if("ema" == method) {
	        ema(dataInput, dataOutput, calculatedLength, period)
	    } else if ("lwma" == method) {
	        lwma(dataInput, dataOutput, calculatedLength, period)
	    } else {
	        sma(dataInput, dataOutput, calculatedLength, period)
	    }

	    var ptr = null

	    if (calculatedLength > 0) {
	        ptr = calculatedLength - 1
	    } else {
	        for (var i = 0; i < period - 1; i++) {
	            dataOutputUpper[i] = 0
	            dataOutputLower[i] = 0
	        }

	        ptr = period - 1
	    }

	    while (ptr < dataInput.length) {
	        dataOutputUpper[ptr] = (1 + deviations / 100) * dataOutput[ptr]
			dataOutputLower[ptr] = (1 - deviations / 100) * dataOutput[ptr]

	        ptr++
	    }

	    if (calculatedLength == 0) {
	        setIndiShift(context, "ma", shift)
	        setIndiShift(context, "upper", shift)
	        setIndiShift(context, "lower", shift)
	    }
	},[{
	    name: "period",
	    value: 5,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "deviations",
	    value: 0.05,
	    required: true,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [0, 10]
	},{
	    name: "shift",
	    value: 0,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [-30, 30]
	},{
	    name: "method",
	    value: "sma",
	    required: true,
	    type: PARAMETER_TYPE.STRING
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
	    name: "main",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "upper",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "steelblue"
	},{
	    name: "lower",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("ac", "Accelerator Oscillator(v1.0)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataUp = getDataOutput(context, "up")
		var dataDown = getDataOutput(context, "down")
		var dataFSMA = getDataOutput(context, "fastSMA")
		var dataSSMA = getDataOutput(context, "slowSMA")
		var dataOutputMain = getDataOutput(context, "main")
		var dataOutputSignal = getDataOutput(context, "signal")

		var fSMA = 5
		var sSMA = 34
		var sgnlSMA = 5

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		if (i == 0) {
			dataFSMA[0] = dataInput[0]
			dataSSMA[0] = dataInput[0]
			dataOutputMain[0] = 0
			i++
		} else if (i == 1) {
		} else {
			i--
		}

		sma(dataInput, dataFSMA, calculatedLength, fSMA)
		sma(dataInput, dataSSMA, calculatedLength, sSMA)

		while (i < dataInput.length) {
			dataOutputMain[i] = dataFSMA[i] - dataSSMA[i]
			i++
		}

		sma(dataOutputMain, dataOutputSignal, calculatedLength, sgnlSMA)

		i = calculatedLength

		if (i == 0) {
			i++
		} else if (i == 1) {
		} else {
			i--
		}

		var prev, curr

		while (i < dataInput.length) {
			prev = dataOutputMain[i - 1] - dataOutputSignal[i - 1]
			curr = dataOutputMain[i] - dataOutputSignal[i]

			if (prev <= curr) {
				dataUp[i] = curr
				dataDown[i] = 0
			} else {
				dataUp[i] = 0
				dataDown[i] = curr
			}

			i++
		}
	},[],
	[{
		name: DATA_NAME.HL2,
		index: 0
	}],
	[{
        name: "up",
        visible: true,
        renderType: RENDER_TYPE.HISTOGRAM,
        color: "#6CBA81"
    },{
        name: "down",
        visible: true,
        renderType: RENDER_TYPE.HISTOGRAM,
        color: "#ECAE93"
    },{
		name: "fastSMA",
		visible: false
	},{
		name: "slowSMA",
		visible: false
	},{
        name: "main",
        visible: false
    },{
        name: "signal",
        visible: false
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

    importBuiltInIndicator("ao", "Awesome Oscillator(v1.0)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataUp = getDataOutput(context, "up")
		var dataDown = getDataOutput(context, "down")
		var dataFSMA = getDataOutput(context, "fastSMA")
		var dataSSMA = getDataOutput(context, "slowSMA")

		var fSMA = 5
		var sSMA = 34
		var sgnlSMA = 5

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		if (i == 0) {
			dataFSMA[0] = dataInput[0]
			dataSSMA[0] = dataInput[0]
			i++
		} else if (i == 1) {
		} else {
			i--
		}

		sma(dataInput, dataFSMA, calculatedLength, fSMA)
		sma(dataInput, dataSSMA, calculatedLength, sSMA)

		var prev, curr

		while (i < dataInput.length) {
			prev = dataFSMA[i - 1] - dataSSMA[i - 1]
			curr = dataFSMA[i] - dataSSMA[i]

			if (prev <= curr) {
				dataUp[i] = curr
				dataDown[i] = 0
			} else {
				dataUp[i] = 0
				dataDown[i] = curr
			}

			i++
		}
	},[],
	[{
		name: DATA_NAME.HL2,
		index: 0
	}],
	[{
        name: "up",
        visible: true,
        renderType: RENDER_TYPE.HISTOGRAM,
        color: "#6CBA81"
    },{
        name: "down",
        visible: true,
        renderType: RENDER_TYPE.HISTOGRAM,
        color: "#ECAE93"
    },{
		name: "fastSMA",
		visible: false
	},{
		name: "slowSMA",
		visible: false
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("ichimoku", "Ichimoku Kinko Hyo(v1.0)", function (context) {
	    var dataInputHigh = getDataInput(context, 0)
	    var dataInputLow = getDataInput(context, 1)
	    var dataInputClose = getDataInput(context, 2)
	    var dataOutputTenkan = getDataOutput(context, "tenkan")
	    var dataOutputKijun = getDataOutput(context, "kijun")
	    var dataOutputChikou = getDataOutput(context, "chikou")
	    var dataOutputSpanA = getDataOutput(context, "spana")
	    var dataOutputSpanB = getDataOutput(context, "spanb")

	    var tenkan = getIndiParameter(context, "tenkan")
	    var kijun = getIndiParameter(context, "kijun")
	    var senkou = getIndiParameter(context, "senkou")
		var spanA;
		if (kijun < tenkan) {
			spanA = tenkan;
		}else{
			spanA = kijun;
		}

	    var calculatedLength = getCalculatedLength(context)
	    var ptr = calculatedLength
	    var maxParam = Math.max(tenkan, kijun, spanA, senkou)

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = maxParam - 1

	        for (var i = 1; i < maxParam; i++) {
				dataOutputTenkan[ptr - i] = 0
				dataOutputKijun[ptr - i] = 0
				dataOutputChikou[ptr - i] = 0
				dataOutputSpanA[ptr - i] = 0
				dataOutputSpanB[ptr - i] = 0
			}
	    }

		var ptr2, tmp, highest, lowest

		while (ptr < dataInputHigh.length) {
	        tmp = null
	        highest = -Number.MAX_VALUE
	        lowest = Number.MAX_VALUE

			ptr2 = ptr - tenkan + 1

			while (ptr2 <= ptr) {
				tmp = dataInputHigh[ptr2]
				if (highest < tmp) {
					highest = tmp
				}

				tmp = dataInputLow[ptr2]
				if (lowest > tmp) {
					lowest = tmp
				}

				ptr2++
			}

			dataOutputTenkan[ptr] = (highest + lowest) / 2

	        tmp = null
	        highest = -Number.MAX_VALUE
	        lowest = Number.MAX_VALUE

			ptr2 = ptr - kijun + 1

			while (ptr2 <= ptr) {
	            tmp = dataInputHigh[ptr2]
				if (highest < tmp) {
					highest = tmp
				}

				tmp = dataInputLow[ptr2]
				if (lowest > tmp) {
					lowest = tmp
				}

				ptr2++
			}

			dataOutputKijun[ptr] = (highest + lowest) / 2

			dataOutputSpanA[ptr] = (dataOutputTenkan[ptr] + dataOutputKijun[ptr]) / 2

	        tmp = null
	        highest = -Number.MAX_VALUE
	        lowest = Number.MAX_VALUE

			ptr2 = ptr - senkou + 1

	        while (ptr2 <= ptr) {
	            tmp = dataInputHigh[ptr2]
				if (highest < tmp) {
					highest = tmp
				}

				tmp = dataInputLow[ptr2]
				if (lowest > tmp) {
					lowest = tmp
				}

				ptr2++
			}

			dataOutputSpanB[ptr] = (highest + lowest) / 2

			dataOutputChikou[ptr] = dataInputClose[ptr]

			ptr++
		}

	    if (calculatedLength == 0) {
	        setIndiShift(context, "chikou", -kijun)
	        setIndiShift(context, "spana", kijun)
	        setIndiShift(context, "spanb", kijun)
	    }
	},[{
	    name: "tenkan",
	    value: 9,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "kijun",
	    value: 26,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "senkou",
	    value: 52,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	}],
	[{
	    name: DATA_NAME.HIGH,
	    index: 0
	},{
	    name: DATA_NAME.LOW,
	    index: 1
	},{
	    name: DATA_NAME.CLOSE,
	    index: 2
	}],
	[{
	    name: "tenkan",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "#DE5029"
	},{
	    name: "kijun",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "chikou",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#4EC2B4"
	},{
	    name: "spana",
	    visible: true,
	    renderType: RENDER_TYPE.ROUND,
	    color: "steelblue"
	},{
	    name: "spanb",
	    visible: true,
	    renderType: RENDER_TYPE.ROUND,
	    color: "#CCCCCC"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)

	importBuiltInIndicator("bears", "Bears Power(v1.0)", function (context) {
	    var dataInput = getDataInput(context, 0)
	    var dataInputLow = getDataInput(context, 1)
	    var dataOutput = getDataOutput(context, "bears")
	    var dataOutputEma = getDataOutput(context, "ema")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	        }
	    }

	    ema(dataInput, dataOutputEma, calculatedLength, period)

	    while (ptr < dataInput.length) {
	        dataOutput[ptr] = dataInputLow[ptr] - dataOutputEma[ptr]
	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	}],
	[{
	    name: DATA_NAME.CLOSE,
	    index: 0
	},{
	    name: DATA_NAME.LOW,
	    index: 1
	}],
	[{
	    name: "bears",
	    visible: true,
	    renderType: RENDER_TYPE.HISTOGRAM,
	    color: "steelblue"
	},{
	    name: "ema",
	    visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicatorOnArray("bears_for_mql", "Bears Power for MQL(v1.0)", function (context) {
			var appliedPrice = getIndiParameter(context, "appliedPrice")
			appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
			var dataInput = getDataInput(context, appliedPrice)
	    var dataInputLow = getDataInput(context, 3)
	    var dataOutput = getDataOutput(context, "bears")
	    var dataOutputEma = getDataOutput(context, "ema")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	        }
	    }

	    ema(dataInput, dataOutputEma, calculatedLength, period)

	    while (ptr < dataInput.length) {
	        dataOutput[ptr] = dataInputLow[ptr] - dataOutputEma[ptr]
	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
	    name: "bears",
	    visible: true,
	    renderType: RENDER_TYPE.HISTOGRAM,
	    color: "steelblue"
	},{
	    name: "ema",
	    visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("bulls", "Bulls Power(v1.0)", function (context) {
	    var dataInput = getDataInput(context, 0)
	    var dataInputHigh = getDataInput(context, 1)
	    var dataOutput = getDataOutput(context, "bulls")
	    var dataOutputEma = getDataOutput(context, "ema")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	        }
	    }

	    ema(dataInput, dataOutputEma, calculatedLength, period)

	    while (ptr < dataInput.length) {
	        dataOutput[ptr] = dataInputHigh[ptr] - dataOutputEma[ptr]
	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	}],
	[{
	    name: DATA_NAME.CLOSE,
	    index: 0
	},{
	    name: DATA_NAME.HIGH,
	    index: 1
	}],
	[{
	    name: "bulls",
	    visible: true,
	    renderType: RENDER_TYPE.HISTOGRAM,
	    color: "steelblue"
	},{
	    name: "ema",
	    visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicatorOnArray("bulls_for_mql", "Bulls Power for MQL(v1.0)", function (context) {
			var appliedPrice = getIndiParameter(context, "appliedPrice")
			appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
			var dataInput = getDataInput(context, appliedPrice)
	    var dataInputHigh = getDataInput(context, 2)
	    var dataOutput = getDataOutput(context, "bulls")
	    var dataOutputEma = getDataOutput(context, "ema")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	        }
	    }

	    ema(dataInput, dataOutputEma, calculatedLength, period)

	    while (ptr < dataInput.length) {
	        dataOutput[ptr] = dataInputHigh[ptr] - dataOutputEma[ptr]
	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
	    name: "bulls",
	    visible: true,
	    renderType: RENDER_TYPE.HISTOGRAM,
	    color: "steelblue"
	},{
	    name: "ema",
	    visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("momentum", "Momentum(v1.0)", function (context) {
	    var dataInput = getDataInput(context, 0)
	    var dataOutput = getDataOutput(context, "momentum")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	        }
	    }

	    while (ptr < dataInput.length) {
	        dataOutput[ptr] = dataInput[ptr] * 100 / dataInput[ptr - period]
	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	}],
	[{
	    name: DATA_NAME.CLOSE,
	    index: 0
	}],
	[{
	    name: "momentum",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicatorOnArray("momentum_for_mql", "Momentum for MQL(v1.0)", function (context) {
			var appliedPrice = getIndiParameter(context, "appliedPrice")
			appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
			var dataInput = getDataInput(context, appliedPrice)
	    var dataOutput = getDataOutput(context, "momentum")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	        }
	    }

	    while (ptr < dataInput.length) {
	        dataOutput[ptr] = dataInput[ptr] * 100 / dataInput[ptr - period]
	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
		name: "appliedPrice",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
	    name: "momentum",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("cci", "Commodity Channel Index(v1.0)", function (context) {
	    var dataInput = getDataInput(context, 0)
	    var dataOutput = getDataOutput(context, "cci")
	    var dataOutputHL = getDataOutput(context, "cciHighLevel")
	    var dataOutputLL = getDataOutput(context, "cciLowLevel")
	    var dataOutputSma = getDataOutput(context, "sma")
	    var highLevel = getIndiParameter(context, "highLevel")
	    var lowLevel = getIndiParameter(context, "lowLevel")
	    var period = getIndiParameter(context, "period")
	    var cciFactor = 0.015 / period;

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	            dataOutputHL[i] = highLevel
	            dataOutputLL[i] = lowLevel
	        }
	    }

	    sma(dataInput, dataOutputSma, calculatedLength, period)

	    var sum, tmp, ptr2

	    while (ptr < dataInput.length) {
	        sum = 0
			ptr2 = ptr - period + 1
			while (ptr2 <= ptr) {
				sum += Math.abs(dataInput[ptr2] - dataOutputSma[ptr])
				ptr2++
			}
			tmp = sum * cciFactor

			if (0 == tmp) {
				dataOutput[ptr] = 0
			} else {
				dataOutput[ptr] = (dataInput[ptr] - dataOutputSma[ptr]) / tmp
			}

	        dataOutputHL[ptr] = highLevel
	        dataOutputLL[ptr] = lowLevel

	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "highLevel",
	    value: 100,
	    required: false,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [1, 200]
	},{
	    name: "lowLevel",
	    value: -100,
	    required: false,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [-200, -1]
	}],
	[{
	    name: DATA_NAME.HLC3,
	    index: 0
	}],
	[{
	    name: "cci",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "cciHighLevel",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#AAAAAA"
	},{
	    name: "cciLowLevel",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#AAAAAA"
	},{
	    name: "sma",
	    visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicatorOnArray("cci_for_mql", "Commodity Channel Index for MQL(v1.0)", function (context) {
			var appliedPrice = getIndiParameter(context, "appliedPrice")
			appliedPrice = (appliedPrice < 0 || appliedPrice > 6) ? 0 : appliedPrice
			var dataInput = getDataInput(context, appliedPrice)
	    var dataOutput = getDataOutput(context, "cci")
	    var dataOutputHL = getDataOutput(context, "cciHighLevel")
	    var dataOutputLL = getDataOutput(context, "cciLowLevel")
	    var dataOutputSma = getDataOutput(context, "sma")
	    var highLevel = getIndiParameter(context, "highLevel")
	    var lowLevel = getIndiParameter(context, "lowLevel")
	    var period = getIndiParameter(context, "period")
	    var cciFactor = 0.015 / period;

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	            dataOutputHL[i] = highLevel
	            dataOutputLL[i] = lowLevel
	        }
	    }

	    sma(dataInput, dataOutputSma, calculatedLength, period)

	    var sum, tmp, ptr2

	    while (ptr < dataInput.length) {
	        sum = 0
			ptr2 = ptr - period + 1
			while (ptr2 <= ptr) {
				sum += Math.abs(dataInput[ptr2] - dataOutputSma[ptr])
				ptr2++
			}
			tmp = sum * cciFactor

			if (0 == tmp) {
				dataOutput[ptr] = 0
			} else {
				dataOutput[ptr] = (dataInput[ptr] - dataOutputSma[ptr]) / tmp
			}

	        dataOutputHL[ptr] = highLevel
	        dataOutputLL[ptr] = lowLevel

	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "highLevel",
	    value: 100,
	    required: false,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [1, 200]
	},{
	    name: "lowLevel",
	    value: -100,
	    required: false,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [-200, -1]
	},{
		name: "appliedPrice",
		value: 5,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: null
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	},{
		name: DATA_NAME.OPEN,
		index: 1
	},{
		name: DATA_NAME.HIGH,
		index: 2
	},{
		name: DATA_NAME.LOW,
		index: 3
	},{
		name: DATA_NAME.HL2,
		index: 4
	},{
		name: DATA_NAME.HLC3,
		index: 5
	},{
		name: DATA_NAME.HLCC4,
		index: 6
	}],
	[{
	    name: "cci",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "cciHighLevel",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#AAAAAA"
	},{
	    name: "cciLowLevel",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#AAAAAA"
	},{
	    name: "sma",
	    visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("demarker", "DeMarker(v1.0)", function (context) {
	    var dataInputHigh = getDataInput(context, 0)
	    var dataInputLow = getDataInput(context, 1)
	    var dataOutput = getDataOutput(context, "demarker")
	    var dataOutputHL = getDataOutput(context, "highLevel")
	    var dataOutputLL = getDataOutput(context, "lowLevel")
	    var dataOutputMax = getDataOutput(context, "max")
	    var dataOutputMin = getDataOutput(context, "min")
	    var dataOutputMaMax = getDataOutput(context, "maMax")
	    var dataOutputMaMin = getDataOutput(context, "maMin")
	    var highLevel = getIndiParameter(context, "highLevel")
	    var lowLevel = getIndiParameter(context, "lowLevel")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = 1

	        dataOutputMax[0] = 0;
			dataOutputMin[0] = 0;
	    }

	    var tmp = 0

	    while (ptr < dataInputHigh.length) {
			tmp = dataInputHigh[ptr] - dataInputHigh[ptr - 1]
			if (0 > tmp) {
				tmp = 0
			}
			dataOutputMax[ptr] = tmp

			tmp = dataInputLow[ptr - 1] - dataInputLow[ptr]
			if (0 > tmp) {
				tmp = 0
			}
			dataOutputMin[ptr] = tmp

			ptr++
		}

	    sma(dataOutputMax, dataOutputMaMax, calculatedLength, period)
	    sma(dataOutputMin, dataOutputMaMin, calculatedLength, period)

	    ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	            dataOutputHL[i] = highLevel
	            dataOutputLL[i] = lowLevel
	        }
	    }

	    while (ptr < dataInputHigh.length) {
	        tmp = dataOutputMaMax[ptr] + dataOutputMaMin[ptr]

			if (0 == tmp) {
				dataOutput[ptr] = 0
			} else {
				dataOutput[ptr] = dataOutputMaMax[ptr] / tmp
			}

	        dataOutputHL[ptr] = highLevel
	        dataOutputLL[ptr] = lowLevel

	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "highLevel",
	    value: 0.7,
	    required: false,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [0, 1]
	},{
	    name: "lowLevel",
	    value: 0.3,
	    required: false,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [0, 1]
	}],
	[{
	    name: DATA_NAME.HIGH,
	    index: 0
	},{
	    name: DATA_NAME.LOW,
	    index: 1
	}],
	[{
	    name: "demarker",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "highLevel",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#AAAAAA"
	},{
	    name: "lowLevel",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#AAAAAA"
	},{
	    name: "max",
	    visible: false
	},{
	    name: "min",
	    visible: false
	},{
	    name: "maMax",
	    visible: false
	},{
	    name: "maMin",
	    visible: false
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("wpr", "Williams' Percent Range(v1.0)", function (context) {
	    var dataInputClose = getDataInput(context, 0)
	    var dataInputHigh = getDataInput(context, 1)
	    var dataInputLow = getDataInput(context, 2)
	    var dataOutput = getDataOutput(context, "wpr")
	    var dataOutputHL = getDataOutput(context, "wprHighLevel")
	    var dataOutputLL = getDataOutput(context, "wprLowLevel")
	    var highLevel = getIndiParameter(context, "highLevel")
	    var lowLevel = getIndiParameter(context, "lowLevel")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period - 1

	        for (var i = 0; i < period - 1; i++) {
	            dataOutput[i] = 0
	            dataOutputHL[i] = highLevel
	            dataOutputLL[i] = lowLevel
	        }
	    }

	    while (ptr < dataInputClose.length) {
	        var maxArr = []

			for (var i = 0; i < period; i++) {
				maxArr.push(dataInputHigh[ptr - i])
			}

			var highest = Math.max.apply(null, maxArr)

			var minArr = []
			for (var i = 0; i < period; i++) {
				minArr.push(dataInputLow[ptr - i])
			}

			var lowest = Math.min.apply(null, minArr)

			if (0 == highest - lowest) {
				dataOutput[ptr] = 0
			} else {
				dataOutput[ptr] = -100 * (highest - dataInputClose[ptr]) / (highest - lowest)
			}

	        dataOutputHL[ptr] = highLevel
	        dataOutputLL[ptr] = lowLevel

	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	},{
	    name: "highLevel",
	    value: -20,
	    required: false,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [-100, 0]
	},{
	    name: "lowLevel",
	    value: -80,
	    required: false,
	    type: PARAMETER_TYPE.NUMBER,
	    range: [-100, 0]
	}],
	[{
	    name: DATA_NAME.CLOSE,
	    index: 0
	},{
	    name: DATA_NAME.HIGH,
	    index: 1
	},{
	    name: DATA_NAME.LOW,
	    index: 2
	}],
	[{
	    name: "wpr",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "steelblue"
	},{
	    name: "wprHighLevel",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#AAAAAA"
	},{
	    name: "wprLowLevel",
	    visible: true,
	    renderType: RENDER_TYPE.DASHARRAY,
	    color: "#AAAAAA"
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("rvi", "Relative Vigor Index(v1.0)", function (context) {
	    var dataInputOpen = getDataInput(context, 0)
	    var dataInputHigh = getDataInput(context, 1)
	    var dataInputLow = getDataInput(context, 2)
	    var dataInputClose = getDataInput(context, 3)
	    var dataOutputMain = getDataOutput(context, "main")
	    var dataOutputSignal = getDataOutput(context, "signal")
	    var period = getIndiParameter(context, "period")

	    var calculatedLength = getCalculatedLength(context)

	    var ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period + 2

	        for (var i = 0; i < period + 2; i++) {
	            dataOutputMain[i] = 0
	            dataOutputSignal[i] = 0
	        }
	    }

	    var upTmp, downTmp, tmp, dTmp

	    while (ptr < dataInputOpen.length) {
	        tmp = 0
			dTmp = 0

			for (var i = ptr; i > ptr - period; i--) {
				upTmp = ((dataInputClose[i] - dataInputOpen[i]) + 2 * (dataInputClose[i - 1] - dataInputOpen[i - 1]) + 2 * (dataInputClose[i - 2] - dataInputOpen[i - 2]) + (dataInputClose[i - 3] - dataInputOpen[i - 3])) / 6
				downTmp = ((dataInputHigh[i] - dataInputLow[i]) + 2 * (dataInputHigh[i - 1] - dataInputLow[i - 1]) + 2 * (dataInputHigh[i - 2] - dataInputLow[i - 2]) + (dataInputHigh[i - 3] - dataInputLow[i - 3])) / 6

				tmp += upTmp
				dTmp += downTmp
			}

			if (0 == dTmp) {
				dataOutputMain[ptr] = tmp
			} else {
				dataOutputMain[ptr] = tmp / dTmp
			}

	        ptr++
	    }

	    ptr = calculatedLength

	    if (ptr > 0) {
	        ptr--
	    } else {
	        ptr = period + 2
	    }

	    while (ptr < dataInputOpen.length) {
	        dataOutputSignal[ptr] = (dataOutputMain[ptr] + 2 * dataOutputMain[ptr - 1] + 2 * dataOutputMain[ptr - 2] + dataOutputMain[ptr - 3]) / 6

	        ptr++
	    }
	},[{
	    name: "period",
	    value: 14,
	    required: true,
	    type: PARAMETER_TYPE.INTEGER,
	    range: [1, 100]
	}],
	[{
	    name: DATA_NAME.OPEN,
	    index: 0
	},{
	    name: DATA_NAME.HIGH,
	    index: 1
	},{
	    name: DATA_NAME.LOW,
	    index: 2
	},{
	    name: DATA_NAME.CLOSE,
	    index: 3
	}],
	[{
	    name: "main",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "#6CBA81"
	},{
	    name: "signal",
	    visible: true,
	    renderType: RENDER_TYPE.LINE,
	    color: "#ECAE93"
	}],
	WHERE_TO_RENDER.SEPARATE_WINDOW)

	importBuiltInIndicator("tutorial_videos", "Embedded tutorial videos(v1.0)", function (context) {
	},[{
		name: "url",
		value: "https://www.youtube.com/embed/EUjAIfttCoA",
		required: true,
		type: PARAMETER_TYPE.STRING,
		range: null
	}],
	[{
		name: DATA_NAME.TIME,
		index: 0
	}],
	[{
		name: "video",
		visible: false
	}],
	WHERE_TO_RENDER.CHART_WINDOW,
	function (context) { // Init()
		if (getLayoutId() != 2) {
			changeLayout(2)
		}

		window.chartIds = getLayout(2)
		for (var i in window.chartIds) {
			moveLayout(window.chartIds[i], 1)
		}

		embedHtml('<iframe src="' + getIndiParameter(context, "url") + '" style="width:100%;height:100%;border:none"></iframe>', 2)
	},
	function (context) { // Deinit()
		embedHtml("", 2)

		for (var i in window.chartIds) {
			moveLayout(window.chartIds[i], 2)
		}
	})

	importBuiltInIndicator("chart_elements", "A manager for the chart elements implemented by using custom indicator(v1.02)", function (context) {
	},[{
    name: "color",
    value: "#AAA",
    required: true,
    type: PARAMETER_TYPE.STRING,
    range: null
  }, {
    name: "strokeWidth",
    value: 2,
    required: true,
    type: PARAMETER_TYPE.INTEGER,
    range: [1, 10]
  }],
	[{
		name: DATA_NAME.TIME,
		index: 0
	}],
	[{
		name: "line",
		visible: false
	}],
	WHERE_TO_RENDER.CHART_WINDOW,
	function (context) { // Init()
		var chartHandle = getChartHandleByContext(context)

		if (typeof window.dragObj == "undefined" || window.dragObj == null) {
			window.dragObj = d3.drag()
			.on("start", function (d) {
				d3.select(this).raise().classed("active", true)
			})
			.on("drag", function (d) {
				if (d.type == "lineSegment") {
					if (d3.select(this).attr("class").includes("lineSegmentStarts")) {
						window.chartElements.lineSegment.dragStart(d3.event.x, d3.event.y, d)
					} else if (d3.select(this).attr("class").includes("lineSegmentEnds")) {
						window.chartElements.lineSegment.dragEnd(d3.event.x, d3.event.y, d)
					}
				}
			})
			.on("end", function (d) {
				d3.select(this).classed("active", false)
				window.chartElements.save()
			})
		}

		if (typeof window.chartElements == "undefined" || window.chartElements == null) {
			var elements = []

			if (typeof localStorage.reservedZone != "undefined") {
				var reservedZone = JSON.parse(localStorage.reservedZone)
				if (typeof reservedZone.elements != "undefined") {
					elements = reservedZone.elements
				}
			}

			window.chartElements = {
				newId: (elements.length > 0 ? elements[elements.length - 1].id + 1 : 0),
				timeArr: [],
				data: elements,
				canvas: [],
				barNum: [],
				cursor: [],
				width: [],
				height: [],
				xScale: [],
				yScale: [],
				save: function () {
					if (typeof localStorage.reservedZone == "undefined") {
						localStorage.reservedZone = JSON.stringify({
							elements: this.data
						})
					} else {
						var reservedZone = JSON.parse(localStorage.reservedZone)
						reservedZone.elements = this.data
						localStorage.reservedZone = JSON.stringify(reservedZone)
					}
				},
				remove: function (id) {
					var element = null
					var type = null

					for (var i = this.data.length - 1; i >= 0; i--) {
						element = this.data[i]

						if (element.id == id) {
							type = element.type
							this.data.splice(i, 1)
							break
						}
					}

					this.save()
					if (type == "lineSegment") {
						this.lineSegment.render(element.chartHandle)
					}
				},
				lineSegment: {
					add: function (type, chartHandle, color, strokeWidth) {
						var timeArr = window.chartElements.timeArr[chartHandle]
						var cursor = window.chartElements.cursor[chartHandle]
						var width = window.chartElements.width[chartHandle]
						var height = window.chartElements.height[chartHandle]
						var xScale = window.chartElements.xScale[chartHandle]
						var yScale = window.chartElements.yScale[chartHandle]

						var lineSegment = {
							type: type,
							chartHandle: chartHandle,
							id: window.chartElements.newId,
							color: color,
							strokeWidth: strokeWidth,
							radius: 5,
							startTime: null,
							endTime: null,
							startIdx: null,
							endIdx: null,
							startVal: null,
							endVal: null
						}

						lineSegment.startIdx = Math.floor(xScale.invert(width / 3) + cursor),
						lineSegment.endIdx = Math.floor(xScale.invert(width * 2 / 3) + cursor),
						lineSegment.startVal = yScale.invert(height * 2 / 3),
						lineSegment.endVal = yScale.invert(height / 3),
						lineSegment.startTime = timeArr[lineSegment.startIdx]
						lineSegment.endTime = timeArr[lineSegment.endIdx]

						window.chartElements.data.push(lineSegment)

						window.chartElements.newId++

						window.chartElements.save()
						this.render(chartHandle)
					},
					dragStart: function (x, y, d) {
						var chartHandle = d.chartHandle
						var timeArr = window.chartElements.timeArr[chartHandle]
						var barNum = window.chartElements.barNum[chartHandle]
						var cursor = window.chartElements.cursor[chartHandle]
						var width = window.chartElements.width[chartHandle]
						var height = window.chartElements.height[chartHandle]
						var xScale = window.chartElements.xScale[chartHandle]
						var yScale = window.chartElements.yScale[chartHandle]

						var startIdx = Math.round(xScale.invert(x))
						if (startIdx < 0) {
							startIdx = 0
						} else if (startIdx >= barNum) {
							startIdx = barNum - 1
						}

						var val = y
						if (val < 0) {
							val = 0
						} else if (val > height) {
							val = height
						}
						d.startVal = yScale.invert(val)

						d.startIdx = startIdx + cursor

						d3.select("#lineSegmentStarts_" + d.id)
							.attr("cx", xScale(startIdx)).attr("cy", val)
						d3.select("#lineSegments_" + d.id)
							.attr("x1", xScale(startIdx)).attr("y1", val)
						d3.select("#lineSegmentCloses_" + d.id)
							.attr("cx", function (d) {return xScale((d.startIdx + d.endIdx) / 2.0 - cursor)})
							.attr("cy", function (d) {return yScale((d.startVal + d.endVal) / 2.0)})

						d.startTime = timeArr[d.startIdx]
					},
					dragEnd: function (x, y, d) {
						var chartHandle = d.chartHandle
						var timeArr = window.chartElements.timeArr[chartHandle]
						var barNum = window.chartElements.barNum[chartHandle]
						var cursor = window.chartElements.cursor[chartHandle]
						var width = window.chartElements.width[chartHandle]
						var height = window.chartElements.height[chartHandle]
						var xScale = window.chartElements.xScale[chartHandle]
						var yScale = window.chartElements.yScale[chartHandle]

						var endIdx = Math.round(xScale.invert(x))
						if (endIdx < 0) {
							endIdx = 0
						} else if (endIdx >= barNum) {
							endIdx = barNum - 1
						}

						var val = y
						if (val < 0) {
							val = 0
						} else if (val > height) {
							val = height
						}
						d.endVal = yScale.invert(val)

						d.endIdx = endIdx + cursor

						d3.select("#lineSegmentEnds_" + d.id)
							.attr("cx", xScale(endIdx)).attr("cy", val)
						d3.select("#lineSegments_" + d.id)
							.attr("x2", xScale(endIdx)).attr("y2", val)
						d3.select("#lineSegmentCloses_" + d.id)
							.attr("cx", function (d) {return xScale((d.startIdx + d.endIdx) / 2.0 - cursor)})
							.attr("cy", function (d) {return yScale((d.startVal + d.endVal) / 2.0)})

						d.endTime = timeArr[d.endIdx]
					},
					render: function (chartHandle) {
						var canvas = window.chartElements.canvas[chartHandle]
						var timeArr = window.chartElements.timeArr[chartHandle]
						var barNum = window.chartElements.barNum[chartHandle]
						var cursor = window.chartElements.cursor[chartHandle]
						var width = window.chartElements.width[chartHandle]
						var height = window.chartElements.height[chartHandle]
						var xScale = window.chartElements.xScale[chartHandle]
						var yScale = window.chartElements.yScale[chartHandle]

						var renderingData = []

						for (var i in window.chartElements.data) {
							var element = window.chartElements.data[i]

							if (element.chartHandle == chartHandle && element.type == "lineSegment") {
								renderingData.push(element)
							}
						}

						var lineSegmentStarts = canvas.selectAll(".lineSegmentStarts").data(renderingData)

						lineSegmentStarts
							.attr("id", function (d) {return "lineSegmentStarts_" + d.id})
							.attr("cx", function (d) {return xScale(d.startIdx - cursor)})
							.attr("cy", function (d) {return yScale(d.startVal)})
							.attr("r", function (d) {return d.radius})

						lineSegmentStarts.enter().append("circle")
							.attr("id", function (d) {return "lineSegmentStarts_" + d.id})
							.attr("class", "lineSegmentStarts")
							.attr("cx", function (d) {return xScale(d.startIdx - cursor)})
							.attr("cy", function (d) {return yScale(d.startVal)})
							.attr("r", function (d) {return d.radius})
							.attr("fill", function (d) {return d.color})
							.attr("opacity", 1.0)
							.attr("stroke", function (d) {return d.color})
							.call(window.dragObj)

						lineSegmentStarts.exit().remove()

						var lineSegmentEnds = canvas.selectAll(".lineSegmentEnds").data(renderingData)

						lineSegmentEnds
							.attr("id", function (d) {return "lineSegmentEnds_" + d.id})
							.attr("cx", function (d) {return xScale(d.endIdx - cursor)})
							.attr("cy", function (d) {return yScale(d.endVal)})
							.attr("r", function (d) {return d.radius})

						lineSegmentEnds.enter().append("circle")
							.attr("id", function (d) {return "lineSegmentEnds_" + d.id})
							.attr("class", "lineSegmentEnds")
							.attr("cx", function (d) {return xScale(d.endIdx - cursor)})
							.attr("cy", function (d) {return yScale(d.endVal)})
							.attr("r", function (d) {return d.radius})
							.attr("fill", function (d) {return d.color})
							.attr("opacity", 1.0)
							.attr("stroke", function (d) {return d.color})
							.call(window.dragObj)

						lineSegmentEnds.exit().remove()

						var lineSegments = canvas.selectAll(".lineSegments").data(renderingData)

						lineSegments
							.attr("id", function (d) {return "lineSegments_" + d.id})
							.attr("x1", function (d) {return xScale(d.startIdx - cursor)})
							.attr("y1", function (d) {return yScale(d.startVal)})
							.attr("x2", function (d) {return xScale(d.endIdx - cursor)})
							.attr("y2", function (d) {return yScale(d.endVal)})

						lineSegments.enter().append("line")
							.attr("id", function (d) {return "lineSegments_" + d.id})
							.attr("class", "lineSegments")
							.attr("x1", function (d) {return xScale(d.startIdx - cursor)})
							.attr("y1", function (d) {return yScale(d.startVal)})
							.attr("x2", function (d) {return xScale(d.endIdx - cursor)})
							.attr("y2", function (d) {return yScale(d.endVal)})
							.attr("stroke", function (d) {return d.color})
							.attr("strokeWidth", function (d) {return d.strokeWidth})

						lineSegments.exit().remove()

						var lineSegmentCloses = canvas.selectAll(".lineSegmentCloses").data(renderingData)

						lineSegmentCloses
							.attr("id", function (d) {return "lineSegmentCloses_" + d.id})
							.attr("cx", function (d) {return xScale((d.startIdx + d.endIdx) / 2.0 - cursor)})
							.attr("cy", function (d) {return yScale((d.startVal + d.endVal) / 2.0)})
							.attr("r", function (d) {return d.radius})
							.on("click", function (d) {
								window.chartElements.remove(d.id)
							})

						lineSegmentCloses.enter().append("circle")
							.attr("id", function (d) {return "lineSegmentCloses_" + d.id})
							.attr("class", "lineSegmentCloses")
							.attr("cx", function (d) {return xScale((d.startIdx + d.endIdx) / 2.0 - cursor)})
							.attr("cy", function (d) {return yScale((d.startVal + d.endVal) / 2.0)})
							.attr("r", function (d) {return d.radius})
							.attr("fill", "orange")
							.attr("opacity", 1.0)
							.attr("stroke", function (d) {return d.color})
							.on("click", function (d) {
								window.chartElements.remove(d.id)
							})

						lineSegmentCloses.exit().remove()
					}
				}
			}
		} else {
			var elements = []

			if (typeof localStorage.reservedZone != "undefined") {
				var reservedZone = JSON.parse(localStorage.reservedZone)
				if (typeof reservedZone.elements != "undefined") {
					elements = reservedZone.elements
				}
			}

			window.chartElements.data = elements
		}

		window.chartElements.canvas[chartHandle] = getSvgCanvas(chartHandle)
	},
	function (context) { // Deinit()
		var chartHandle = getChartHandleByContext(context)
		var elements = window.chartElements.data

		for (var i = elements.length - 1; i >= 0; i--) {
			if (elements[i].chartHandle == chartHandle) {
				elements.splice(i, 1)
			}
		}

		window.chartElements.lineSegment.render(chartHandle)

		window.chartElements.canvas[chartHandle].selectAll(".btnLineSegmentG").data([]).exit().remove()

		delete window.chartElements.timeArr[chartHandle]
		delete window.chartElements.canvas[chartHandle]
		delete window.chartElements.barNum[chartHandle]
		delete window.chartElements.cursor[chartHandle]
		delete window.chartElements.width[chartHandle]
		delete window.chartElements.height[chartHandle]
		delete window.chartElements.xScale[chartHandle]
		delete window.chartElements.yScale[chartHandle]
	},
	function (context) { // Render()
		var chartHandle = getChartHandleByContext(context)
		var color = getIndiParameter(context, "color")
		var strokeWidth = getIndiParameter(context, "strokeWidth")
		var barNum = getBarNum(context)
		var cursor = getCursor(context)
		var width = getCanvasWidth(context)
		var height = getCanvasHeight(context)
		var xScale = getXScale(context)
		var yScale = getYScale(context)
		var buttons = [{
			chartHandle: chartHandle,
			color: color,
			strokeWidth: strokeWidth,
			label: "L"
		}]
		var btnLineSegmentG = null
		var btnLineSegment = null
		var btnLineSegmentTxt = null

		if (getCalculatedLength(context) == 0) {
			var timeArr = getDataInput(context, 0)
			window.chartElements.timeArr[chartHandle] = timeArr

			btnLineSegmentG = window.chartElements.canvas[chartHandle].append("g")
				.attr("class", "btnLineSegmentG")

			btnLineSegment = btnLineSegmentG.selectAll(".btnLineSegment").data(buttons)
			btnLineSegmentTxt = btnLineSegmentG.selectAll(".btnLineSegmentTxt").data(buttons)

			btnLineSegment
				.enter().append("circle")
				.attr("class", "btnLineSegment")
				.attr("cx", 15)
				.attr("cy", height - 15)
				.attr("r", 10)
				.attr("stroke", "steelblue")
				.attr("fill", "steelblue")
				.style("cursor", "pointer")
				.on("click", function (d) {
					window.chartElements.lineSegment.add("lineSegment", d.chartHandle, d.color, d.strokeWidth)
				})

			btnLineSegmentTxt
				.enter().append("text")
				.attr("class", "btnLineSegmentTxt")
		    .attr("width", "10px")
				.attr("height", "10px")
				.attr("x", 15)
				.attr("y", height - 15)
				.attr("dx", -5)
				.attr("dy", 5)
				.attr("fill", "white")
				.attr("textAnchor", "start")
				.style("fontSize", "8px")
				.style("cursor", "pointer")
				.text("L")
				.on("click", function (d) {
					window.chartElements.lineSegment.add("lineSegment", d.chartHandle, d.color, d.strokeWidth)
				})

			for (var i in window.chartElements.data) {
				if (window.chartElements.data[i].type == "lineSegment") {
					var lineSegment = window.chartElements.data[i]

					if (lineSegment.chartHandle == chartHandle) {
						var j = timeArr.length - 2
						while (j >= 0) {
							if (timeArr[j] <= lineSegment.startTime &&
								timeArr[j+1] > lineSegment.startTime) {

								break
							}

							j--
						}
						lineSegment.startIdx = j

						j = timeArr.length - 2
						while (j >= 0) {
							if (timeArr[j] <= lineSegment.endTime &&
								timeArr[j+1] > lineSegment.endTime) {

								break
							}

							j--
						}
						lineSegment.endIdx = j
					}
				}
			}
		} else {
			btnLineSegment = window.chartElements.canvas[chartHandle].selectAll(".btnLineSegment").data(buttons)
			btnLineSegmentTxt = window.chartElements.canvas[chartHandle].selectAll(".btnLineSegmentTxt").data(buttons)

			btnLineSegment
				.attr("cy", height - 15)

			btnLineSegmentTxt
				.attr("y", height - 15)
		}

		window.chartElements.barNum[chartHandle] = barNum
		window.chartElements.cursor[chartHandle] = cursor
		window.chartElements.width[chartHandle] = width
		window.chartElements.height[chartHandle] = height
		window.chartElements.xScale[chartHandle] = xScale
		window.chartElements.yScale[chartHandle] = yScale

		window.chartElements.lineSegment.render(chartHandle)
	})
}

function importBuiltInEAs () {
	importBuiltInEA(
		"mql_indicator_loader_plugin",
		"mql_plugin to make MQL-based indicators runnable on Fintechee(v1.07)",
		[{ // parameters
			name: "definition",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var def = getEAParameter(context, "definition")
			var currDef = (def == null || def === "") ? null : JSON.parse(def)

			var loadMql = function (definition) {
				return new Promise(function (rs, rj) {
					var tags = document.getElementsByTagName("script")
					for (var i = tags.length - 1; i >= 0; i--) {
						if (tags[i] && tags[i].getAttribute("src") != null && tags[i].getAttribute("src") == definition.url) {
							tags[i].parentNode.removeChild(tags[i])
							break
						}
					}

					var scriptPromise = new Promise(function (resolve, reject) {
					  var script = document.createElement("script")
					  document.body.appendChild(script)
					  script.onload = resolve
					  script.onerror = reject
					  script.async = true
					  script.src = definition.url
					})

					scriptPromise.then(function () {
						IndiPlugIn().then(function (Module) {
							if (typeof window.mqlIndicators == "undefined") {
								window.mqlIndicators = []
								window.mqlIndicatorsBuffer = []
								window.mqlIndiUID = 0
							}

							var jPrint = Module.addFunction(function (uid, s) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								printMessage(window.mqlIndicators[obj.name].module.UTF8ToString(s))
							}, "vii")
							var jSetIndexShift = Module.addFunction(function (uid, name, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(name)
								setIndiShift(obj.context, md, shift)
							}, "viii")
							var jChartID = Module.addFunction(function (uid) {
							  return window.mqlIndicatorsBuffer[uid + ""].chartId
							}, "ii")
							var jChartPeriod = Module.addFunction(function (uid, chart_id) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								if (chart_id == 0) {
									return obj.convertTimeFrame(obj.timeFrame)
								} else {
									return obj.convertTimeFrame(getChartTimeFrame(chart_id))
								}
							}, "iii")
							var jChartSymbol = Module.addFunction(function (uid, chart_id) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = ""
								if (chart_id == 0) {
									symbolName = obj.symbolName
								} else {
									symbolName = getChartSymbolName(chart_id)
								}
								var lengthBytes = window.mqlIndicators[obj.name].module.lengthBytesUTF8(symbolName) + 1
							  var stringOnWasmHeap = window.mqlIndicators[obj.name].module._malloc(lengthBytes)
							  window.mqlIndicators[obj.name].module.stringToUTF8(symbolName, stringOnWasmHeap, lengthBytes)
							  return stringOnWasmHeap
							}, "iii")
							var jPeriod = Module.addFunction(function (uid) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								return obj.convertTimeFrame(obj.timeFrame)
							}, "ii")
							var jSymbol = Module.addFunction(function (uid) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = obj.symbolName
								var lengthBytes = window.mqlIndicators[obj.name].module.lengthBytesUTF8(symbolName) + 1
							  var stringOnWasmHeap = window.mqlIndicators[obj.name].module._malloc(lengthBytes)
							  window.mqlIndicators[obj.name].module.stringToUTF8(symbolName, stringOnWasmHeap, lengthBytes)
							  return stringOnWasmHeap
							}, "ii")
							var jiTimeInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandleFromIndi(obj.context, symbolName, timeFrm)
							}, "iiii")
							var jiTime = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, chartHandle, "Time")
								return arr[arr.length - shift - 1]
							}, "iiii")
							var jiOpenInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandleFromIndi(obj.context, symbolName, timeFrm)
							}, "iiii")
							var jiOpen = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, chartHandle, "Open")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiHighInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandleFromIndi(obj.context, symbolName, timeFrm)
							}, "iiii")
							var jiHigh = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, chartHandle, "High")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiLowInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandleFromIndi(obj.context, symbolName, timeFrm)
							}, "iiii")
							var jiLow = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, chartHandle, "Low")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiCloseInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandleFromIndi(obj.context, symbolName, timeFrm)
							}, "iiii")
							var jiClose = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, chartHandle, "Close")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiVolumeInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandleFromIndi(obj.context, symbolName, timeFrm)
							}, "iiii")
							var jiVolume = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, chartHandle, "Volume")
								return arr[arr.length - shift - 1]
							}, "iiii")
							var jiHighest = Module.addFunction(function (uid, chartHandle, mode, count, start) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, chartHandle, md)
								var highest = -Number.MAX_VALUE
								var idx = -1
								for (var i = start; i < start + count && i >= 0 && i < arr.length; i++) {
									if (arr[arr.length - i - 1] > highest) {
										highest = arr[arr.length - i - 1]
										idx = i
									}
								}
								return idx
							}, "iiiiii")
							var jiLowest = Module.addFunction(function (uid, chartHandle, mode, count, start) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, chartHandle, md)
								var lowest = Number.MAX_VALUE
								var idx = -1
								for (var i = start; i < start + count && i >= 0 && i < arr.length; i++) {
									if (arr[arr.length - i - 1] < lowest) {
										lowest = arr[arr.length - i - 1]
										idx = i
									}
								}
								return idx
							}, "iiiiii")
							var jiACInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "ac", [])
							}, "iiii")
							var jiAC = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arrUp = getDataFromIndi(obj.context, indiHandle, "up")
								var arrDown = getDataFromIndi(obj.context, indiHandle, "down")
								return arrUp[arrUp.length - shift - 1] > 0 ? arrUp[arrUp.length - shift - 1] : arrDown[arrDown.length - shift - 1]
							}, "diii")
							var jiADXInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "adx_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiADX = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiAlligatorInit = Module.addFunction(function (uid, symbol, timeframe, jaw_period, jaw_shift, teeth_period, teeth_shift, lips_period, lips_shift, ma_method, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								var method = window.mqlIndicators[obj.name].module.UTF8ToString(ma_method)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "alligator_for_mql", [{
									name: "jawsPeriod",
									value: jaw_period
								},{
									name: "jawsShift",
									value: jaw_shift
								},{
									name: "teethPeriod",
									value: teeth_period
								},{
									name: "teethShift",
									value: teeth_shift
								},{
									name: "lipsPeriod",
									value: lips_period
								},{
									name: "lipsShift",
									value: lips_shift
								},{
									name: "method",
									value: method
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiiiiiiiii")
							var jiAlligator = Module.addFunction(function (uid, indiHandle, jaw_shift, teeth_shift, lips_shift, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								if (md == "jaws") {
									return arr[arr.length - jaw_shift - shift - 1]
								} else if (md == "teeth") {
									return arr[arr.length - teeth_shift - shift - 1]
								} else {
									return arr[arr.length - lips_shift - shift - 1]
								}
							}, "diiiiiii")
							var jiAOInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "ao", [])
							}, "iiii")
							var jiAO = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arrUp = getDataFromIndi(obj.context, indiHandle, "up")
								var arrDown = getDataFromIndi(obj.context, indiHandle, "down")
								return arrUp[arrUp.length - shift - 1] > 0 ? arrUp[arrUp.length - shift - 1] : arrDown[arrDown.length - shift - 1]
							}, "diii")
							var jiATRInit = Module.addFunction(function (uid, symbol, timeframe, period) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "atr", [{
									name: "period",
									value: period
								}])
							}, "iiiii")
							var jiATR = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "atr")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiBearsPowerInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "bears_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiBearsPower = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "bears")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiBandsInit = Module.addFunction(function (uid, symbol, timeframe, period, deviation, bands_shift, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "bands_for_mql", [{
								    name: "period",
								    value: period,
								},{
								    name: "deviations",
								    value: deviation,
								},{
								    name: "shift",
								    value: bands_shift,
								},{
								    name: "method",
								    value: "sma"
								},{
									name: "appliedPrice",
									value: applied_price,
								}])
							}, "iiiiidii")
							var jiBands = Module.addFunction(function (uid, indiHandle, bands_shift, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - bands_shift - shift - 1]
							}, "diiiii")
							var jiBandsOnArray = Module.addFunction(function (uid, array, total, period, deviation, bands_shift, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlIndicators[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("bands_for_mql", [{
								    name: "period",
								    value: period,
								},{
								    name: "deviations",
								    value: deviation,
								},{
								    name: "shift",
								    value: bands_shift,
								},{
								    name: "method",
								    value: "sma"
								},{
									name: "appliedPrice",
									value: 0,
								}], dataInput, total)
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataOnArray(dataOutput, md)
								return arr[arr.length - bands_shift - shift - 1]
							}, "diiiidiii")
							var jiBullsPowerInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "bulls_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiBullsPower = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "bulls")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiCCIInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "cci_for_mql", [{
							    name: "period",
							    value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiCCI = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "cci")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiCCIOnArray = Module.addFunction(function (uid, array, total, period, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlIndicators[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("cci_for_mql", [{
								    name: "period",
								    value: period,
								},{
									name: "appliedPrice",
									value: 0,
								}], dataInput, total)
								var arr = getDataOnArray(dataOutput, "cci")
								return arr[arr.length - shift - 1]
							}, "diiiii")
							var jiCustomInit = Module.addFunction(function (uid, symbol, timeframe, name, paramString) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var indiName = window.mqlIndicators[obj.name].module.UTF8ToString(name)
								if (typeof window.mqlIndicators == "undefined" || typeof window.mqlIndicators[indiName] == "undefined") {
									throw new Error("Please start MQL indicator loader plugin and load the specific indicator(" + indiName + ").")
								}
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								var params = window.mqlIndicators[obj.name].module.UTF8ToString(paramString).split("|||")
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								var parameters = JSON.parse(JSON.stringify(window.mqlIndicators[indiName].definition.parameters))
								for (var i in parameters) {
									if (isInteger(params[i])) {
										parameters[i].value = parseInt(params[i])
									} else if (isNumeric(params[i])) {
										parameters[i].value = parseFloat(params[i])
									} else if (params[i] == "true") {
										parameters[i].value = true
									} else if (params[i] == "false") {
										parameters[i].value = false
									} else {
										parameters[i].value = params[i]
									}
								}
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, indiName, parameters)
							}, "iiiiii")
							var jiCustom = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiDeMarkerInit = Module.addFunction(function (uid, symbol, timeframe, period) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "demarker", [{
									name: "period",
									value: period
								}])
							}, "iiiii")
							var jiDeMarker = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "demarker")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiEnvelopesInit = Module.addFunction(function (uid, symbol, timeframe, ma_period, ma_method, ma_shift, applied_price, deviation) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								var method = window.mqlIndicators[obj.name].module.UTF8ToString(ma_method)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "envelopes_for_mql", [{
								    name: "period",
								    value: ma_period
								},{
								    name: "deviations",
								    value: deviation
								},{
								    name: "shift",
								    value: ma_shift
								},{
								    name: "method",
								    value: method
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiiiiid")
							var jiEnvelopes = Module.addFunction(function (uid, indiHandle, ma_shift, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - ma_shift - shift - 1]
							}, "diiiii")
							var jiEnvelopesOnArray = Module.addFunction(function (uid, array, total, ma_period, ma_method, ma_shift, deviation, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var method = window.mqlIndicators[obj.name].module.UTF8ToString(ma_method)
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlIndicators[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("envelopes_for_mql", [{
										name: "period",
										value: ma_period
								},{
										name: "deviations",
										value: deviation
								},{
										name: "shift",
										value: ma_shift
								},{
										name: "method",
										value: method
								},{
									name: "appliedPrice",
									value: 0
								}], dataInput, total)
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataOnArray(dataOutput, md)
								return arr[arr.length - ma_shift - shift - 1]
							}, "diiiiiidii")
							var jiFractalsInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "fractals", [])
							}, "iiii")
							var jiFractals = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiIchimokuInit = Module.addFunction(function (uid, symbol, timeframe, tenkan_sen, kijun_sen, senkou_span_b) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "ichimoku", [{
								    name: "tenkan",
								    value: tenkan_sen
								},{
								    name: "kijun",
								    value: kijun_sen
								},{
								    name: "senkou",
								    value: senkou_span_b
								}])
							}, "iiiiiii")
							var jiIchimoku = Module.addFunction(function (uid, indiHandle, ichimoku_shift, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - ichimoku_shift - shift - 1]
							}, "diiiii")
							var jiMAInit = Module.addFunction(function (uid, symbol, timeframe, ma_period, ma_shift, ma_method, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								var params = [{
									name: "period",
									value: ma_period
								},{
									name: "shift",
									value: ma_shift
								},{
									name: "appliedPrice",
									value: applied_price
								}]
								if (ma_method == 1) {
									return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "ema_for_mql", params)
								} else if (ma_method == 2) {
									return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "smma_for_mql", params)
								} else if (ma_method == 3) {
									return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "lwma_for_mql", params)
								} else {
									return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "sma_for_mql", params)
								}
							}, "iiiiiiii")
							var jiMA = Module.addFunction(function (uid, indiHandle, ma_shift, ma_method, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var method = window.mqlIndicators[obj.name].module.UTF8ToString(ma_method)
								var arr = getDataFromIndi(obj.context, indiHandle, method)
								return arr[arr.length - ma_shift - shift - 1]
							}, "diiiii")
							var jiMAOnArray = Module.addFunction(function (uid, array, total, ma_period, ma_shift, ma_method, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var method = window.mqlIndicators[obj.name].module.UTF8ToString(ma_method)
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlIndicators[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = null
								var params = [{
									name: "period",
									value: ma_period
								},{
									name: "shift",
									value: ma_shift
								},{
									name: "appliedPrice",
									value: 0
								}]
								if (method == "ema") {
									dataOutput = calcIndicatorOnArray("ema_for_mql", params, dataInput, total)
								} else if (method == "smma") {
									dataOutput = calcIndicatorOnArray("smma_for_mql", params, dataInput, total)
								} else if (method == "lwma") {
									dataOutput = calcIndicatorOnArray("lwma_for_mql", params, dataInput, total)
								} else {
									dataOutput = calcIndicatorOnArray("sma_for_mql", params, dataInput, total)
								}
								var arr = getDataOnArray(dataOutput, method)
								return arr[arr.length - ma_shift - shift - 1]
							}, "diiiiiii")
							var jiMACDInit = Module.addFunction(function (uid, symbol, timeframe, fast_ema_period, slow_ema_period, signal_period, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "macd_for_mql", [{
									name: "fastEMA",
									value: fast_ema_period
								},{
									name: "slowEMA",
									value: slow_ema_period
								},{
									name: "signalSMA",
									value: signal_period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiiiii")
							var jiMACD = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiMomentumInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "momentum_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiMomentum = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "momentum")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiMomentumOnArray = Module.addFunction(function (uid, array, total, period, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlIndicators[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("momentum_for_mql", [{
								    name: "period",
								    value: period,
								},{
									name: "appliedPrice",
									value: 0,
								}], dataInput, total)
								var arr = getDataOnArray(dataOutput, "momentum")
								return arr[arr.length - shift - 1]
							}, "diiiii")
							var jiRSIInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "rsi_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiRSI = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "rsi")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiRSIOnArray = Module.addFunction(function (uid, array, total, period, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlIndicators[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("rsi_for_mql", [{
								    name: "period",
								    value: period,
								},{
									name: "appliedPrice",
									value: 0,
								}], dataInput, total)
								var arr = getDataOnArray(dataOutput, "rsi")
								return arr[arr.length - shift - 1]
							}, "diiiii")
							var jiRVIInit = Module.addFunction(function (uid, symbol, timeframe, period) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "rvi", [{
									name: "period",
									value: period
								}])
							}, "iiiii")
							var jiRVI = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiSARInit = Module.addFunction(function (uid, symbol, timeframe, step, maximum) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "sar", [{
									name: "acceleration",
									value: step,
								},{
									name: "afMax",
									value: maximum,
								}])
							}, "iiiidd")
							var jiSAR = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "sar")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiStochasticInit = Module.addFunction(function (uid, symbol, timeframe, Kperiod, Dperiod, slowing, ma_method) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								var method = window.mqlIndicators[obj.name].module.UTF8ToString(ma_method)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "stochastic", [{
									name: "KPeriod",
									value: Kperiod
								},{
									name: "slowing",
									value: slowing
								},{
									name: "DPeriod",
									value: Dperiod
								},{
									name: "method",
									value: method
								}])
							}, "iiiiiiii")
							var jiStochastic = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var md = window.mqlIndicators[obj.name].module.UTF8ToString(mode)
								var arr = getDataFromIndi(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiWPRInit = Module.addFunction(function (uid, symbol, timeframe, period) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlIndicators[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandleFromIndi(obj.context, symbolName, timeFrm, "wpr", [{
									name: "period",
									value: period
								}])
							}, "iiiii")
							var jiWPR = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var arr = getDataFromIndi(obj.context, indiHandle, "wpr")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jMarketInfo = Module.addFunction(function (uid, symbol, type) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var symbolObj = null
								if (symbolName == "") {
									symbolObj = obj.symbol
								} else {
									symbolObj = getSymbolInfo(obj.brokerName, obj.accountId, symbolName)
								}
								if (type == 11) {
									return 1.0 / symbolObj.toFixed
								} else if (type == 12) {
									return Math.log10(symbolObj.toFixed)
								} else if (type == 18) {
									return symbolObj.swapLong
								} else if (type == 19) {
									return symbolObj.swapShort
								} else if (type == 22) {
									return symbolObj.tradable
								} else if (type == 23) {
									return symbolObj.lotsMinLimit
								} else if (type == 24) {
									return symbolObj.lotsStep
								} else if (type == 25) {
									return symbolObj.lotsLimit
								}
								printErrorMessage("Not supported the specific market information currently!")
								return -1
							}, "diii")

					    window.mqlIndicators[definition.name] = {
								definition: definition,
								module: Module,
								setParamInt: Module.cwrap("setParamInt", null, ["number", "number"]),
								setParamDouble: Module.cwrap("setParamDouble", null, ["number", "number"]),
								setParamBool: Module.cwrap("setParamBool", null, ["number", "number"]),
								setParamString: Module.cwrap("setParamString", null, ["number", "string"]),
								setDataInput: Module.cwrap("setDataInput", null, ["number", "number", "number"]),
								setDataOutput: Module.cwrap("setDataOutput", null, ["number", "number", "number"]),
								onCalc: Module.cwrap("onCalc", null, ["number", "number", "number", "number", "number", "number"]),
								setjPrint: Module.cwrap("setjPrint", null, ["number"]),
								setjSetIndexShift: Module.cwrap("setjSetIndexShift", null, ["number"]),
								setjChartID: Module.cwrap('setjChartID', null, ['number']),
								setjChartPeriod: Module.cwrap('setjChartPeriod', null, ['number']),
								setjChartSymbol: Module.cwrap('setjChartSymbol', null, ['number']),
								setjPeriod: Module.cwrap('setjPeriod', null, ['number']),
								setjSymbol: Module.cwrap('setjSymbol', null, ['number']),
								setjiTimeInit: Module.cwrap('setjiTimeInit', null, ['number']),
								setjiTime: Module.cwrap('setjiTime', null, ['number']),
								setjiOpenInit: Module.cwrap('setjiOpenInit', null, ['number']),
								setjiOpen: Module.cwrap('setjiOpen', null, ['number']),
								setjiHighInit: Module.cwrap('setjiHighInit', null, ['number']),
								setjiHigh: Module.cwrap('setjiHigh', null, ['number']),
								setjiLowInit: Module.cwrap('setjiLowInit', null, ['number']),
								setjiLow: Module.cwrap('setjiLow', null, ['number']),
								setjiCloseInit: Module.cwrap('setjiCloseInit', null, ['number']),
								setjiClose: Module.cwrap('setjiClose', null, ['number']),
								setjiVolumeInit: Module.cwrap('setjiVolumeInit', null, ['number']),
								setjiVolume: Module.cwrap('setjiVolume', null, ['number']),
								setjiHighest: Module.cwrap('setjiHighest', null, ['number']),
								setjiLowest: Module.cwrap('setjiLowest', null, ['number']),
								setjiACInit: Module.cwrap('setjiACInit', null, ['number']),
								setjiAC: Module.cwrap('setjiAC', null, ['number']),
								setjiADXInit: Module.cwrap('setjiADXInit', null, ['number']),
								setjiADX: Module.cwrap('setjiADX', null, ['number']),
								setjiAlligatorInit: Module.cwrap('setjiAlligatorInit', null, ['number']),
								setjiAlligator: Module.cwrap('setjiAlligator', null, ['number']),
								setjiAOInit: Module.cwrap('setjiAOInit', null, ['number']),
								setjiAO: Module.cwrap('setjiAO', null, ['number']),
								setjiATRInit: Module.cwrap('setjiATRInit', null, ['number']),
								setjiATR: Module.cwrap('setjiATR', null, ['number']),
								setjiBearsPowerInit: Module.cwrap('setjiBearsPowerInit', null, ['number']),
								setjiBearsPower: Module.cwrap('setjiBearsPower', null, ['number']),
								setjiBandsInit: Module.cwrap('setjiBandsInit', null, ['number']),
								setjiBands: Module.cwrap('setjiBands', null, ['number']),
								setjiBandsOnArray: Module.cwrap('setjiBandsOnArray', null, ['number']),
								setjiBullsPowerInit: Module.cwrap('setjiBullsPowerInit', null, ['number']),
								setjiBullsPower: Module.cwrap('setjiBullsPower', null, ['number']),
								setjiCCIInit: Module.cwrap('setjiCCIInit', null, ['number']),
								setjiCCI: Module.cwrap('setjiCCI', null, ['number']),
								setjiCCIOnArray: Module.cwrap('setjiCCIOnArray', null, ['number']),
								setjiCustomInit: Module.cwrap('setjiCustomInit', null, ['number']),
								setjiCustom: Module.cwrap('setjiCustom', null, ['number']),
								setjiDeMarkerInit: Module.cwrap('setjiDeMarkerInit', null, ['number']),
								setjiDeMarker: Module.cwrap('setjiDeMarker', null, ['number']),
								setjiEnvelopesInit: Module.cwrap('setjiEnvelopesInit', null, ['number']),
								setjiEnvelopes: Module.cwrap('setjiEnvelopes', null, ['number']),
								setjiEnvelopesOnArray: Module.cwrap('setjiEnvelopesOnArray', null, ['number']),
								setjiFractalsInit: Module.cwrap('setjiFractalsInit', null, ['number']),
								setjiFractals: Module.cwrap('setjiFractals', null, ['number']),
								setjiIchimokuInit: Module.cwrap('setjiIchimokuInit', null, ['number']),
								setjiIchimoku: Module.cwrap('setjiIchimoku', null, ['number']),
								setjiMAInit: Module.cwrap('setjiMAInit', null, ['number']),
								setjiMA: Module.cwrap('setjiMA', null, ['number']),
								setjiMAOnArray: Module.cwrap('setjiMAOnArray', null, ['number']),
								setjiMACDInit: Module.cwrap('setjiMACDInit', null, ['number']),
								setjiMACD: Module.cwrap('setjiMACD', null, ['number']),
								setjiMomentumInit: Module.cwrap('setjiMomentumInit', null, ['number']),
								setjiMomentum: Module.cwrap('setjiMomentum', null, ['number']),
								setjiMomentumOnArray: Module.cwrap('setjiMomentumOnArray', null, ['number']),
								setjiRSIInit: Module.cwrap('setjiRSIInit', null, ['number']),
								setjiRSI: Module.cwrap('setjiRSI', null, ['number']),
								setjiRSIOnArray: Module.cwrap('setjiRSIOnArray', null, ['number']),
								setjiRVIInit: Module.cwrap('setjiRVIInit', null, ['number']),
								setjiRVI: Module.cwrap('setjiRVI', null, ['number']),
								setjiSARInit: Module.cwrap('setjiSARInit', null, ['number']),
								setjiSAR: Module.cwrap('setjiSAR', null, ['number']),
								setjiStochasticInit: Module.cwrap('setjiStochasticInit', null, ['number']),
								setjiStochastic: Module.cwrap('setjiStochastic', null, ['number']),
								setjiWPRInit: Module.cwrap('setjiWPRInit', null, ['number']),
								setjiWPR: Module.cwrap('setjiWPR', null, ['number']),
								setjMarketInfo: Module.cwrap("setjMarketInfo", null, ["number"])
							}

							window.mqlIndicators[definition.name].setjPrint(jPrint)
							window.mqlIndicators[definition.name].setjSetIndexShift(jSetIndexShift)
							window.mqlIndicators[definition.name].setjChartID(jChartID)
							window.mqlIndicators[definition.name].setjChartPeriod(jChartPeriod)
							window.mqlIndicators[definition.name].setjChartSymbol(jChartSymbol)
							window.mqlIndicators[definition.name].setjPeriod(jPeriod)
							window.mqlIndicators[definition.name].setjSymbol(jSymbol)
							window.mqlIndicators[definition.name].setjiTimeInit(jiTimeInit)
							window.mqlIndicators[definition.name].setjiTime(jiTime)
							window.mqlIndicators[definition.name].setjiOpenInit(jiOpenInit)
							window.mqlIndicators[definition.name].setjiOpen(jiOpen)
							window.mqlIndicators[definition.name].setjiHighInit(jiHighInit)
							window.mqlIndicators[definition.name].setjiHigh(jiHigh)
							window.mqlIndicators[definition.name].setjiLowInit(jiLowInit)
							window.mqlIndicators[definition.name].setjiLow(jiLow)
							window.mqlIndicators[definition.name].setjiCloseInit(jiCloseInit)
							window.mqlIndicators[definition.name].setjiClose(jiClose)
							window.mqlIndicators[definition.name].setjiVolumeInit(jiVolumeInit)
							window.mqlIndicators[definition.name].setjiVolume(jiVolume)
							window.mqlIndicators[definition.name].setjiHighest(jiHighest)
							window.mqlIndicators[definition.name].setjiLowest(jiLowest)
							window.mqlIndicators[definition.name].setjiACInit(jiACInit)
							window.mqlIndicators[definition.name].setjiAC(jiAC)
							window.mqlIndicators[definition.name].setjiADXInit(jiADXInit)
							window.mqlIndicators[definition.name].setjiADX(jiADX)
							window.mqlIndicators[definition.name].setjiAlligatorInit(jiAlligatorInit)
							window.mqlIndicators[definition.name].setjiAlligator(jiAlligator)
							window.mqlIndicators[definition.name].setjiAOInit(jiAOInit)
							window.mqlIndicators[definition.name].setjiAO(jiAO)
							window.mqlIndicators[definition.name].setjiATRInit(jiATRInit)
							window.mqlIndicators[definition.name].setjiATR(jiATR)
							window.mqlIndicators[definition.name].setjiBearsPowerInit(jiBearsPowerInit)
							window.mqlIndicators[definition.name].setjiBearsPower(jiBearsPower)
							window.mqlIndicators[definition.name].setjiBandsInit(jiBandsInit)
							window.mqlIndicators[definition.name].setjiBands(jiBands)
							window.mqlIndicators[definition.name].setjiBandsOnArray(jiBandsOnArray)
							window.mqlIndicators[definition.name].setjiBullsPowerInit(jiBullsPowerInit)
							window.mqlIndicators[definition.name].setjiBullsPower(jiBullsPower)
							window.mqlIndicators[definition.name].setjiCCIInit(jiCCIInit)
							window.mqlIndicators[definition.name].setjiCCI(jiCCI)
							window.mqlIndicators[definition.name].setjiCCIOnArray(jiCCIOnArray)
							window.mqlIndicators[definition.name].setjiCustomInit(jiCustomInit)
							window.mqlIndicators[definition.name].setjiCustom(jiCustom)
							window.mqlIndicators[definition.name].setjiDeMarkerInit(jiDeMarkerInit)
							window.mqlIndicators[definition.name].setjiDeMarker(jiDeMarker)
							window.mqlIndicators[definition.name].setjiEnvelopesInit(jiEnvelopesInit)
							window.mqlIndicators[definition.name].setjiEnvelopes(jiEnvelopes)
							window.mqlIndicators[definition.name].setjiEnvelopesOnArray(jiEnvelopesOnArray)
							window.mqlIndicators[definition.name].setjiFractalsInit(jiFractalsInit)
							window.mqlIndicators[definition.name].setjiFractals(jiFractals)
							window.mqlIndicators[definition.name].setjiIchimokuInit(jiIchimokuInit)
							window.mqlIndicators[definition.name].setjiIchimoku(jiIchimoku)
							window.mqlIndicators[definition.name].setjiMAInit(jiMAInit)
							window.mqlIndicators[definition.name].setjiMA(jiMA)
							window.mqlIndicators[definition.name].setjiMAOnArray(jiMAOnArray)
							window.mqlIndicators[definition.name].setjiMACDInit(jiMACDInit)
							window.mqlIndicators[definition.name].setjiMACD(jiMACD)
							window.mqlIndicators[definition.name].setjiMomentumInit(jiMomentumInit)
							window.mqlIndicators[definition.name].setjiMomentum(jiMomentum)
							window.mqlIndicators[definition.name].setjiMomentumOnArray(jiMomentumOnArray)
							window.mqlIndicators[definition.name].setjiRSIInit(jiRSIInit)
							window.mqlIndicators[definition.name].setjiRSI(jiRSI)
							window.mqlIndicators[definition.name].setjiRSIOnArray(jiRSIOnArray)
							window.mqlIndicators[definition.name].setjiRVIInit(jiRVIInit)
							window.mqlIndicators[definition.name].setjiRVI(jiRVI)
							window.mqlIndicators[definition.name].setjiSARInit(jiSARInit)
							window.mqlIndicators[definition.name].setjiSAR(jiSAR)
							window.mqlIndicators[definition.name].setjiStochasticInit(jiStochasticInit)
							window.mqlIndicators[definition.name].setjiStochastic(jiStochastic)
							window.mqlIndicators[definition.name].setjiWPRInit(jiWPRInit)
							window.mqlIndicators[definition.name].setjiWPR(jiWPR)
							window.mqlIndicators[definition.name].setjMarketInfo(jMarketInfo)

							var monitorMemory = function () {
								for (var i in window.mqlIndicatorsBuffer) {
									var obj = window.mqlIndicatorsBuffer[i]
									var module = window.mqlIndicators[obj.name].module

									if (obj.time == obj.mTime) {
										for (var j in obj.dataInput) {
											module._free(obj.dataInput[j])
										}
										for (var j in obj.dataOutput) {
											module._free(obj.dataOutput[j])
										}
										delete window.mqlIndicatorsBuffer[i]
									} else {
										obj.mTime = obj.time
									}
								}
								setTimeout(monitorMemory, 30000)
							}
							setTimeout(monitorMemory, 30000)

							importBuiltInIndicator(
								definition.name,
								definition.description,
								function (context) {
									var indiName = getIndiName(context)
									if (typeof window.mqlIndicators == "undefined" || typeof window.mqlIndicators[indiName] == "undefined") {
										return
									}

									var indiObj = window.mqlIndicators[indiName]

									var uid = null
									if (typeof context.uid == "undefined") {
										uid = window.mqlIndiUID++
										context.uid = uid
									} else {
										uid = context.uid
									}
									var calculatedLength = 0
									if (typeof window.mqlIndicatorsBuffer[uid + ""] != "undefined") {
										calculatedLength = getCalculatedLength(context)
									}

									var currDefinition = indiObj.definition

									var nByteDouble = 8
									var nByteString = 1
									var length = 1
									var buffer = null

									if (calculatedLength == 0) {
										for (var i in currDefinition.parameters) {
											if (currDefinition.parameters[i].type == PARAMETER_TYPE.INTEGER) {
												indiObj.setParamInt(uid, getIndiParameter(context, currDefinition.parameters[i].name))
											} else if (currDefinition.parameters[i].type == PARAMETER_TYPE.NUMBER) {
												indiObj.setParamDouble(uid, getIndiParameter(context, currDefinition.parameters[i].name))
											} else if (currDefinition.parameters[i].type == PARAMETER_TYPE.BOOLEAN) {
												indiObj.setParamBool(uid, getIndiParameter(context, currDefinition.parameters[i].name))
											} else if (currDefinition.parameters[i].type == PARAMETER_TYPE.STRING) {
												indiObj.setParamString(uid, getIndiParameter(context, currDefinition.parameters[i].name))
											}
										}
									}

									var dataLen = getDataInput(context, 0).length
									var buffLen = dataLen * 2
									var ratesTotal = dataLen
									var prevCalc = calculatedLength

									var buffObj = null

									if (typeof window.mqlIndicatorsBuffer[uid + ""] == "undefined") {
										var brokerName = getBrokerNameByContext(context)
										var accountId = getAccountIdByContext(context)
										var symbolName = getChartSymbolNameByContext(context)
										var timeFrame = getChartTimeFrameByContext(context)

										window.mqlIndicatorsBuffer[uid + ""] = {
											name: definition.name,
											context: context,
											brokerName: brokerName,
											accountId: accountId,
											symbolName: symbolName,
											timeFrame: timeFrame,
											chartId: getChartHandleByContext(context),
											symbol: getSymbolInfo(brokerName, accountId, symbolName),
											bufferLen: buffLen,
											dataInput: [],
											dataOutput: [],
											time: new Date().getTime(),
											mTime: 0
										}

										buffObj = window.mqlIndicatorsBuffer[uid + ""]

										for (var i in currDefinition.dataInput) {
											var dataInput = getDataInput(context, currDefinition.dataInput[i].index)

											buffer = indiObj.module._malloc(buffLen * nByteDouble)

											for (var j = 0; j < dataInput.length; j++) {
												indiObj.module.setValue(buffer + j * nByteDouble, dataInput[j], "double")
											}

											indiObj.setDataInput(uid, buffLen, buffer)
											buffObj.dataInput.push(buffer)
										}

										for (var i in currDefinition.dataOutput) {
											buffer = indiObj.module._malloc(buffLen * nByteDouble)

											indiObj.setDataOutput(uid, buffLen, buffer)
											buffObj.dataOutput.push(buffer)
										}

										indiObj.onCalc(uid, ratesTotal, prevCalc, 10000, 1.0 / buffObj.symbol.toFixed, Math.log10(buffObj.symbol.toFixed))

										for (var i in currDefinition.dataOutput) {
											var dataOutputMql = buffObj.dataOutput[i]
											var dataOutput = getDataOutput(context, currDefinition.dataOutput[i].name)

											for (var j = 0; j < dataOutput.length; j++) {
												dataOutput[j] = indiObj.module.getValue(dataOutputMql + j * nByteDouble, "double")
											}
										}
									} else if (dataLen == window.mqlIndicatorsBuffer[uid + ""].bufferLen) {
										buffObj = window.mqlIndicatorsBuffer[uid + ""]

										buffObj.time = new Date().getTime()
										buffObj.bufferLen = buffLen

										for (var i in currDefinition.dataInput) {
											var dataInput = getDataInput(context, currDefinition.dataInput[i].index)

											buffer = indiObj.module._malloc(buffLen * nByteDouble)

											for (var j = 0; j < dataInput.length; j++) {
												indiObj.module.setValue(buffer + j * nByteDouble, dataInput[j], "double")
											}

											indiObj.setDataInput(uid, buffLen, buffer)
											indiObj.module._free(buffObj.dataInput[i])
											buffObj.dataInput.push(buffer)
										}

										for (var i in definition.dataOutput) {
											buffer = indiObj.module._malloc(buffLen * nByteDouble)

											for (var j = 0; j < dataOutput.length; j++) {
												indiObj.module.setValue(buffer + j * nByteDouble, dataOutput[j], "double")
											}

											indiObj.setDataOutput(uid, buffLen, buffer)
											indiObj.module._free(buffObj.dataOutput[i])
											buffObj.dataOutput.push(buffer)
										}

										var cData = getDataFromIndi(context, buffObj.chartId, DATA_NAME.CLOSE)
										indiObj.onCalc(uid, ratesTotal, prevCalc, cData.length, 1.0 / buffObj.symbol.toFixed, Math.log10(buffObj.symbol.toFixed))

										for (var i in currDefinition.dataOutput) {
											var dataOutputMql = buffObj.dataOutput[i]
											var dataOutput = getDataOutput(context, currDefinition.dataOutput[i].name)

											dataOutput[dataOutput.length - 1] = indiObj.module.getValue(dataOutputMql + (dataOutput.length - 1) * nByteDouble, "double")
										}
									} else {
										buffObj = window.mqlIndicatorsBuffer[uid + ""]

										buffObj.time = new Date().getTime()

										for (var i in currDefinition.dataInput) {
											var dataInputMql = buffObj.dataInput[i]
											var dataInput = getDataInput(context, currDefinition.dataInput[i].index)

											indiObj.module.setValue(dataInputMql + (dataInput.length - 1) * nByteDouble, dataInput[dataInput.length - 1], "double")
										}

										var cData = getDataFromIndi(context, buffObj.chartId, DATA_NAME.CLOSE)
										indiObj.onCalc(uid, ratesTotal, prevCalc, cData.length, 1.0 / buffObj.symbol.toFixed, Math.log10(buffObj.symbol.toFixed))

										for (var i in currDefinition.dataOutput) {
											var dataOutputMql = buffObj.dataOutput[i]
											var dataOutput = getDataOutput(context, currDefinition.dataOutput[i].name)

											dataOutput[dataOutput.length - 1] = indiObj.module.getValue(dataOutputMql + (dataOutput.length - 1) * nByteDouble, "double")
										}
									}

									for (var i in currDefinition.parameters) {
										if (currDefinition.parameters[i].name == "shift") {
											var shift = getIndiParameter(context, "shift")
											if (shift != null && calculatedLength == 0) {
												for (var j in currDefinition.dataOutput) {
													setIndiShift(context, currDefinition.dataOutput[j].name, shift)
												}
											}

											break
										}
									}
								},
								definition.parameters,
								definition.dataInput,
								definition.dataOutput,
								definition.whereToRender
							) // registerIndicator

							rs()
						}) // Module["onRuntimeInitialized"]
					})
					.catch(function () {
						rj()
					})
				})
			}

			if (currDef == null) {
				if (typeof localStorage.allMqlIndis != "undefined") {
					var allMqlIndis = JSON.parse(localStorage.allMqlIndis)
					var cursor = 0
					var load = function (idx) {
						loadMql(allMqlIndis[idx])
						.then(function () {
							cursor++
							if (cursor < allMqlIndis.length) {
								load(cursor)
							}
						})
						.catch(function () {
							cursor++
							if (cursor < allMqlIndis.length) {
								load(cursor)
							}
						})
					}

					load(cursor)
				}
			} else if (typeof currDef.rm != "undefined") {
				if (typeof localStorage.allMqlIndis != "undefined") {
					var allMqlIndis = JSON.parse(localStorage.allMqlIndis)
					for (var i in allMqlIndis) {
						if (allMqlIndis[i].name == currDef.rm) {
							allMqlIndis.splice(i, 1)

							unregisterIndicator(currDef.rm)

							if (typeof window.mqlIndicators == "undefined" || window.mqlIndicatorsBuffer == "undefined") break

							delete window.mqlIndicators[currDef.rm]
							for (var j in window.mqlIndicatorsBuffer) {
								if (window.mqlIndicatorsBuffer[j].name == currDef.rm) {
									for (var k in window.mqlIndicatorsBuffer[j].dataInput) {
										window.mqlIndicators[definition.name].module._free(window.mqlIndicatorsBuffer[j].dataInput[k])
									}
									for (var k in window.mqlIndicatorsBuffer[j].dataOutput) {
										window.mqlIndicators[definition.name].module._free(window.mqlIndicatorsBuffer[j].dataOutput[k])
									}
									delete window.mqlIndicatorsBuffer[j]
								}
							}
							break
						}
					}

					localStorage.allMqlIndis = JSON.stringify(allMqlIndis)
				}
			} else {
				var oldDef = null

				var loadCurrDef = function () {
					loadMql(currDef)
					.then(function () {
						var allMqlIndis = null
						if (typeof localStorage.allMqlIndis != "undefined") {
							allMqlIndis = JSON.parse(localStorage.allMqlIndis)
						} else {
							allMqlIndis = []
						}

						for (var i in allMqlIndis) {
							if (allMqlIndis[i].name == currDef.name) {
								allMqlIndis.splice(i, 1)
								break
							}
						}

						allMqlIndis.push(currDef)

						localStorage.allMqlIndis = JSON.stringify(allMqlIndis)
					})
					.catch(function () {
						if (oldDef != null) {
							loadMql(oldDef)
							.then(function () {})
							.catch(function () {})
						}
					})
				}

				if (typeof localStorage.allMqlIndis != "undefined") {
					var allMqlIndis = JSON.parse(localStorage.allMqlIndis)
					if (typeof window.mqlIndicators == "undefined" || typeof window.mqlIndicators[allMqlIndis[0].name] == "undefined") {
						var cursor = 0
						var load = function (idx) {
							loadMql(allMqlIndis[idx])
							.then(function () {
								cursor++
								if (cursor < allMqlIndis.length) {
									if (allMqlIndis[cursor].name == currDef.name) {
										oldDef = allMqlIndis[cursor]
										cursor++
										if (cursor < allMqlIndis.length) {
											load(cursor)
										} else {
											loadCurrDef()
										}
									} else {
										load(cursor)
									}
								} else {
									loadCurrDef()
								}
							})
							.catch(function () {
								cursor++
								if (cursor < allMqlIndis.length) {
									if (allMqlIndis[cursor].name == currDef.name) {
										oldDef = allMqlIndis[cursor]
										cursor++
										if (cursor < allMqlIndis.length) {
											load(cursor)
										} else {
											loadCurrDef()
										}
									} else {
										load(cursor)
									}
								} else {
									loadCurrDef()
								}
							})
						}

						load(cursor)
					} else {
						for (var i in allMqlIndis) {
							if (allMqlIndis[i].name == currDef.name) {
								oldDef = allMqlIndis[i]

								unregisterIndicator(currDef.name)

								delete window.mqlIndicators[currDef.name]
								for (var j in window.mqlIndicatorsBuffer) {
									if (window.mqlIndicatorsBuffer[j].name == currDef.name) {
										for (var k in window.mqlIndicatorsBuffer[j].dataInput) {
											window.mqlIndicators[definition.name].module._free(window.mqlIndicatorsBuffer[j].dataInput[k])
										}
										for (var k in window.mqlIndicatorsBuffer[j].dataOutput) {
											window.mqlIndicators[definition.name].module._free(window.mqlIndicatorsBuffer[j].dataOutput[k])
										}
										delete window.mqlIndicatorsBuffer[j]
									}
								}
								break
							}
						}

						loadCurrDef()
					}
				} else {
					loadCurrDef()
				}
			}
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"mql_ea_loader_plugin",
		"mql_plugin to make MQL-based EAs runnable on Fintechee(v1.11)",
		[{ // parameters
			name: "definition",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var def = getEAParameter(context, "definition")
			var currDef = (def == null || def === "") ? null : JSON.parse(def)

			var loadMql = function (definition) {
				return new Promise(function (rs, rj) {
					var scriptPromise = new Promise(function (resolve, reject) {
						var tags = document.getElementsByTagName("script")
						for (var i = tags.length - 1; i >= 0; i--) {
							if (tags[i] && tags[i].getAttribute("src") != null && tags[i].getAttribute("src") == definition.url) {
								tags[i].parentNode.removeChild(tags[i])
								break
							}
						}

					  var script = document.createElement("script")
					  document.body.appendChild(script)
					  script.onload = resolve
					  script.onerror = reject
					  script.async = true
					  script.src = definition.url
					})

					scriptPromise.then(function () {
						EAPlugIn().then(function (Module) {
							if (typeof window.mqlEAs == "undefined") {
								window.mqlEAs = []
								window.mqlEAsBuffer = []
								window.mqlEAUID = 0
							}

							var jChartClose = Module.addFunction(function (uid, chart_id) {
								if (chart_id == 0) {
									return removeChart(window.mqlEAsBuffer[uid + ""].chartId)
								} else {
									return removeChart(chart_id)
								}
							}, "iii")
							var jChartID = Module.addFunction(function (uid) {
							  return window.mqlEAsBuffer[uid + ""].chartId
							}, "ii")
							var jChartOpen = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm)
							}, "iiii")
							var jChartPeriod = Module.addFunction(function (uid, chart_id) {
								var obj = window.mqlEAsBuffer[uid + ""]
								if (chart_id == 0) {
									return obj.convertTimeFrame(obj.timeFrame)
								} else {
									return obj.convertTimeFrame(getChartTimeFrame(chart_id))
								}
							}, "iii")
							var jChartSymbol = Module.addFunction(function (uid, chart_id) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = ""
								if (chart_id == 0) {
									symbolName = obj.symbolName
								} else {
									symbolName = getChartSymbolName(chart_id)
								}
								var lengthBytes = window.mqlEAs[obj.name].module.lengthBytesUTF8(symbolName) + 1
								var stringOnWasmHeap = window.mqlEAs[obj.name].module._malloc(lengthBytes)
								window.mqlEAs[obj.name].module.stringToUTF8(symbolName, stringOnWasmHeap, lengthBytes)
								return stringOnWasmHeap
							}, "iii")
							var jPeriod = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return obj.convertTimeFrame(obj.timeFrame)
							}, "ii")
							var jSymbol = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = obj.symbolName
								var lengthBytes = window.mqlEAs[obj.name].module.lengthBytesUTF8(symbolName) + 1
							  var stringOnWasmHeap = window.mqlEAs[obj.name].module._malloc(lengthBytes)
							  window.mqlEAs[obj.name].module.stringToUTF8(symbolName, stringOnWasmHeap, lengthBytes)
							  return stringOnWasmHeap
							}, "ii")
							var jAccountBalance = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var account = getAccount(obj.context, 0)
								return getBalanceOfAccount(account)
							}, "di")
							var jAccountCompany = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var account = getAccount(obj.context, 0)
								var brokerName = getBrokerNameOfAccount(account)
								var lengthBytes = window.mqlEAs[obj.name].module.lengthBytesUTF8(brokerName) + 1
							  var stringOnWasmHeap = window.mqlEAs[obj.name].module._malloc(lengthBytes)
							  window.mqlEAs[obj.name].module.stringToUTF8(brokerName, stringOnWasmHeap, lengthBytes)
							  return stringOnWasmHeap
							}, "ii")
							var jAccountCurrency = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var account = getAccount(obj.context, 0)
								var currency = getCurrencyOfAccount(account)
								var lengthBytes = window.mqlEAs[obj.name].module.lengthBytesUTF8(currency) + 1
							  var stringOnWasmHeap = window.mqlEAs[obj.name].module._malloc(lengthBytes)
							  window.mqlEAs[obj.name].module.stringToUTF8(currency, stringOnWasmHeap, lengthBytes)
							  return stringOnWasmHeap
							}, "ii")
							var jAccountEquity = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var account = getAccount(obj.context, 0)
								return getEquityOfAccount(account)
							}, "di")
							var jAccountFreeMargin = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var account = getAccount(obj.context, 0)
								return getMarginAvailableOfAccount(account)
							}, "di")
							var jAccountMargin = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var account = getAccount(obj.context, 0)
								return getMarginUsedOfAccount(account)
							}, "di")
							var jAccountProfit = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var account = getAccount(obj.context, 0)
								return getUnrealizedPLOfAccount(account)
							}, "di")
							var jOrdersTotal = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getOrdersTradesListLength(obj.context)
							}, "ii")
							var jOrdersHistoryTotal = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getHistoryPoolLength(obj.context)
							}, "ii")
							var jOrderSelect = Module.addFunction(function (uid, index, select, pool) {
								var obj = window.mqlEAsBuffer[uid + ""]
								try {
									var orderOrTrade = null
									if (select == 1) {
										if (pool == 2) {
											orderOrTrade = getOrderOrTradeFromHistoryByIndex(obj.context, index)
										} else {
											orderOrTrade = getOrderOrTradeByIndex(obj.context, index)
										}
									} else {
										if (pool == 2) {
											orderOrTrade = getOrderOrTradeFromHistoryById(obj.context, index + "")
										} else {
											orderOrTrade = getOrderOrTradeById(obj.context, index + "")
										}
									}
									obj.orderOrTrade = orderOrTrade.orderOrTrade
									obj.type = orderOrTrade.type
									return 1
								} catch(e) {
									return 0
								}
							}, "iiiii")
							var jOrderOpenPrice = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getOrderTradePrice(obj.orderOrTrade)
							}, "di")
							var jOrderType = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var orderType = getOrderType(obj.orderOrTrade)
								if ("BUY" == orderType) {
							    return 0;
							  } else if ("SELL" == orderType) {
							    return 1;
							  } else if ("BUY LIMIT" == orderType) {
							    return 2;
							  } else if ("SELL LIMIT" == orderType) {
							    return 3;
							  } else if ("BUY STOP" == orderType) {
							    return 4;
							  } else {
							    return 5;
							  }
							}, "ii")
							var jOrderTakeProfit = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getTakeProfit(obj.orderOrTrade)
							}, "di")
							var jOrderStopLoss = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getStopLoss(obj.orderOrTrade)
							}, "di")
							var jOrderLots = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getOrderTradeLots(obj.orderOrTrade)
							}, "di")
							var jOrderProfit = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getPL(obj.orderOrTrade)
							}, "di")
							var jOrderSymbol = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = getSymbolName(obj.orderOrTrade)
								var lengthBytes = window.mqlEAs[obj.name].module.lengthBytesUTF8(symbolName) + 1
							  var stringOnWasmHeap = window.mqlEAs[obj.name].module._malloc(lengthBytes)
							  window.mqlEAs[obj.name].module.stringToUTF8(symbolName, stringOnWasmHeap, lengthBytes)
							  return stringOnWasmHeap
							}, "ii")
							var jOrderTicket = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return parseInt(getId(obj.orderOrTrade))
							}, "ii")
							var jOrderMagicNumber = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getMagicNumber(obj.orderOrTrade)
							}, "ii")
							var jOrderOpenTime = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getOrderTradeTime(obj.orderOrTrade)
							}, "ii")
							var jOrderComment = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var comment = getComment(obj.orderOrTrade)
								var lengthBytes = window.mqlEAs[obj.name].module.lengthBytesUTF8(comment) + 1
							  var stringOnWasmHeap = window.mqlEAs[obj.name].module._malloc(lengthBytes)
							  window.mqlEAs[obj.name].module.stringToUTF8(comment, stringOnWasmHeap, lengthBytes)
							  return stringOnWasmHeap
							}, "ii")
							var jOrderExpiration = Module.addFunction(function (uid) {
								var obj = window.mqlEAsBuffer[uid + ""]
								return getExpiration(obj.orderOrTrade)
							}, "ii")
							var jOrderPrint = Module.addFunction(function (uid) {
								var orderOrTrade = window.mqlEAsBuffer[uid + ""].orderOrTrade
								// todo add more information
								return printMessage(getId(orderOrTrade) + " " + getOrderTradeTime(orderOrTrade) + " " + getOrderType(orderOrTrade) + " " + getOrderTradeLots(orderOrTrade) + " " +
												getSymbolName(orderOrTrade) + " " + getOrderTradePrice(orderOrTrade) + " " + getStopLoss(orderOrTrade) + " " + getTakeProfit(orderOrTrade))
							}, "vi")
							var jPrint = Module.addFunction(function (uid, s) {
								var obj = window.mqlEAsBuffer[uid + ""]
								printMessage(window.mqlEAs[obj.name].module.UTF8ToString(s))
							}, "vii")
							var jiTimeInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm)
							}, "iiii")
							var jiTime = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, chartHandle, "Time")
								return arr[arr.length - shift - 1]
							}, "iiii")
							var jiOpenInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm)
							}, "iiii")
							var jiOpen = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, chartHandle, "Open")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiHighInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm)
							}, "iiii")
							var jiHigh = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, chartHandle, "High")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiLowInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm)
							}, "iiii")
							var jiLow = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, chartHandle, "Low")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiCloseInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm)
							}, "iiii")
							var jiClose = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, chartHandle, "Close")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiVolumeInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getChartHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm)
							}, "iiii")
							var jiVolume = Module.addFunction(function (uid, chartHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, chartHandle, "Volume")
								return arr[arr.length - shift - 1]
							}, "iiii")
							var jiHighest = Module.addFunction(function (uid, chartHandle, mode, count, start) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, chartHandle, md)
								var highest = -Number.MAX_VALUE
								var idx = -1
								for (var i = start; i < start + count && i >= 0 && i < arr.length; i++) {
									if (arr[arr.length - i - 1] > highest) {
										highest = arr[arr.length - i - 1]
										idx = i
									}
								}
								return idx
							}, "iiiiii")
							var jiLowest = Module.addFunction(function (uid, chartHandle, mode, count, start) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, chartHandle, md)
								var lowest = Number.MAX_VALUE
								var idx = -1
								for (var i = start; i < start + count && i >= 0 && i < arr.length; i++) {
									if (arr[arr.length - i - 1] < lowest) {
										lowest = arr[arr.length - i - 1]
										idx = i
									}
								}
								return idx
							}, "iiiiii")
							var jiACInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "ac", [])
							}, "iiii")
							var jiAC = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arrUp = getData(obj.context, indiHandle, "up")
								var arrDown = getData(obj.context, indiHandle, "down")
								return arrUp[arrUp.length - shift - 1] > 0 ? arrUp[arrUp.length - shift - 1] : arrDown[arrDown.length - shift - 1]
							}, "diii")
							var jiADXInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "adx_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiADX = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiAlligatorInit = Module.addFunction(function (uid, symbol, timeframe, jaw_period, jaw_shift, teeth_period, teeth_shift, lips_period, lips_shift, ma_method, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								var method = window.mqlEAs[obj.name].module.UTF8ToString(ma_method)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "alligator_for_mql", [{
									name: "jawsPeriod",
									value: jaw_period
								},{
									name: "jawsShift",
									value: jaw_shift
								},{
									name: "teethPeriod",
									value: teeth_period
								},{
									name: "teethShift",
									value: teeth_shift
								},{
									name: "lipsPeriod",
									value: lips_period
								},{
									name: "lipsShift",
									value: lips_shift
								},{
									name: "method",
									value: method
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiiiiiiiii")
							var jiAlligator = Module.addFunction(function (uid, indiHandle, jaw_shift, teeth_shift, lips_shift, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								if (md == "jaws") {
									return arr[arr.length - jaw_shift - shift - 1]
								} else if (md == "teeth") {
									return arr[arr.length - teeth_shift - shift - 1]
								} else {
									return arr[arr.length - lips_shift - shift - 1]
								}
							}, "diiiiiii")
							var jiAOInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "ao", [])
							}, "iiii")
							var jiAO = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arrUp = getData(obj.context, indiHandle, "up")
								var arrDown = getData(obj.context, indiHandle, "down")
								return arrUp[arrUp.length - shift - 1] > 0 ? arrUp[arrUp.length - shift - 1] : arrDown[arrDown.length - shift - 1]
							}, "diii")
							var jiATRInit = Module.addFunction(function (uid, symbol, timeframe, period) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "atr", [{
									name: "period",
									value: period
								}])
							}, "iiiii")
							var jiATR = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "atr")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiBearsPowerInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "bears_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiBearsPower = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "bears")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiBandsInit = Module.addFunction(function (uid, symbol, timeframe, period, deviation, bands_shift, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "bands_for_mql", [{
								    name: "period",
								    value: period,
								},{
								    name: "deviations",
								    value: deviation,
								},{
								    name: "shift",
								    value: bands_shift,
								},{
								    name: "method",
								    value: "sma"
								},{
									name: "appliedPrice",
									value: applied_price,
								}])
							}, "iiiiidii")
							var jiBands = Module.addFunction(function (uid, indiHandle, bands_shift, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - bands_shift - shift - 1]
							}, "diiiii")
							var jiBandsOnArray = Module.addFunction(function (uid, array, total, period, deviation, bands_shift, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlEAs[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("bands_for_mql", [{
								    name: "period",
								    value: period,
								},{
								    name: "deviations",
								    value: deviation,
								},{
								    name: "shift",
								    value: bands_shift,
								},{
								    name: "method",
								    value: "sma"
								},{
									name: "appliedPrice",
									value: 0,
								}], dataInput, total)
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getDataOnArray(dataOutput, md)
								return arr[arr.length - bands_shift - shift - 1]
							}, "diiiidiii")
							var jiBullsPowerInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "bulls_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiBullsPower = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "bulls")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiCCIInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "cci_for_mql", [{
							    name: "period",
							    value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiCCI = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "cci")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiCCIOnArray = Module.addFunction(function (uid, array, total, period, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlEAs[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("cci_for_mql", [{
								    name: "period",
								    value: period,
								},{
									name: "appliedPrice",
									value: 0,
								}], dataInput, total)
								var arr = getDataOnArray(dataOutput, "cci")
								return arr[arr.length - shift - 1]
							}, "diiiii")
							var jiCustomInit = Module.addFunction(function (uid, symbol, timeframe, name, paramString) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var indiName = window.mqlEAs[obj.name].module.UTF8ToString(name)
								if (typeof window.mqlIndicators == "undefined" || typeof window.mqlIndicators[indiName] == "undefined") {
									throw new Error("Please start MQL indicator loader plugin and load the specific indicator(" + indiName + ").")
								}
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								var params = window.mqlEAs[obj.name].module.UTF8ToString(paramString).split("|||")
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								var parameters = JSON.parse(JSON.stringify(window.mqlIndicators[indiName].definition.parameters))
								for (var i in parameters) {
									if (isInteger(params[i])) {
										parameters[i].value = parseInt(params[i])
									} else if (isNumeric(params[i])) {
										parameters[i].value = parseFloat(params[i])
									} else if (params[i] == "true") {
										parameters[i].value = true
									} else if (params[i] == "false") {
										parameters[i].value = false
									} else {
										parameters[i].value = params[i]
									}
								}
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, indiName, parameters)
							}, "iiiiii")
							var jiCustom = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiDeMarkerInit = Module.addFunction(function (uid, symbol, timeframe, period) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "demarker", [{
									name: "period",
									value: period
								}])
							}, "iiiii")
							var jiDeMarker = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "demarker")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiEnvelopesInit = Module.addFunction(function (uid, symbol, timeframe, ma_period, ma_method, ma_shift, applied_price, deviation) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								var method = window.mqlEAs[obj.name].module.UTF8ToString(ma_method)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "envelopes_for_mql", [{
								    name: "period",
								    value: ma_period
								},{
								    name: "deviations",
								    value: deviation
								},{
								    name: "shift",
								    value: ma_shift
								},{
								    name: "method",
								    value: method
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiiiiid")
							var jiEnvelopes = Module.addFunction(function (uid, indiHandle, ma_shift, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - ma_shift - shift - 1]
							}, "diiiii")
							var jiEnvelopesOnArray = Module.addFunction(function (uid, array, total, ma_period, ma_method, ma_shift, deviation, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var method = window.mqlEAs[obj.name].module.UTF8ToString(ma_method)
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlEAs[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("envelopes_for_mql", [{
										name: "period",
										value: ma_period
								},{
										name: "deviations",
										value: deviation
								},{
										name: "shift",
										value: ma_shift
								},{
										name: "method",
										value: method
								},{
									name: "appliedPrice",
									value: 0
								}], dataInput, total)
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getDataOnArray(dataOutput, md)
								return arr[arr.length - ma_shift - shift - 1]
							}, "diiiiiidii")
							var jiFractalsInit = Module.addFunction(function (uid, symbol, timeframe) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "fractals", [])
							}, "iiii")
							var jiFractals = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiIchimokuInit = Module.addFunction(function (uid, symbol, timeframe, tenkan_sen, kijun_sen, senkou_span_b) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "ichimoku", [{
								    name: "tenkan",
								    value: tenkan_sen
								},{
								    name: "kijun",
								    value: kijun_sen
								},{
								    name: "senkou",
								    value: senkou_span_b
								}])
							}, "iiiiiii")
							var jiIchimoku = Module.addFunction(function (uid, indiHandle, ichimoku_shift, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - ichimoku_shift - shift - 1]
							}, "diiiii")
							var jiMAInit = Module.addFunction(function (uid, symbol, timeframe, ma_period, ma_shift, ma_method, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								var params = [{
									name: "period",
									value: ma_period
								},{
									name: "shift",
									value: ma_shift
								},{
									name: "appliedPrice",
									value: applied_price
								}]
								if (ma_method == 1) {
									return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "ema_for_mql", params)
								} else if (ma_method == 2) {
									return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "smma_for_mql", params)
								} else if (ma_method == 3) {
									return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "lwma_for_mql", params)
								} else {
									return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "sma_for_mql", params)
								}
							}, "iiiiiiii")
							var jiMA = Module.addFunction(function (uid, indiHandle, ma_shift, ma_method, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var method = window.mqlEAs[obj.name].module.UTF8ToString(ma_method)
								var arr = getData(obj.context, indiHandle, method)
								return arr[arr.length - ma_shift - shift - 1]
							}, "diiiii")
							var jiMAOnArray = Module.addFunction(function (uid, array, total, ma_period, ma_shift, ma_method, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var method = window.mqlEAs[obj.name].module.UTF8ToString(ma_method)
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlEAs[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = null
								var params = [{
									name: "period",
									value: ma_period
								},{
									name: "shift",
									value: ma_shift
								},{
									name: "appliedPrice",
									value: 0
								}]
								if (method == "ema") {
									dataOutput = calcIndicatorOnArray("ema_for_mql", params, dataInput, total)
								} else if (method == "smma") {
									dataOutput = calcIndicatorOnArray("smma_for_mql", params, dataInput, total)
								} else if (method == "lwma") {
									dataOutput = calcIndicatorOnArray("lwma_for_mql", params, dataInput, total)
								} else {
									dataOutput = calcIndicatorOnArray("sma_for_mql", params, dataInput, total)
								}
								var arr = getDataOnArray(dataOutput, method)
								return arr[arr.length - ma_shift - shift - 1]
							}, "diiiiiii")
							var jiMACDInit = Module.addFunction(function (uid, symbol, timeframe, fast_ema_period, slow_ema_period, signal_period, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "macd_for_mql", [{
									name: "fastEMA",
									value: fast_ema_period
								},{
									name: "slowEMA",
									value: slow_ema_period
								},{
									name: "signalSMA",
									value: signal_period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiiiii")
							var jiMACD = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiMomentumInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "momentum_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiMomentum = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "momentum")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiMomentumOnArray = Module.addFunction(function (uid, array, total, period, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlEAs[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("momentum_for_mql", [{
								    name: "period",
								    value: period,
								},{
									name: "appliedPrice",
									value: 0,
								}], dataInput, total)
								var arr = getDataOnArray(dataOutput, "momentum")
								return arr[arr.length - shift - 1]
							}, "diiiii")
							var jiRSIInit = Module.addFunction(function (uid, symbol, timeframe, period, applied_price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "rsi_for_mql", [{
									name: "period",
									value: period
								},{
									name: "appliedPrice",
									value: applied_price
								}])
							}, "iiiiii")
							var jiRSI = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "rsi")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiRSIOnArray = Module.addFunction(function (uid, array, total, period, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var nByteDouble = 8
								var data = new Array(total)
								for (var i = 0; i < data.length; i++) {
									data[i] = window.mqlEAs[obj.name].module.getValue(array + i * nByteDouble, "double")
								}
								var dataInput = []
								dataInput[0] = data
								var dataOutput = calcIndicatorOnArray("rsi_for_mql", [{
								    name: "period",
								    value: period,
								},{
									name: "appliedPrice",
									value: 0,
								}], dataInput, total)
								var arr = getDataOnArray(dataOutput, "rsi")
								return arr[arr.length - shift - 1]
							}, "diiiii")
							var jiRVIInit = Module.addFunction(function (uid, symbol, timeframe, period) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "rvi", [{
									name: "period",
									value: period
								}])
							}, "iiiii")
							var jiRVI = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiSARInit = Module.addFunction(function (uid, symbol, timeframe, step, maximum) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "sar", [{
									name: "acceleration",
									value: step,
								},{
									name: "afMax",
									value: maximum,
								}])
							}, "iiiidd")
							var jiSAR = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "sar")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jiStochasticInit = Module.addFunction(function (uid, symbol, timeframe, Kperiod, Dperiod, slowing, ma_method) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								var method = window.mqlEAs[obj.name].module.UTF8ToString(ma_method)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "stochastic", [{
									name: "KPeriod",
									value: Kperiod
								},{
									name: "slowing",
									value: slowing
								},{
									name: "DPeriod",
									value: Dperiod
								},{
									name: "method",
									value: method
								}])
							}, "iiiiiiii")
							var jiStochastic = Module.addFunction(function (uid, indiHandle, mode, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var md = window.mqlEAs[obj.name].module.UTF8ToString(mode)
								var arr = getData(obj.context, indiHandle, md)
								return arr[arr.length - shift - 1]
							}, "diiii")
							var jiWPRInit = Module.addFunction(function (uid, symbol, timeframe, period) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var symbolName = window.mqlEAs[obj.name].module.UTF8ToString(symbol)
								var timeFrm = window.mqlEAs[obj.name].module.UTF8ToString(timeframe)
								symbolName = symbolName == "" ? obj.symbolName : symbolName
								timeFrm = timeFrm == "0" ? obj.timeFrame : timeFrm
								return getIndicatorHandle(obj.context, obj.brokerName, obj.accountId, symbolName, timeFrm, "wpr", [{
									name: "period",
									value: period
								}])
							}, "iiiii")
							var jiWPR = Module.addFunction(function (uid, indiHandle, shift) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var arr = getData(obj.context, indiHandle, "wpr")
								return arr[arr.length - shift - 1]
							}, "diii")
							var jARROW_CHECKCreate = Module.addFunction(function (uid, chart_id, object_name, time, price) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var name = window.mqlEAs[obj.name].module.UTF8ToString(object_name)
								var objId = addSignal(chart_id, name, time, price)
								if (objId != -1) {
									obj.objs.push({id: objId, chartId: chart_id, name: name})
									localStorage.mqlObjs = JSON.stringify(obj.objs)
									return 1
								} else {
									return 0
								}
							}, "iiiiid")
							var jARROW_CHECKDelete = Module.addFunction(function (uid, object_name) {
								var obj = window.mqlEAsBuffer[uid + ""]
								var name = window.mqlEAs[obj.name].module.UTF8ToString(object_name)
								var success = false
								for (var i = obj.objs.length - 1; i >= 0; i--) {
									if (obj.objs[i].name == name) {
										if (removeSignal(obj.objs[i].chartId, obj.objs[i].id)) {
											success = true
											obj.objs.splice(i, 1)
										}
									}
								}
								if (success) {
									localStorage.mqlObjs = JSON.stringify(obj.objs)
									return 1
								} else {
									return 0
								}
							}, "iii")
							var jIsTesting = Module.addFunction(function () {
								return isTesting() ? 1 : 0
							}, "i")
							var jMarketInfo = Module.addFunction(function (uid, symbol, type) {
								var obj = window.mqlIndicatorsBuffer[uid + ""]
								var symbolName = window.mqlIndicators[obj.name].module.UTF8ToString(symbol)
								var symbolObj = null
								if (symbolName == "") {
									symbolObj = obj.symbol
								} else {
									symbolObj = getSymbolInfo(obj.brokerName, obj.accountId, symbolName)
								}
								if (type == 11) {
									return 1.0 / symbolObj.toFixed
								} else if (type == 12) {
									return Math.log10(symbolObj.toFixed)
								} else if (type == 18) {
									return symbolObj.swapLong
								} else if (type == 19) {
									return symbolObj.swapShort
								} else if (type == 22) {
									return symbolObj.tradable
								} else if (type == 23) {
									return symbolObj.lotsMinLimit
								} else if (type == 24) {
									return symbolObj.lotsStep
								} else if (type == 25) {
									return symbolObj.lotsLimit
								}
								printErrorMessage("Not supported the specific market information currently!")
								return -1
							}, "diii")

					    window.mqlEAs[definition.name] = {
								definition: definition,
								module: Module,
								setParamInt: Module.cwrap("setParamInt", null, ["number", "number"]),
								setParamDouble: Module.cwrap("setParamDouble", null, ["number", "number"]),
								setParamBool: Module.cwrap("setParamBool", null, ["number", "number"]),
								setParamString: Module.cwrap("setParamString", null, ["number", "string"]),
								onTick: Module.cwrap("onTick", null, ["number", "number", "number", "number", "number", "number"]),
								setjPrint: Module.cwrap('setjPrint', null, ['number']),
								setjChartClose: Module.cwrap('setjChartClose', null, ['number']),
								setjChartID: Module.cwrap('setjChartID', null, ['number']),
								setjChartOpen: Module.cwrap('setjChartOpen', null, ['number']),
								setjChartPeriod: Module.cwrap('setjChartPeriod', null, ['number']),
								setjChartSymbol: Module.cwrap('setjChartSymbol', null, ['number']),
								setjPeriod: Module.cwrap('setjPeriod', null, ['number']),
								setjSymbol: Module.cwrap('setjSymbol', null, ['number']),
								setjAccountBalance: Module.cwrap('setjAccountBalance', null, ['number']),
								setjAccountCompany: Module.cwrap('setjAccountCompany', null, ['number']),
								setjAccountCurrency: Module.cwrap('setjAccountCurrency', null, ['number']),
								setjAccountEquity: Module.cwrap('setjAccountEquity', null, ['number']),
								setjAccountFreeMargin: Module.cwrap('setjAccountFreeMargin', null, ['number']),
								setjAccountMargin: Module.cwrap('setjAccountMargin', null, ['number']),
								setjAccountProfit: Module.cwrap('setjAccountProfit', null, ['number']),
								setjOrdersTotal: Module.cwrap('setjOrdersTotal', null, ['number']),
								setjOrdersHistoryTotal: Module.cwrap('setjOrdersHistoryTotal', null, ['number']),
								setjOrderSelect: Module.cwrap('setjOrderSelect', null, ['number']),
								setjOrderOpenPrice: Module.cwrap('setjOrderOpenPrice', null, ['number']),
								setjOrderType: Module.cwrap('setjOrderType', null, ['number']),
								setjOrderTakeProfit: Module.cwrap('setjOrderTakeProfit', null, ['number']),
								setjOrderStopLoss: Module.cwrap('setjOrderStopLoss', null, ['number']),
								setjOrderLots: Module.cwrap('setjOrderLots', null, ['number']),
								setjOrderProfit: Module.cwrap('setjOrderProfit', null, ['number']),
								setjOrderSymbol: Module.cwrap('setjOrderSymbol', null, ['number']),
								setjOrderTicket: Module.cwrap('setjOrderTicket', null, ['number']),
								setjOrderMagicNumber: Module.cwrap('setjOrderMagicNumber', null, ['number']),
								setjOrderOpenTime: Module.cwrap('setjOrderOpenTime', null, ['number']),
								setjOrderComment: Module.cwrap('setjOrderComment', null, ['number']),
								setjOrderExpiration: Module.cwrap('setjOrderExpiration', null, ['number']),
								setjOrderPrint: Module.cwrap('setjOrderPrint', null, ['number']),
								setjiTimeInit: Module.cwrap('setjiTimeInit', null, ['number']),
								setjiTime: Module.cwrap('setjiTime', null, ['number']),
								setjiOpenInit: Module.cwrap('setjiOpenInit', null, ['number']),
								setjiOpen: Module.cwrap('setjiOpen', null, ['number']),
								setjiHighInit: Module.cwrap('setjiHighInit', null, ['number']),
								setjiHigh: Module.cwrap('setjiHigh', null, ['number']),
								setjiLowInit: Module.cwrap('setjiLowInit', null, ['number']),
								setjiLow: Module.cwrap('setjiLow', null, ['number']),
								setjiCloseInit: Module.cwrap('setjiCloseInit', null, ['number']),
								setjiClose: Module.cwrap('setjiClose', null, ['number']),
								setjiVolumeInit: Module.cwrap('setjiVolumeInit', null, ['number']),
								setjiVolume: Module.cwrap('setjiVolume', null, ['number']),
								setjiHighest: Module.cwrap('setjiHighest', null, ['number']),
								setjiLowest: Module.cwrap('setjiLowest', null, ['number']),
								setjiACInit: Module.cwrap('setjiACInit', null, ['number']),
								setjiAC: Module.cwrap('setjiAC', null, ['number']),
								setjiADXInit: Module.cwrap('setjiADXInit', null, ['number']),
								setjiADX: Module.cwrap('setjiADX', null, ['number']),
								setjiAlligatorInit: Module.cwrap('setjiAlligatorInit', null, ['number']),
								setjiAlligator: Module.cwrap('setjiAlligator', null, ['number']),
								setjiAOInit: Module.cwrap('setjiAOInit', null, ['number']),
								setjiAO: Module.cwrap('setjiAO', null, ['number']),
								setjiATRInit: Module.cwrap('setjiATRInit', null, ['number']),
								setjiATR: Module.cwrap('setjiATR', null, ['number']),
								setjiBearsPowerInit: Module.cwrap('setjiBearsPowerInit', null, ['number']),
								setjiBearsPower: Module.cwrap('setjiBearsPower', null, ['number']),
								setjiBandsInit: Module.cwrap('setjiBandsInit', null, ['number']),
								setjiBands: Module.cwrap('setjiBands', null, ['number']),
								setjiBandsOnArray: Module.cwrap('setjiBandsOnArray', null, ['number']),
								setjiBullsPowerInit: Module.cwrap('setjiBullsPowerInit', null, ['number']),
								setjiBullsPower: Module.cwrap('setjiBullsPower', null, ['number']),
								setjiCCIInit: Module.cwrap('setjiCCIInit', null, ['number']),
								setjiCCI: Module.cwrap('setjiCCI', null, ['number']),
								setjiCCIOnArray: Module.cwrap('setjiCCIOnArray', null, ['number']),
								setjiCustomInit: Module.cwrap('setjiCustomInit', null, ['number']),
								setjiCustom: Module.cwrap('setjiCustom', null, ['number']),
								setjiDeMarkerInit: Module.cwrap('setjiDeMarkerInit', null, ['number']),
								setjiDeMarker: Module.cwrap('setjiDeMarker', null, ['number']),
								setjiEnvelopesInit: Module.cwrap('setjiEnvelopesInit', null, ['number']),
								setjiEnvelopes: Module.cwrap('setjiEnvelopes', null, ['number']),
								setjiEnvelopesOnArray: Module.cwrap('setjiEnvelopesOnArray', null, ['number']),
								setjiFractalsInit: Module.cwrap('setjiFractalsInit', null, ['number']),
								setjiFractals: Module.cwrap('setjiFractals', null, ['number']),
								setjiIchimokuInit: Module.cwrap('setjiIchimokuInit', null, ['number']),
								setjiIchimoku: Module.cwrap('setjiIchimoku', null, ['number']),
								setjiMAInit: Module.cwrap('setjiMAInit', null, ['number']),
								setjiMA: Module.cwrap('setjiMA', null, ['number']),
								setjiMAOnArray: Module.cwrap('setjiMAOnArray', null, ['number']),
								setjiMACDInit: Module.cwrap('setjiMACDInit', null, ['number']),
								setjiMACD: Module.cwrap('setjiMACD', null, ['number']),
								setjiMomentumInit: Module.cwrap('setjiMomentumInit', null, ['number']),
								setjiMomentum: Module.cwrap('setjiMomentum', null, ['number']),
								setjiMomentumOnArray: Module.cwrap('setjiMomentumOnArray', null, ['number']),
								setjiRSIInit: Module.cwrap('setjiRSIInit', null, ['number']),
								setjiRSI: Module.cwrap('setjiRSI', null, ['number']),
								setjiRSIOnArray: Module.cwrap('setjiRSIOnArray', null, ['number']),
								setjiRVIInit: Module.cwrap('setjiRVIInit', null, ['number']),
								setjiRVI: Module.cwrap('setjiRVI', null, ['number']),
								setjiSARInit: Module.cwrap('setjiSARInit', null, ['number']),
								setjiSAR: Module.cwrap('setjiSAR', null, ['number']),
								setjiStochasticInit: Module.cwrap('setjiStochasticInit', null, ['number']),
								setjiStochastic: Module.cwrap('setjiStochastic', null, ['number']),
								setjiWPRInit: Module.cwrap('setjiWPRInit', null, ['number']),
								setjiWPR: Module.cwrap('setjiWPR', null, ['number']),
								setjARROW_CHECKCreate: Module.cwrap('setjARROW_CHECKCreate', null, ['number']),
								setjARROW_CHECKDelete: Module.cwrap('setjARROW_CHECKDelete', null, ['number']),
								setjIsTesting: Module.cwrap('setjIsTesting', null, ['number']),
								setjMarketInfo: Module.cwrap("setjMarketInfo", null, ["number"])
							}

							window.mqlEAs[definition.name].setjPrint(jPrint)
							window.mqlEAs[definition.name].setjChartClose(jChartClose)
							window.mqlEAs[definition.name].setjChartID(jChartID)
							window.mqlEAs[definition.name].setjChartOpen(jChartOpen)
							window.mqlEAs[definition.name].setjChartPeriod(jChartPeriod)
							window.mqlEAs[definition.name].setjChartSymbol(jChartSymbol)
							window.mqlEAs[definition.name].setjPeriod(jPeriod)
							window.mqlEAs[definition.name].setjSymbol(jSymbol)
							window.mqlEAs[definition.name].setjAccountBalance(jAccountBalance)
							window.mqlEAs[definition.name].setjAccountCompany(jAccountCompany)
							window.mqlEAs[definition.name].setjAccountCurrency(jAccountCurrency)
							window.mqlEAs[definition.name].setjAccountEquity(jAccountEquity)
							window.mqlEAs[definition.name].setjAccountFreeMargin(jAccountFreeMargin)
							window.mqlEAs[definition.name].setjAccountMargin(jAccountMargin)
							window.mqlEAs[definition.name].setjAccountProfit(jAccountProfit)
							window.mqlEAs[definition.name].setjOrdersTotal(jOrdersTotal)
							window.mqlEAs[definition.name].setjOrdersHistoryTotal(jOrdersHistoryTotal)
							window.mqlEAs[definition.name].setjOrderSelect(jOrderSelect)
							window.mqlEAs[definition.name].setjOrderOpenPrice(jOrderOpenPrice)
							window.mqlEAs[definition.name].setjOrderType(jOrderType)
							window.mqlEAs[definition.name].setjOrderTakeProfit(jOrderTakeProfit)
							window.mqlEAs[definition.name].setjOrderStopLoss(jOrderStopLoss)
							window.mqlEAs[definition.name].setjOrderLots(jOrderLots)
							window.mqlEAs[definition.name].setjOrderProfit(jOrderProfit)
							window.mqlEAs[definition.name].setjOrderSymbol(jOrderSymbol)
							window.mqlEAs[definition.name].setjOrderTicket(jOrderTicket)
							window.mqlEAs[definition.name].setjOrderMagicNumber(jOrderMagicNumber)
							window.mqlEAs[definition.name].setjOrderOpenTime(jOrderOpenTime)
							window.mqlEAs[definition.name].setjOrderComment(jOrderComment)
							window.mqlEAs[definition.name].setjOrderExpiration(jOrderExpiration)
							window.mqlEAs[definition.name].setjOrderPrint(jOrderPrint)
							window.mqlEAs[definition.name].setjiTimeInit(jiTimeInit)
							window.mqlEAs[definition.name].setjiTime(jiTime)
							window.mqlEAs[definition.name].setjiOpenInit(jiOpenInit)
							window.mqlEAs[definition.name].setjiOpen(jiOpen)
							window.mqlEAs[definition.name].setjiHighInit(jiHighInit)
							window.mqlEAs[definition.name].setjiHigh(jiHigh)
							window.mqlEAs[definition.name].setjiLowInit(jiLowInit)
							window.mqlEAs[definition.name].setjiLow(jiLow)
							window.mqlEAs[definition.name].setjiCloseInit(jiCloseInit)
							window.mqlEAs[definition.name].setjiClose(jiClose)
							window.mqlEAs[definition.name].setjiVolumeInit(jiVolumeInit)
							window.mqlEAs[definition.name].setjiVolume(jiVolume)
							window.mqlEAs[definition.name].setjiHighest(jiHighest)
							window.mqlEAs[definition.name].setjiLowest(jiLowest)
							window.mqlEAs[definition.name].setjiACInit(jiACInit)
							window.mqlEAs[definition.name].setjiAC(jiAC)
							window.mqlEAs[definition.name].setjiADXInit(jiADXInit)
							window.mqlEAs[definition.name].setjiADX(jiADX)
							window.mqlEAs[definition.name].setjiAlligatorInit(jiAlligatorInit)
							window.mqlEAs[definition.name].setjiAlligator(jiAlligator)
							window.mqlEAs[definition.name].setjiAOInit(jiAOInit)
							window.mqlEAs[definition.name].setjiAO(jiAO)
							window.mqlEAs[definition.name].setjiATRInit(jiATRInit)
							window.mqlEAs[definition.name].setjiATR(jiATR)
							window.mqlEAs[definition.name].setjiBearsPowerInit(jiBearsPowerInit)
							window.mqlEAs[definition.name].setjiBearsPower(jiBearsPower)
							window.mqlEAs[definition.name].setjiBandsInit(jiBandsInit)
							window.mqlEAs[definition.name].setjiBands(jiBands)
							window.mqlEAs[definition.name].setjiBandsOnArray(jiBandsOnArray)
							window.mqlEAs[definition.name].setjiBullsPowerInit(jiBullsPowerInit)
							window.mqlEAs[definition.name].setjiBullsPower(jiBullsPower)
							window.mqlEAs[definition.name].setjiCCIInit(jiCCIInit)
							window.mqlEAs[definition.name].setjiCCI(jiCCI)
							window.mqlEAs[definition.name].setjiCCIOnArray(jiCCIOnArray)
							window.mqlEAs[definition.name].setjiCustomInit(jiCustomInit)
							window.mqlEAs[definition.name].setjiCustom(jiCustom)
							window.mqlEAs[definition.name].setjiDeMarkerInit(jiDeMarkerInit)
							window.mqlEAs[definition.name].setjiDeMarker(jiDeMarker)
							window.mqlEAs[definition.name].setjiEnvelopesInit(jiEnvelopesInit)
							window.mqlEAs[definition.name].setjiEnvelopes(jiEnvelopes)
							window.mqlEAs[definition.name].setjiEnvelopesOnArray(jiEnvelopesOnArray)
							window.mqlEAs[definition.name].setjiFractalsInit(jiFractalsInit)
							window.mqlEAs[definition.name].setjiFractals(jiFractals)
							window.mqlEAs[definition.name].setjiIchimokuInit(jiIchimokuInit)
							window.mqlEAs[definition.name].setjiIchimoku(jiIchimoku)
							window.mqlEAs[definition.name].setjiMAInit(jiMAInit)
							window.mqlEAs[definition.name].setjiMA(jiMA)
							window.mqlEAs[definition.name].setjiMAOnArray(jiMAOnArray)
							window.mqlEAs[definition.name].setjiMACDInit(jiMACDInit)
							window.mqlEAs[definition.name].setjiMACD(jiMACD)
							window.mqlEAs[definition.name].setjiMomentumInit(jiMomentumInit)
							window.mqlEAs[definition.name].setjiMomentum(jiMomentum)
							window.mqlEAs[definition.name].setjiMomentumOnArray(jiMomentumOnArray)
							window.mqlEAs[definition.name].setjiRSIInit(jiRSIInit)
							window.mqlEAs[definition.name].setjiRSI(jiRSI)
							window.mqlEAs[definition.name].setjiRSIOnArray(jiRSIOnArray)
							window.mqlEAs[definition.name].setjiRVIInit(jiRVIInit)
							window.mqlEAs[definition.name].setjiRVI(jiRVI)
							window.mqlEAs[definition.name].setjiSARInit(jiSARInit)
							window.mqlEAs[definition.name].setjiSAR(jiSAR)
							window.mqlEAs[definition.name].setjiStochasticInit(jiStochasticInit)
							window.mqlEAs[definition.name].setjiStochastic(jiStochastic)
							window.mqlEAs[definition.name].setjiWPRInit(jiWPRInit)
							window.mqlEAs[definition.name].setjiWPR(jiWPR)
							window.mqlEAs[definition.name].setjARROW_CHECKCreate(jARROW_CHECKCreate)
							window.mqlEAs[definition.name].setjARROW_CHECKDelete(jARROW_CHECKDelete)
							window.mqlEAs[definition.name].setjIsTesting(jIsTesting)
							window.mqlEAs[definition.name].setjMarketInfo(jMarketInfo)

							var parameters = []
							parameters.push({
								name: "symbol",
						    value: "EUR/USD",
						    required: true,
						    type: PARAMETER_TYPE.STRING,
						    range: null
							})
							parameters.push({
								name: "timeframe",
						    value: TIME_FRAME.M1,
						    required: true,
						    type: PARAMETER_TYPE.STRING,
						    range: null
							})
							for (var i in definition.parameters) {
								parameters.push(definition.parameters[i])
							}

							importBuiltInEA(
								definition.name,
								definition.description,
								parameters,
								function (context) { // Init()
									var eaName = getEAName(context)
									if (typeof window.mqlEAs == "undefined" || typeof window.mqlEAs[eaName] == "undefined") {
										throw new Error("Please start MQL EA loader plugin.")
									}

									var uid = null
									if (typeof context.uid == "undefined") {
										uid = window.mqlEAUID++
										context.uid = uid
									} else {
										uid = context.uid
									}
									var currDefinition = window.mqlEAs[eaName].definition

									var nByteDouble = 8
									var nByteString = 1
									var length = 1
									var buffer = null

									for (var i in currDefinition.parameters) {
										if (currDefinition.parameters[i].type == PARAMETER_TYPE.INTEGER) {
											window.mqlEAs[eaName].setParamInt(uid, getEAParameter(context, currDefinition.parameters[i].name))
										} else if (currDefinition.parameters[i].type == PARAMETER_TYPE.NUMBER) {
											window.mqlEAs[eaName].setParamDouble(uid, getEAParameter(context, currDefinition.parameters[i].name))
										} else if (currDefinition.parameters[i].type == PARAMETER_TYPE.BOOLEAN) {
											window.mqlEAs[eaName].setParamBool(uid, getEAParameter(context, currDefinition.parameters[i].name))
										} else if (currDefinition.parameters[i].type == PARAMETER_TYPE.STRING) {
											window.mqlEAs[eaName].setParamString(uid, getEAParameter(context, currDefinition.parameters[i].name))
										}
									}

									if (typeof window.mqlEAsBuffer[uid + ""] == "undefined") {
										var account = getAccount(context, 0)
										var brokerName = getBrokerNameOfAccount(account)
										var accountId = getAccountIdOfAccount(account)
										var symbolName = getEAParameter(context, "symbol")
										var timeFrame = getEAParameter(context, "timeframe")

										window.mqlEAsBuffer[uid + ""] = {
											name: definition.name,
											context: context,
											brokerName: brokerName,
											accountId: accountId,
											symbolName: symbolName,
											timeFrame: timeFrame,
											chartId: getChartHandle(context, brokerName, accountId, symbolName, timeFrame),
											symbol: getSymbolInfo(brokerName, accountId, symbolName),
											objs: typeof localStorage.mqlObjs != "undefined" ? JSON.parse(localStorage.mqlObjs) : [],
											lock: false,
											convertTimeFrame: function () {
											  if (TIME_FRAME.M1 == timeframe) {
											    return 1
											  } else if (TIME_FRAME.M5 == timeframe) {
											    return 5
											  } else if (TIME_FRAME.M15 == timeframe) {
											    return 15
											  } else if (TIME_FRAME.M30 == timeframe) {
											    return 30
											  } else if (TIME_FRAME.H1 == timeframe) {
											    return 60
											  } else if (TIME_FRAME.H4 == timeframe) {
											    return 240
											  } else if (TIME_FRAME.D == timeframe) {
											    return 1440
											  } else if (TIME_FRAME.W == timeframe) {
											    return 10080
											  } else if (TIME_FRAME.M == timeframe) {
											    return 43200
											  } else {
											    return 0
											  }
											}
										}

										getQuotes (context, brokerName, accountId, symbolName)
									}

									window.mqlEAs[eaName].onTick(uid, 10000, 0, 0, 1.0 / window.mqlEAsBuffer[uid + ""].symbol.toFixed, Math.log10(window.mqlEAsBuffer[uid + ""].symbol.toFixed))
								},
								function (context) { // Deinit()
									delete window.mqlEAsBuffer[context.uid + ""]
								},
								function (context) { // OnTick()
									var eaName = getEAName(context)
									if (typeof window.mqlEAs == "undefined" || typeof window.mqlEAs[eaName] == "undefined") {
										return
									}

									var uid = context.uid
									if (typeof window.mqlEAsBuffer[uid + ""] == "undefined" || window.mqlEAsBuffer[uid + ""].lock) {
										return
									}

									var buffObj = window.mqlEAsBuffer[uid + ""]
									buffObj.context = context
									var brokerName = buffObj.brokerName
									var accountId = buffObj.accountId
									var symbolName = buffObj.symbolName

									var tData = getData(context, buffObj.chartId, DATA_NAME.TIME)

									var ask = null
									var bid = null

									try {
										ask = getAsk(context, brokerName, accountId, symbolName)
										bid = getBid(context, brokerName, accountId, symbolName)
									} catch (e) {
					          // This try-catch is used to bypass the "error throw" when you start the EA too early to call getAsk or getBid(at that time, bid or ask may be not ready yet.)
					          printErrorMessage(e.message)
										return
									}

									window.mqlEAs[eaName].onTick(
										uid,
										tData.length,
										ask,
										bid,
										1.0 / buffObj.symbol.toFixed,
										Math.log10(buffObj.symbol.toFixed)
									)
								}
							) // registerEA

							rs()
						}) // Module["onRuntimeInitialized"]
					})
					.catch(function () {
						rj()
					})
				})
			}

			if (currDef == null) {
				if (typeof localStorage.allMqlEAs != "undefined") {
					var allMqlEAs = JSON.parse(localStorage.allMqlEAs)
					var cursor = 0
					var load = function (idx) {
						loadMql(allMqlEAs[idx])
						.then(function () {
							cursor++
							if (cursor < allMqlEAs.length) {
								load(cursor)
							}
						})
						.catch(function () {
							cursor++
							if (cursor < allMqlEAs.length) {
								load(cursor)
							}
						})
					}

					load(cursor)
				}
			} else if (typeof currDef.rm != "undefined") {
				if (typeof localStorage.allMqlEAs != "undefined") {
					var allMqlEAs = JSON.parse(localStorage.allMqlEAs)
					for (var i in allMqlEAs) {
						if (allMqlEAs[i].name == currDef.rm) {
							allMqlEAs.splice(i, 1)

							unregisterEA(currDef.rm)

							if (typeof window.mqlEAs == "undefined" || typeof window.mqlEAsBuffer == "undefined") break

							delete window.mqlEAs[currDef.rm]
							for (var j in window.mqlEAsBuffer) {
								if (window.mqlEAsBuffer[j].name == currDef.rm) {
									delete window.mqlEAsBuffer[j]
								}
							}

							break
						}
					}

					localStorage.allMqlEAs = JSON.stringify(allMqlEAs)
				}
			} else {
				var oldDef = null

				var loadCurrDef = function () {
					loadMql(currDef)
					.then(function () {
						var allMqlEAs = null
						if (typeof localStorage.allMqlEAs != "undefined") {
							allMqlEAs = JSON.parse(localStorage.allMqlEAs)
						} else {
							allMqlEAs = []
						}

						for (var i in allMqlEAs) {
							if (allMqlEAs[i].name == currDef.name) {
								allMqlEAs.splice(i, 1)
								break
							}
						}

						allMqlEAs.push(currDef)

						localStorage.allMqlEAs = JSON.stringify(allMqlEAs)
					})
					.catch(function () {
						if (oldDef != null) {
							loadMql(oldDef)
							.then(function () {})
							.catch(function () {})
						}
					})
				}

				if (typeof localStorage.allMqlEAs != "undefined") {
					var allMqlEAs = JSON.parse(localStorage.allMqlEAs)
					if (typeof window.mqlEAs == "undefined" || typeof window.mqlEAs[allMqlEAs[0].name] == "undefined") {
						var cursor = 0
						var load = function (idx) {
							loadMql(allMqlEAs[idx])
							.then(function () {
								cursor++
								if (cursor < allMqlEAs.length) {
									if (allMqlEAs[cursor].name == currDef.name) {
										oldDef = allMqlEAs[cursor]
										cursor++
										if (cursor < allMqlEAs.length) {
											load(cursor)
										} else {
											loadCurrDef()
										}
									} else {
										load(cursor)
									}
								} else {
									loadCurrDef()
								}
							})
							.catch(function () {
								cursor++
								if (cursor < allMqlEAs.length) {
									if (allMqlEAs[cursor].name == currDef.name) {
										oldDef = allMqlEAs[cursor]
										cursor++
										if (cursor < allMqlEAs.length) {
											load(cursor)
										} else {
											loadCurrDef()
										}
									} else {
										load(cursor)
									}
								} else {
									loadCurrDef()
								}
							})
						}

						load(cursor)
					} else {
						for (var i in allMqlEAs) {
							if (allMqlEAs[i].name == currDef.name) {
								oldDef = allMqlEAs[i]

								unregisterEA(currDef.name)

								delete window.mqlEAs[currDef.name]
								for (var j in window.mqlEAsBuffer) {
									if (window.mqlEAsBuffer[j].name == currDef.name) {
										delete window.mqlEAsBuffer[j]
									}
								}
								break
							}
						}

						loadCurrDef()
					}
				} else {
					loadCurrDef()
				}
			}
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"sample_using_sma",
		"A test EA based on sma(v1.03)",
		[{ // parameters
			name: "period",
			value: 20,
			required: true,
			type: PARAMETER_TYPE.INTEGER,
			range: [1, 100]
		}],
		function (context) { // Init()
			var account = getAccount(context, 0)
			var brokerName = getBrokerNameOfAccount(account)
			var accountId = getAccountIdOfAccount(account)
			var symbolName = "EUR/USD"

			getQuotes (context, brokerName, accountId, symbolName)
			window.chartHandle = getChartHandle(context, brokerName, accountId, symbolName, TIME_FRAME.M1)
			var period = getEAParameter(context, "period")
			window.indiHandle = getIndicatorHandle(context, brokerName, accountId, symbolName, TIME_FRAME.M1, "sma", [{
				name: "period",
				value: period
			}])
		},
		function (context) { // Deinit()
			delete window.currTime
			delete window.chartHandle
			delete window.indiHandle
		},
		function (context) { // OnTick()
			var arrTime = getData(context, window.chartHandle, DATA_NAME.TIME)
			if (typeof window.currTime == "undefined") {
				window.currTime = arrTime[arrTime.length - 1]
			} else if (window.currTime != arrTime[arrTime.length - 1]) {
				window.currTime = arrTime[arrTime.length - 1]
			} else {
				return
			}

			var account = getAccount(context, 0)
			var brokerName = getBrokerNameOfAccount(account)
			var accountId = getAccountIdOfAccount(account)
			var symbolName = "EUR/USD"

			var arrClose = getData(context, window.chartHandle, DATA_NAME.CLOSE)
			var arrSma = getData(context, window.indiHandle, "sma")

			var ask = null
			var bid = null
			try {
				ask = getAsk(context, brokerName, accountId, symbolName)
				bid = getBid(context, brokerName, accountId, symbolName)
			} catch (e) {
				// This try-catch is used to bypass the "error throw" when you start the EA too early to call getAsk or getBid(at that time, bid or ask may be not ready yet.)
				printErrorMessage(e.message)
				return
			}

			var limitPrice = 0.0003
			var stopPrice = 0.0003
			var volume = 0.01

			if (arrClose[arrClose.length - 3] < arrSma[arrSma.length - 3] && arrClose[arrClose.length - 2] > arrSma[arrSma.length - 2]) {
				sendOrder(brokerName, accountId, symbolName, ORDER_TYPE.OP_BUYLIMIT, ask-limitPrice, 0, volume, ask+limitPrice, bid-3*stopPrice, "", 0, 0)
			} else if (arrClose[arrClose.length - 3] > arrSma[arrSma.length - 3] && arrClose[arrClose.length - 2] < arrSma[arrSma.length - 2]) {
				sendOrder(brokerName, accountId, symbolName, ORDER_TYPE.OP_SELLLIMIT, bid+limitPrice, 0, volume, bid-limitPrice, ask+3*stopPrice, "", 0, 0)
			}
		}
	)

	importBuiltInEA(
		"sample_trading_arbitrage",
		"Two accounts signed up on the different servers are required to trade arbitrage. Additionally please make sure that you have signed in to both accounts and logged out from the accounts in investor mode.(v1.03)",
		[],// parameters
		function (context) { // Init()
			var account1 = getAccount(context, 0)
			var account2 = getAccount(context, 1)

			var acc1 = {
				brokerName: getBrokerNameOfAccount(account1),
				accountId: getAccountIdOfAccount(account1),
				symbolName: "EUR/USD"
			}
			var acc2 = {
				brokerName: getBrokerNameOfAccount(account2),
				accountId: getAccountIdOfAccount(account2),
				symbolName: "EUR/USD"
			}

			getQuotes (context, acc1.brokerName, acc1.accountId, acc1.symbolName)
			getQuotes (context, acc2.brokerName, acc2.accountId, acc2.symbolName)

			window.acc1 = acc1
			window.acc2 = acc2
		},
		function (context) { // Deinit()
			delete window.currTime
			delete window.acc1
			delete window.acc2
		},
		function (context) { // OnTick()
			var currTime = new Date().getTime()
			if (typeof window.currTime == "undefined") {
				window.currTime = currTime
			} else if (window.currTime <= currTime - 1000) {
				window.currTime = currTime
			} else {
				return
			}

			var acc1 = window.acc1
			var acc2 = window.acc2

			var ask1 = null
			var ask2 = null
			var bid1 = null
			var bid2 = null

			try {
				ask1 = getAsk(context, acc1.brokerName, acc1.accountId, acc1.symbolName)
				ask2 = getAsk(context, acc2.brokerName, acc2.accountId, acc2.symbolName)
				bid1 = getBid(context, acc1.brokerName, acc1.accountId, acc1.symbolName)
				bid2 = getBid(context, acc2.brokerName, acc2.accountId, acc2.symbolName)
			} catch (e) {
				// This try-catch is used to bypass the "error throw" when you start the EA too early to call getAsk or getBid(at that time, bid or ask may be not ready yet.)
				printErrorMessage(e.message)
				return
			}

			var volume = 0.01

			if (ask1 < bid2) {
				var tradeNum = getOpenTradesListLength(context)

				var acc1TradeId = null
				var acc2TradeId = null

				for (var i = tradeNum - 1; i >= 0; i--) {
					var trade = getOpenTrade(context, i)
					var brokerName = getBrokerName(trade)
					var accountId = getAccountId(trade)
					var tradeId = getTradeId(trade)
					var orderType = getOrderType(trade)
					if (brokerName == acc1.brokerName && accountId == acc1.accountId && orderType == ORDER_TYPE.OP_SELL) {
						acc1TradeId = tradeId
					}
					if (brokerName == acc2.brokerName && accountId == acc2.accountId && orderType == ORDER_TYPE.OP_BUY) {
						acc2TradeId = tradeId
					}
				}

				if (acc1TradeId == null) {
					sendOrder(acc1.brokerName, acc1.accountId, acc1.symbolName, ORDER_TYPE.OP_BUY, 0, 0, volume, 0, 0, "", 0, 0)
				} else {
					closeTrade(acc1.brokerName, acc1.accountId, acc1TradeId, 0, 0)
				}

				if (acc2TradeId == null) {
					sendOrder(acc2.brokerName, acc2.accountId, acc2.symbolName, ORDER_TYPE.OP_SELL, 0, 0, volume, 0, 0, "", 0, 0)
				} else {
					closeTrade(acc2.brokerName, acc2.accountId, acc2TradeId, 0, 0)
				}
			} else if (ask2 < bid1) {
				var tradeNum = getOpenTradesListLength(context)

				var acc1TradeId = null
				var acc2TradeId = null

				for (var i = tradeNum - 1; i >= 0; i--) {
					var trade = getOpenTrade(context, i)
					var brokerName = getBrokerName(trade)
					var accountId = getAccountId(trade)
					var tradeId = getTradeId(trade)
					var orderType = getOrderType(trade)
					if (brokerName == acc2.brokerName && accountId == acc2.accountId && orderType == ORDER_TYPE.OP_SELL) {
						acc2TradeId = tradeId
					}
					if (brokerName == acc1.brokerName && accountId == acc1.accountId && orderType == ORDER_TYPE.OP_BUY) {
						acc1TradeId = tradeId
					}
				}

				if (acc2TradeId == null) {
					sendOrder(acc2.brokerName, acc2.accountId, acc2.symbolName, ORDER_TYPE.OP_BUY, 0, 0, volume, 0, 0, "", 0, 0)
				} else {
					closeTrade(acc2.brokerName, acc2.accountId, acc2TradeId, 0, 0)
				}

				if (acc1TradeId == null) {
					sendOrder(acc1.brokerName, acc1.accountId, acc1.symbolName, ORDER_TYPE.OP_SELL, 0, 0, volume, 0, 0, "", 0, 0)
				} else {
					closeTrade(acc1.brokerName, acc1.accountId, acc1TradeId, 0, 0)
				}
			}
		}
	)

	importBuiltInEA(
		"sample_training_neuron_model",
		"A test EA to train neuron model(v1.02)",
		[{ // parameters
			name: "period",
			value: 20,
			required: true,
			type: PARAMETER_TYPE.INTEGER,
			range: [1, 100]
		},{
			name: "inputNum",
			value: 20,
			required: true,
			type: PARAMETER_TYPE.INTEGER,
			range: [1, 100]
		},{
			name: "hiddenNum",
			value: 50,
			required: true,
			type: PARAMETER_TYPE.INTEGER,
			range: [1, 100]
		},{
			name: "diffPrice",
			value: 0.0001,
			required: true,
			type: PARAMETER_TYPE.NUMBER,
			range: [0, 10]
		}],
		function (context) { // Init()
			var account = getAccount(context, 0)
			var brokerName = getBrokerNameOfAccount(account)
			var accountId = getAccountIdOfAccount(account)
			var symbolName = "EUR/USD"

			window.chartHandle = getChartHandle(context, brokerName, accountId, symbolName, TIME_FRAME.M1)
			var period = getEAParameter(context, "period")
			window.indiHandle = getIndicatorHandle(context, brokerName, accountId, symbolName, TIME_FRAME.M1, "rsi", [{
				name: "period",
				value: period
			}])
		},
		function (context) { // Deinit()
			var period = getEAParameter(context, "period")
			var inputNum = getEAParameter(context, "inputNum")
			var hiddenNum = getEAParameter(context, "hiddenNum")
			var arrOpen = getData(context, window.chartHandle, DATA_NAME.OPEN)
			var arrClose = getData(context, window.chartHandle, DATA_NAME.CLOSE)
			var arrRsi = getData(context, window.indiHandle, "rsi")

			if (arrRsi.length <= period + 1) return
			if (inputNum + period - 1 > arrRsi.length) throw new Error("No enough data.")

			// extend the prototype chain
			Perceptron.prototype = new synaptic.Network()
			Perceptron.prototype.constructor = Perceptron

			var myPerceptron = new Perceptron(inputNum, hiddenNum, 1)
			var myTrainer = new synaptic.Trainer(myPerceptron)

			var diffPrice = getEAParameter(context, "diffPrice")
			var trainingSet = []
			var longCount = 0
			var shortCount = 0

			for (var i = period - 1; i < arrRsi.length - inputNum; i++) {
				if (arrClose[i * inputNum + inputNum] - arrOpen[i * inputNum + inputNum] > diffPrice) {
					var input = []

					for (var j = 0; j < inputNum; j++) {
						input.push(arrRsi[i * inputNum + j] / 100)
					}

					trainingSet.push({
						input: input,
						output: [0]
					})

					longCount++
				} else if (arrOpen[i * inputNum + inputNum] - arrClose[i * inputNum + inputNum] > diffPrice) {
					var input = []

					for (var j = 0; j < inputNum; j++) {
						input.push(arrRsi[i * inputNum + j] / 100)
					}

					trainingSet.push({
						input: input,
						output: [1]
					})

					shortCount++
				}
			}

			myTrainer.train(trainingSet)

			// We use localstorage.reservedZone to store the neural network network.
			// Please don't change the name "reservedZone" or your data stored in this zone will be removed while the version is updated.
			if (typeof localStorage.reservedZone == "undefined") {
				localStorage.reservedZone = JSON.stringify({sample_training_neuron_model: myPerceptron.toJSON()})
			} else {
				var reservedZone = JSON.parse(localStorage.reservedZone)
				reservedZone.sample_training_neuron_model = myPerceptron.toJSON()
				localStorage.reservedZone = JSON.stringify(reservedZone)
			}

			printMessage(longCount + ", " + shortCount)
			printMessage(JSON.stringify(trainingSet))
			printMessage(JSON.stringify(myPerceptron.toJSON()))

			delete window.chartHandle
			delete window.indiHandle
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"sample_run_neuron_model",
		"A test EA to run neuron model(v1.03)",
		[{ // parameters
			name: "period",
			value: 20,
			required: true,
			type: PARAMETER_TYPE.INTEGER,
			range: [1, 100]
		},{
			name: "inputNum",
			value: 20,
			required: true,
			type: PARAMETER_TYPE.INTEGER,
			range: [1, 100]
		},{
			name: "threshold",
			value: 0.3,
			required: true,
			type: PARAMETER_TYPE.NUMBER,
			range: [0, 1]
		},{
			name: "takeProfit",
			value: 0.0001,
			required: true,
			type: PARAMETER_TYPE.NUMBER,
			range: [0, 100]
		}],
		function (context) { // Init()
			// We use localstorage.reservedZone to store the neural network network.
			// Please don't change the name "reservedZone" or your data stored in this zone will be removed while the version is updated.
			if (typeof localStorage.reservedZone == "undefined") return

			var reservedZone = JSON.parse(localStorage.reservedZone)
			if (typeof reservedZone.sample_training_neuron_model == "undefined") return
			window.myPerceptron = synaptic.Network.fromJSON(reservedZone.sample_training_neuron_model)

			var account = getAccount(context, 0)
			var brokerName = getBrokerNameOfAccount(account)
			var accountId = getAccountIdOfAccount(account)
			var symbolName = "EUR/USD"

			getQuotes (context, brokerName, accountId, symbolName)
			window.chartHandle = getChartHandle(context, brokerName, accountId, symbolName, TIME_FRAME.M1)
			var period = getEAParameter(context, "period")
			window.indiHandle = getIndicatorHandle(context, brokerName, accountId, symbolName, TIME_FRAME.M1, "rsi", [{
				name: "period",
				value: period
			}])
		},
		function (context) { // Deinit()
			delete window.currTime
			delete window.chartHandle
			delete window.indiHandle
			delete window.myPerceptron
		},
		function (context) { // OnTick()
			var arrTime = getData(context, window.chartHandle, DATA_NAME.TIME)
			if (typeof window.currTime == "undefined") {
				window.currTime = arrTime[arrTime.length - 1]
			} else if (window.currTime != arrTime[arrTime.length - 1]) {
				window.currTime = arrTime[arrTime.length - 1]
			} else {
				return
			}

			var account = getAccount(context, 0)
			var brokerName = getBrokerNameOfAccount(account)
			var accountId = getAccountIdOfAccount(account)
			var symbolName = "EUR/USD"

			var period = getEAParameter(context, "period")
			var inputNum = getEAParameter(context, "inputNum")
			var threshold = getEAParameter(context, "threshold")
			var takeProfit = getEAParameter(context, "takeProfit")
			var arrRsi = getData(context, window.indiHandle, "rsi")

			if (inputNum + period - 1 > arrRsi.length) throw new Error("No enough data.")

			var input = []

			for (var i = arrRsi.length - inputNum - 1; i < arrRsi.length - 1; i++) {
				input.push(arrRsi[i] / 100)
			}

			var result = window.myPerceptron.activate(input)[0]
			printMessage(result)

			var ask = null
			var bid = null
			var volume = 0.01

			try {
				ask = getAsk(context, brokerName, accountId, symbolName)
				bid = getBid(context, brokerName, accountId, symbolName)
			} catch (e) {
				// This try-catch is used to bypass the "error throw" when you start the EA too early to call getAsk or getBid(at that time, bid or ask may be not ready yet.)
				printErrorMessage(e.message)
				return
			}

			if (result < 0.5 - threshold) {
				sendOrder(brokerName, accountId, symbolName, ORDER_TYPE.OP_BUY, 0, 0, volume, ask+takeProfit, bid-3*takeProfit, "", 0, 0)
			} else if (result > 0.5 + threshold) {
				sendOrder(brokerName, accountId, symbolName, ORDER_TYPE.OP_SELL, 0, 0, volume, bid-takeProfit, ask+3*takeProfit, "", 0, 0)
			}
		}
	)

	importBuiltInEA(
		"payment_gateway_eos_lib_loader",
		"A payment gateway plugin to load EOS libraries(v1.01)",
		[{ // parameters
			name: "privateKey",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "jsonRpcUrl",
			value: "https://nodes.get-scatter.com",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "jssig",
			value: "https://www.fintechee.com/js/eos/eosjs-jssig.min.js",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "jsonrpc",
			value: "https://www.fintechee.com/js/eos/eosjs-jsonrpc.min.js",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "api",
			value: "https://www.fintechee.com/js/eos/eosjs-api.min.js",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var defaultPrivateKey = getEAParameter(context, "privateKey")
			var jsonRpcUrl = getEAParameter(context, "jsonRpcUrl")
			var jssig = getEAParameter(context, "jssig")
			var jsonrpc = getEAParameter(context, "jsonrpc")
			var api = getEAParameter(context, "api")

			if (defaultPrivateKey == null || defaultPrivateKey == "") {
				popupErrorMessage("The private key should not be empty.")
				return
			}

			var tags = document.getElementsByTagName("script")
			for (var i = tags.length - 1; i >= 0; i--) {
				if (tags[i] && tags[i].getAttribute("src") != null && (tags[i].getAttribute("src") == jssig || tags[i].getAttribute("src") == jsonrpc || tags[i].getAttribute("src") == api)) {
					tags[i].parentNode.removeChild(tags[i])
				}
			}

			var script1 = document.createElement("script")
	    document.body.appendChild(script1)
	    script1.onload = function () {
	      var script2 = document.createElement("script")
	      document.body.appendChild(script2)
	      script2.onload = function () {
	        var script3 = document.createElement("script")
	        document.body.appendChild(script3)
	        script3.onload = function () {
						window.eosjs_jsonrpc = eosjs_jsonrpc
						var eos_rpc = new eosjs_jsonrpc.JsonRpc(jsonRpcUrl)
					  var eos_signatureProvider = new eosjs_jssig.JsSignatureProvider([defaultPrivateKey])
					  window.eos_api = new eosjs_api.Api({rpc: eos_rpc, signatureProvider: eos_signatureProvider})
					}
	        script3.onerror = function () {}
	        script3.async = true
	        script3.src = jssig
	      }
	      script2.onerror = function () {}
	      script2.async = true
	      script2.src = jsonrpc
	    }
	    script1.onerror = function () {}
	    script1.async = true
	    script1.src = api
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"payment_gateway_eos_scatter",
		"A payment gateway plugin to load the libraries of EOS and Scatter(v1.0)",
		[{ // parameters
			name: "jsonRpcUrl",
			value: "https://nodes.get-scatter.com",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "chainId",
			value: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "scatterCore",
			value: "https://www.fintechee.com/js/eos/scatterjs-core.min.js",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "scatterEos",
			value: "https://www.fintechee.com/js/eos/scatterjs-plugin-eosjs2.min.js",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "jsonrpc",
			value: "https://www.fintechee.com/js/eos/eosjs-jsonrpc.min.js",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "api",
			value: "https://www.fintechee.com/js/eos/eosjs-api.min.js",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var jsonRpcUrl = getEAParameter(context, "jsonRpcUrl")
			var chainId = getEAParameter(context, "chainId")
			var scatterCore = getEAParameter(context, "scatterCore")
			var scatterEos = getEAParameter(context, "scatterEos")
			var jsonrpc = getEAParameter(context, "jsonrpc")
			var api = getEAParameter(context, "api")

			var tags = document.getElementsByTagName("script")
			for (var i = tags.length - 1; i >= 0; i--) {
				if (tags[i] && tags[i].getAttribute("src") != null &&
					(tags[i].getAttribute("src") == scatterCore || tags[i].getAttribute("src") == scatterEos || tags[i].getAttribute("src") == jsonrpc || tags[i].getAttribute("src") == api)) {

					tags[i].parentNode.removeChild(tags[i])
				}
			}

			var script1 = document.createElement("script")
	    document.body.appendChild(script1)
	    script1.onload = function () {
	      var script2 = document.createElement("script")
	      document.body.appendChild(script2)
	      script2.onload = function () {
	        var script3 = document.createElement("script")
	        document.body.appendChild(script3)
	        script3.onload = function () {
						var script4 = document.createElement("script")
		        document.body.appendChild(script4)
		        script4.onload = function () {
							var parsedJsonRpcUrl = jsonRpcUrl.split("://")
							var parsedJsonRpcUrl2 = parsedJsonRpcUrl[1].split(":")
							const network = ScatterJS.Network.fromJson({
								blockchain: "eos",
								protocol: parsedJsonRpcUrl[0],
								host: parsedJsonRpcUrl2[0],
								port: parsedJsonRpcUrl2.length == 1 ? 443 : parseInt(parsedJsonRpcUrl2[1]),
								chainId: chainId
							})
							ScatterJS.plugins(new ScatterEOS())
							ScatterJS.scatter.connect("www.fintechee.com", {network}).then(function (connected) {
								if(!connected) {
									popupErrorMessage("Failed to connect to your Scatter APP.")
									return false
								}

								const scatter = ScatterJS.scatter

								window.eosjs_jsonrpc = eosjs_jsonrpc
								var eos_rpc = new eosjs_jsonrpc.JsonRpc(jsonRpcUrl)

								window.eos_api = scatter.eos(network, eosjs_api.Api, {rpc: eos_rpc});

								(async function () {
									if (scatter.identity) {
										scatter.logout()
									}

									await scatter.login()
									window.scatter = scatter

									popupMessage("Connected to Scatter successfully!")
								})()
								window.ScatterJS = null
							})
						}
		        script4.onerror = function () {}
		        script4.async = true
		        script4.src = scatterEos
					}
	        script3.onerror = function () {}
	        script3.async = true
	        script3.src = scatterCore
	      }
	      script2.onerror = function () {}
	      script2.async = true
	      script2.src = jsonrpc
	    }
	    script1.onerror = function () {}
	    script1.async = true
	    script1.src = api
		},
		function (context) { // Deinit()
			window.scatter.logout()
			window.scatter = null
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"payment_gateway_eos",
		"A payment gateway plugin to make you fund(deposit or withdraw) via EOS platform(v1.03)",
		[{ // parameters
			name: "asset",
			value: "eosio.token",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "from",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "to",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "amount",
			value: 0,
			required: true,
			type: PARAMETER_TYPE.INTEGER,
			range: [0, null]
		}, {
			name: "currency",
			value: "SYS",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "memo",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var asset = getEAParameter(context, "asset")
			var from = getEAParameter(context, "from")
			var to = getEAParameter(context, "to")
			var amount = getEAParameter(context, "amount")
			var currency = getEAParameter(context, "currency")
			var memo = getEAParameter(context, "memo")

			if (from == null || from == "") {
				popupErrorMessage("The sender should not be empty.")
				return
			}
			if (to == null || to == "") {
				popupErrorMessage("The recipient should not be empty.")
				return
			}
			if (amount <= 0) {
				popupErrorMessage("The amount should be greater than zero.")
				return
			}
			if (memo == null) {
				memo = ""
			}

	    (async () => {
	      try {
	        const result = await window.eos_api.transact({
	          actions: [{
	              account: asset,
	              name: "transfer",
	              authorization: [{
	                  actor: from,
	                  permission: "active",
	              }],
	              data: {
	                  from: from,
	                  to: to,
	                  quantity: Math.floor(amount) + ".0000 " + currency,
	                  memo: memo
	              }
	          }]
	        }, {
	          blocksBehind: 3,
	          expireSeconds: 30
	        })

	        popupMessage("Transaction pushed!\n\n" + JSON.stringify(result, null, 2))
	      } catch (e) {
					popupErrorMessage("Caught exception: " + e)

	        if (e instanceof window.eosjs_jsonrpc.RpcError) {
						popupErrorMessage(JSON.stringify(e.json, null, 2))
					}
	      }
	    })()
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"decentralized_exchange_eos_propose",
		"A decentralized exchange plugin to propose for exchanging digital assets via EOS platform(v1.01)",
		[{ // parameters
			name: "proposalName",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "asset",
			value: "eosio.token",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "proposer",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "exchange",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "escrow",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "amount",
			value: 0,
			required: true,
			type: PARAMETER_TYPE.INTEGER,
			range: [0, null]
		}, {
			name: "currency",
			value: "SYS",
			required: true,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "memo",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var proposalName = getEAParameter(context, "proposalName")
			var asset = getEAParameter(context, "asset")
			var proposer = getEAParameter(context, "proposer")
			var exchange = getEAParameter(context, "exchange")
			var escrow = getEAParameter(context, "escrow")
			var amount = getEAParameter(context, "amount")
			var currency = getEAParameter(context, "currency")
			var memo = getEAParameter(context, "memo")

			if (proposalName == null || proposalName == "") {
				popupErrorMessage("The proposal name should not be empty.")
				return
			}
			if (proposer == null || proposer == "") {
				popupErrorMessage("The proposer should not be empty.")
				return
			}
			if (exchange == null || exchange == "") {
				popupErrorMessage("The exchange should not be empty.")
				return
			}
			if (escrow == null || escrow == "") {
				popupErrorMessage("The escrow account should not be empty.")
				return
			}
			if (amount <= 0) {
				popupErrorMessage("The amount should be greater than zero.")
				return
			}
			if (memo == null) {
				memo = ""
			}

			const actions = [{
				account: asset,
				name: "transfer",
				authorization: [{
					actor: escrow,
					permission: "active",
				}],
				data: {
					from: escrow,
					to: exchange,
					quantity: Math.floor(amount) + ".0000 " + currency,
					memo: memo
				}
			}];

			(async () => {
				try {
				  const serialized_actions = await window.eos_api.serializeActions(actions)

					const proposeInput = {
						proposer: proposer,
						proposal_name: proposalName,
						// We make the threshold be 1(not 2) to simplify the process, because multi-sig requires that all approvers are online, which is not that realistic.
						requested: [{
							actor: exchange,
							permission: "active"
						}],
						trx: {
							expiration: new Date(new Date().getTime() + 3600000).toISOString().slice(0,19),
							ref_block_num: 0,
							ref_block_prefix: 0,
							max_net_usage_words: 0,
							max_cpu_usage_ms: 0,
							delay_sec: 0,
							context_free_actions: [],
							actions: serialized_actions,
							transaction_extensions: []
						}
					}

					const result = await window.eos_api.transact({
						actions: [{
							account: "eosio.msig",
							name: "propose",
							authorization: [{
								actor: proposer,
								permission: "active"
							}],
							data: proposeInput
						}]
					}, {
						blocksBehind: 3,
						expireSeconds: 30,
						broadcast: true,
						sign: true
					})

					popupMessage("Proposed!\n\n" + JSON.stringify(result, null, 2))
				} catch (e) {
					popupErrorMessage("Caught exception: " + e)

	        if (e instanceof window.eosjs_jsonrpc.RpcError) {
						popupErrorMessage(JSON.stringify(e.json, null, 2))
					}
	      }
			})()
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"decentralized_exchange_eos_approve",
		"A decentralized exchange plugin to approve a proposal for exchanging digital assets via EOS platform(v1.0)",
		[{ // parameters
			name: "proposalName",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "proposer",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "approver",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var proposalName = getEAParameter(context, "proposalName")
			var proposer = getEAParameter(context, "proposer")
			var approver = getEAParameter(context, "approver")

			if (proposalName == null || proposalName == "") {
				popupErrorMessage("The proposal name should not be empty.")
				return
			}
			if (proposer == null || proposer == "") {
				popupErrorMessage("The proposer should not be empty.")
				return
			}
			if (approver == null || approver == "") {
				popupErrorMessage("The approver should not be empty.")
				return
			}

			(async () => {
				try {
					const result = await window.eos_api.transact({
						actions: [{
							account: "eosio.msig",
							name: "approve",
							authorization: [{
								actor: approver,
								permission: "active"
							}],
							data: {
								proposer: proposer,
								proposal_name: proposalName,
								level: {
									actor: approver,
									permission: "active",
								}
							}
						}]
					}, {
						blocksBehind: 3,
						expireSeconds: 30,
						broadcast: true,
						sign: true
					})

					popupMessage("Approved!\n\n" + JSON.stringify(result, null, 2))
				} catch (e) {
					popupErrorMessage("Caught exception: " + e)

	        if (e instanceof window.eosjs_jsonrpc.RpcError) {
						popupErrorMessage(JSON.stringify(e.json, null, 2))
					}
	      }
			})()
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"decentralized_exchange_eos_unapprove",
		"A decentralized exchange plugin to unapprove a proposal for exchanging digital assets via EOS platform(v1.0)",
		[{ // parameters
			name: "proposalName",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "proposer",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "actor",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var proposalName = getEAParameter(context, "proposalName")
			var proposer = getEAParameter(context, "proposer")
			var actor = getEAParameter(context, "actor")

			if (proposalName == null || proposalName == "") {
				popupErrorMessage("The proposal name should not be empty.")
				return
			}
			if (proposer == null || proposer == "") {
				popupErrorMessage("The proposer should not be empty.")
				return
			}
			if (actor == null || actor == "") {
				popupErrorMessage("The actor should not be empty.")
				return
			}

			(async () => {
				try {
					const result = await window.eos_api.transact({
						actions: [{
							account: "eosio.msig",
							name: "unapprove",
							authorization: [{
								actor: actor,
								permission: "active"
							}],
							data: {
								proposer: proposer,
								proposal_name: proposalName,
								level: {
									actor: actor,
									permission: "active",
								}
							}
						}]
					}, {
						blocksBehind: 3,
						expireSeconds: 30,
						broadcast: true,
						sign: true
					})

					popupMessage("Unapproved!\n\n" + JSON.stringify(result, null, 2))
				} catch (e) {
					popupErrorMessage("Caught exception: " + e)

	        if (e instanceof window.eosjs_jsonrpc.RpcError) {
						popupErrorMessage(JSON.stringify(e.json, null, 2))
					}
	      }
			})()
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"decentralized_exchange_eos_cancel",
		"A decentralized exchange plugin to cancel a proposal for exchanging digital assets via EOS platform(v1.0)",
		[{ // parameters
			name: "proposalName",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "proposer",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "canceler",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var proposalName = getEAParameter(context, "proposalName")
			var proposer = getEAParameter(context, "proposer")
			var canceler = getEAParameter(context, "canceler")

			if (proposalName == null || proposalName == "") {
				popupErrorMessage("The proposal name should not be empty.")
				return
			}
			if (proposer == null || proposer == "") {
				popupErrorMessage("The proposer should not be empty.")
				return
			}
			if (canceler == null || canceler == "") {
				popupErrorMessage("The canceler should not be empty.")
				return
			}

			(async () => {
				try {
					const result = await window.eos_api.transact({
						actions: [{
							account: "eosio.msig",
							name: "cancel",
							authorization: [{
								actor: canceler,
								permission: "active"
							}],
							data: {
								proposer: proposer,
								proposal_name: proposalName,
								canceler: canceler
							}
						}]
					}, {
						blocksBehind: 3,
						expireSeconds: 30,
						broadcast: true,
						sign: true
					})

					popupMessage("Canceled!\n\n" + JSON.stringify(result, null, 2))
				} catch (e) {
					popupErrorMessage("Caught exception: " + e)

	        if (e instanceof window.eosjs_jsonrpc.RpcError) {
						popupErrorMessage(JSON.stringify(e.json, null, 2))
					}
	      }
			})()
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)

	importBuiltInEA(
		"decentralized_exchange_eos_exec",
		"A decentralized exchange plugin to execute a transaction of exchanging digital assets via EOS platform(v1.0)",
		[{ // parameters
			name: "proposalName",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "proposer",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}, {
			name: "executor",
			value: "",
			required: false,
			type: PARAMETER_TYPE.STRING,
			range: null
		}],
		function (context) { // Init()
			var proposalName = getEAParameter(context, "proposalName")
			var proposer = getEAParameter(context, "proposer")
			var executor = getEAParameter(context, "executor")

			if (proposalName == null || proposalName == "") {
				popupErrorMessage("The proposal name should not be empty.")
				return
			}
			if (proposer == null || proposer == "") {
				popupErrorMessage("The proposer should not be empty.")
				return
			}
			if (executor == null || executor == "") {
				popupErrorMessage("The executor should not be empty.")
				return
			}

			(async () => {
				try {
					const result = await window.eos_api.transact({
						actions: [{
							account: "eosio.msig",
							name: "exec",
							authorization: [{
								actor: executor,
								permission: "active"
							}],
							data: {
								proposer: proposer,
								proposal_name: proposalName,
								executer: executor
							}
						}]
					}, {
						blocksBehind: 3,
						expireSeconds: 30,
						broadcast: true,
						sign: true
					})

					popupMessage("Transaction pushed!\n\n" + JSON.stringify(result, null, 2))
				} catch (e) {
					popupErrorMessage("Caught exception: " + e)

	        if (e instanceof window.eosjs_jsonrpc.RpcError) {
						popupErrorMessage(JSON.stringify(e.json, null, 2))
					}
	      }
			})()
		},
		function (context) { // Deinit()
		},
		function (context) { // OnTick()
		}
	)
}

function Perceptron (input, hidden, output) {
	// create the layers
	var inputLayer = new synaptic.Layer(input)
	var hiddenLayer = new synaptic.Layer(hidden)
	var outputLayer = new synaptic.Layer(output)

	// connect the layers
	inputLayer.project(hiddenLayer)
	hiddenLayer.project(outputLayer)

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	})
}

function initDefaultIndicators () {
	// setDefaultIndicator("fintechee_crypto_loader", false)
}

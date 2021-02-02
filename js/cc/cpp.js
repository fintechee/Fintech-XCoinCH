// Currently, the source codes are required not to be confusing.
// Especially, variables' names attached with key words may not be parsed successfully.
// Because the key words have been used to split the source lines to extract the parts of the variables.
// Fortunately, a better parser compatible with more complex syntax will be coming soon.
var eaStudio = {
  generateStructure: function (sourceCode) {
    var generatedStructure = null

		if (sourceCode.length > 0) {
			var lines = sourceCode.split("\n")
			var op = []

			for (var i in lines) {
				var line = lines[i]

        if (line.indexOf("OnCalculate") != -1 ||
            line.indexOf("start") != -1 ||
            line.indexOf("init") != -1) {
          break
        }

				var parts = null

				parts = line.split("#")
				if (parts.length > 1) {
					if (parts[0].trim() == "") {
						op[i] = {
              op: "r",
              line: "// " + line
            }
					}
				}

				var bVariable = false
        var mainParts = null

				parts = line.split("input")
				if (parts.length > 1 && parts[0].trim() == "") {
					bVariable = true
				} else {
					parts = line.split("extern")
					if (parts.length > 1 && parts[0].trim() == "") {
						bVariable = true
          }
				}

				if (bVariable) {
          mainParts = parts[1]
				} else {
          mainParts = line
        }

        var subParts = null
				subParts = mainParts.split("int")
				if (subParts.length > 1 && subParts[0].trim() == "") {
          var variable = bVariable ? subParts[1].split("=") : subParts[1].split("[]")
          var value = variable[1].trim()
          value = value.substring(0, value.length - 1)
          if (variable.length == 2) {
            op[i] = {
              type: (bVariable ? "v" : "a"),
              op: "m",
              dataType: "int",
              name: variable[0].trim(),
              value: (bVariable ? parseInt(value) : null)
            }
          }
				} else {
					subParts = mainParts.split("long")
					if (subParts.length > 1 && subParts[0].trim() == "") {
            var variable = bVariable ? subParts[1].split("=") : subParts[1].split("[]")
            var value = variable[1].trim()
            value = value.substring(0, value.length - 1)
            if (variable.length == 2) {
              op[i] = {
                type: (bVariable ? "v" : "a"),
                op: "m",
                dataType: "long",
                name: variable[0].trim(),
                value: (bVariable ? parseInt(value) : null)
              }
            }
					} else {
						subParts = mainParts.split("bool")
						if (subParts.length > 1 && subParts[0].trim() == "") {
              var variable = bVariable ? subParts[1].split("=") : subParts[1].split("[]")
              var value = variable[1].trim()
              value = value.substring(0, value.length - 1)
              if (variable.length == 2) {
                op[i] = {
                  type: (bVariable ? "v" : "a"),
                  op: "m",
                  dataType: "bool",
                  name: variable[0].trim(),
                  value: (bVariable ? (value == "true" ? true : false) : null)
                }
              }
						} else {
							subParts = mainParts.split("string")
							if (subParts.length > 1 && subParts[0].trim() == "") {
                var variable = bVariable ? subParts[1].split("=") : subParts[1].split("[]")
                var value = variable[1].trim()
                value = value.substring(0, value.length - 1)
                if (variable.length == 2) {
                  op[i] = {
                    type: (bVariable ? "v" : "a"),
                    op: "m",
                    dataType: "string",
                    name: variable[0].trim(),
                    value: (bVariable ? value : null)
                  }
                }
							} else {
								subParts = mainParts.split("float")
								if (subParts.length > 1 && subParts[0].trim() == "") {
                  var variable = bVariable ? subParts[1].split("=") : subParts[1].split("[]")
                  var value = variable[1].trim()
                  value = value.substring(0, value.length - 1)
                  if (variable.length == 2) {
                    op[i] = {
                      type: (bVariable ? "v" : "a"),
                      op: "m",
                      dataType: "float",
                      name: variable[0].trim(),
                      value: (bVariable ? parseFloat(value) : null)
                    }
                  }
								} else {
									subParts = mainParts.split("double")
									if (subParts.length > 1 && subParts[0].trim() == "") {
                    var variable = bVariable ? subParts[1].split("=") : subParts[1].split("[]")
                    var value = variable[1].trim()
                    value = value.substring(0, value.length - 1)
                    if (variable.length == 2) {
                      op[i] = {
                        type: (bVariable ? "v" : "a"),
                        op: "m",
                        dataType: "double",
                        name: variable[0].trim(),
                        value: (bVariable ? parseFloat(value) : null)
                      }
                    }
									}
								}
							}
						}
					}
				}

			}

      var removedLines = ""

      for (var i in op) {
        var o = op[i]
        if (o.op == "r") {
          removedLines += o.line + "\n"
        }
      }

      var params = ""

      for (var i in op) {
        var o = op[i]
        if (o.op == "m" && o.type == "v") {
          if (o.dataType == "int") {
            params += o.name + ", " + "Integer" + ", true, " + o.value + ", " + (o.value - 1) + ", " + (o.value + 1) + "\n"
          } else if (o.dataType == "long") {
            params += o.name + ", " + "Integer" + ", true, " + o.value + ", " + (o.value - 1) + ", " + (o.value + 1) + "\n"
          } else if (o.dataType == "bool") {
            params += o.name + ", " + "Boolean" + ", true, " + o.value + ", false, true" + "\n"
          } else if (o.dataType == "string") {
            params += o.name + ", " + "Boolean" + ", true, " + o.value + ", false, true" + "\n"
          } else if (o.dataType == "float") {
            params += o.name + ", " + "Number" + ", true, " + o.value + ", " + (o.value - 1) + ", " + (o.value + 1) + "\n"
          } else if (o.dataType == "double") {
            params += o.name + ", " + "Number" + ", true, " + o.value + ", " + (o.value - 1) + ", " + (o.value + 1) + "\n"
          }
        }
      }

      params = params.substring(0, params.length - 1)

      var dataoutput = ""

      for (var i in op) {
        var o = op[i]
        if (o.op == "m" && o.type == "a") {
          dataoutput += o.dataType + ", true, Line, #00CCFF\n"
        }
      }
		}

    dataoutput = dataoutput.substring(0, dataoutput.length - 1)

    return {
      removedLines: removedLines,
      params: params,
      datainput: "Time, 0\nVolume, 1\nOpen, 2\nHigh, 3\nLow, 4\nClose, 5",
      dataoutput: dataoutput
    }
  },
  compileIndi: function (sourceCode) {

  },
  compileEa: function (sourceCode) {

  },
  isNumeric: function (number) {
  	if (typeof number == "undefined" || number == null) return false

  	return !isNaN(parseFloat(number)) && isFinite(number);
  },
  isInteger: function (number) {
  	return !isNaN(number) &&
  		parseInt(Number(number)) == number &&
  		!isNaN(parseInt(number, 10))
  },
  parseParams: function (params) {
  	var parsedParams = []

  	for (var i in params) {
  	  var pm = params[i].split(",")
        var pm1 = pm[1].trim()
  	  var pm3 = pm[3].trim()
  	  var pm4 = pm[4].trim()
  	  var pm5 = pm[5].trim()
  	  var obj = {
  	    name: pm[0].trim(),
  	    type: pm1,
  	    required: pm[2].trim().toLowerCase() == 'true' ? true : false,
  	    value: this.isInteger(pm3) ? parseInt(pm3) : (this.isNumeric(pm3) ? parseFloat(pm3) : (pm3.toLowerCase() == 'true' ? true : (pm3.toLowerCase() == 'false' ? false : (pm3.toLowerCase() == 'null' ? null : pm3.slice(1,-1))))),
  	    range: pm1 != 'String' ? [] : null
  	  }
        if (pm1 != 'String') {
  	      obj.range.push(this.isInteger(pm4) ? parseInt(pm4) : (this.isNumeric(pm4) ? parseFloat(pm4) : (pm4.toLowerCase() == 'true' ? true : (pm4.toLowerCase() == 'false' ? false : (pm4.toLowerCase() == 'null' ? null : pm4)))))
  	      obj.range.push(this.isInteger(pm5) ? parseInt(pm5) : (this.isNumeric(pm5) ? parseFloat(pm5) : (pm5.toLowerCase() == 'true' ? true : (pm5.toLowerCase() == 'false' ? false : (pm5.toLowerCase() == 'null' ? null : pm5)))))
        }
  	  parsedParams.push(obj)
  	}

  	return parsedParams
  },
  parseInput: function (datainput) {
  	var parsedInput = []

  	for (var i in datainput) {
  	  var di = datainput[i].split(",")
  	  var obj = {
  	    name: di[0].trim(),
  	    index: parseInt(di[1].trim())
  	  }
  	  parsedInput.push(obj)
  	}

  	return parsedInput
  },
  parseOutput: function (dataoutput) {
  	var parsedOutput = []

  	for (var i = 0; i < dataoutput.length; i++) {
  	  var dout = dataoutput[i].split(",")
  	  var obj = {
  	    name: dout[0].trim(),
  	    visible: dout[1].trim().toLowerCase() == 'true' ? true : false,
  	    renderType: dout[2].trim(),
  	    color: dout[3].trim()
  	  }
  	  parsedOutput.push(obj)
  	}

  	return parsedOutput
  },
  generateIndi: function (serverUrl, name, sourceCode) {
    var fileName = name.trim() == "" ? "test" : name.trim()
    var generatedStructure = this.generateStructure(sourceCode)

  	var namedesc = [fileName, "This is an example.", (serverUrl.trim() == "" ? "http://127.0.0.1:3000" : serverUrl.trim()) + "/js/" + fileName + ".js"]

    var namedesc = [(name.trim() == "" ? "test" : name.trim()), "This is an example.", "http://127.0.0.1:8082/indi_example.js"]
  	var params = generatedStructure.params.split("\n")
  	var datainput = generatedStructure.datainput.split("\n")
  	var dataoutput = generatedStructure.dataoutput.split("\n")
  	var separatewindow = true

  	var parsedParams = this.parseParams(params)
  	var parsedInput = this.parseInput(datainput)
  	var parsedOutput = this.parseOutput(dataoutput)

  	var template = '#include "mqlindi2fintechee.h"\n\n'

  	var template2 = ''
  	for (var i in parsedParams) {
  	  if (parsedParams[i].type == 'Integer') {
  	    template2 += 'int ' + parsedParams[i].name + ';\n'
  	  } else if (parsedParams[i].type == 'Number') {
  	    template2 += 'double ' + parsedParams[i].name + ';\n'
  	  } else if (parsedParams[i].type == 'Boolean') {
  	    template2 += 'bool ' + parsedParams[i].name + ';\n'
  	  } else if (parsedParams[i].type == 'Stringr') {
  	    template2 += 'const char* ' + parsedParams[i].name + ';\n'
  	  }
  	}

  	var template3 = '\n'

  	var template4 = ''
  	for (var i in parsedOutput) {
  	  template4 += 'double* ' + parsedOutput[i].name + ';\n'
  	}

  	var template5 = '\nint OnCalculate (const int rates_total,\n' +
  	'                 const int prev_calculated,\n'

  	var template6 = ''
  	for (var i in parsedInput) {
  	  template6 += '                 const double* ' + parsedInput[i].name + ',\n'
  	}
  	template6 = template6.slice(0, -2)

  	var template7 = ');\n\n' +
  	'extern "C" {\n\n' +
  	'EMSCRIPTEN_KEEPALIVE\n' +
  	'void onCalc (int uid, int rates_total, int prev_calculated, int barNum, double point, int digits) {\n' +
  	'  iFintecheeUID = uid;\n' +
  	'  Bars = barNum;\n' +
  	'  Point = point;\n' +
  	'  Digits = digits;\n\n' +
  	'  if (paramInputOutputList.find(uid) != paramInputOutputList.end()) {\n'

  	var template8 = ''
  	for (var i in parsedParams) {
  	  if (parsedParams[i].type == 'Integer') {
  	    template8 += '    ' + parsedParams[i].name + ' = paramInputOutputList[uid].paramList[' + i + '].paramInt;\n'
  	  } else if (parsedParams[i].type == 'Number') {
  	    template8 += '    ' + parsedParams[i].name + ' = paramInputOutputList[uid].paramList[' + i + '].paramDouble;\n'
  	  } else if (parsedParams[i].type == 'Boolean') {
  	    template8 += '    ' + parsedParams[i].name + ' = paramInputOutputList[uid].paramList[' + i + '].paramBool;\n'
  	  } else if (parsedParams[i].type == 'String') {
  	    template8 += '    ' + parsedParams[i].name + ' = paramInputOutputList[uid].paramList[' + i + '].paramString;\n'
  	  }
  	}

  	var template9 = ''
  	for (var i in parsedInput) {
  	  template9 += '    double* ' + parsedInput[i].name + ' = paramInputOutputList[uid].dataInputList[' + i + '].buffer;\n'
  	}

  	var template10 = ''
  	for (var i in parsedOutput) {
  	  template10 += '    ' + parsedOutput[i].name + ' = paramInputOutputList[uid].dataOutputList[' + i + '].buffer;\n'
  	}

  	var template11 = '\n' +
  	'    OnCalculate(rates_total, prev_calculated, '

  	var template12 = ''
  	for (var i in parsedInput) {
  	  template12 += parsedInput[i].name + ', '
  	}
  	template12 = template12.slice(0, -2)

  	var template13 = ');\n' +
  	'  }\n' +
  	'}\n\n' +
  	'}\n\n' +
  	'int OnCalculate(const int rates_total,\n' +
  	'                const int prev_calculated,\n'

  	var template14 = ''
  	for (var i in parsedInput) {
  	  template14 += '                const double* ' + parsedInput[i].name + ',\n'
  	}
  	template14 = template14.slice(0, -2)

  	var template15 = ')\n'

  	var sourcecode = template + template2 + template3 + template4 + template5 + template6 + template7 + template8 + template9 + template10 +
  	                 template11 + template12 + template13 + template14 + template15

  	var definition = {
  		name: namedesc[0],
  		description: namedesc[1],
  		url: namedesc[2],
  		parameters: parsedParams,
  		dataInput: parsedInput,
  		dataOutput: parsedOutput,
  		whereToRender: separatewindow ? 'SEPARATE_WINDOW' : 'CHART_WINDOW'
  	}

    return {
      sourcecode: sourcecode,
      definition: definition
    }
  },
  generateEa: function (serverUrl, name, sourceCode) {
    var fileName = name.trim() == "" ? "test" : name.trim()
    var generatedStructure = this.generateStructure(sourceCode)

  	var namedesc = [fileName, "This is an example.", (serverUrl.trim() == "" ? "http://127.0.0.1:3000" : serverUrl.trim()) + "/js/" + fileName + ".js"]
  	var params = generatedStructure.params.split("\n")

  	var parsedParams = this.parseParams(params)

  	var template = '#include "mqlea2fintechee.h"\n\n'

  	var template2 = ''
  	for (var i in parsedParams) {
  	  if (parsedParams[i].type == 'Integer') {
  	    template2 += 'int ' + parsedParams[i].name + ';\n'
  	  } else if (parsedParams[i].type == 'Number') {
  	    template2 += 'double ' + parsedParams[i].name + ';\n'
  	  } else if (parsedParams[i].type == 'Boolean') {
  	    template2 += 'bool ' + parsedParams[i].name + ';\n'
  	  } else if (parsedParams[i].type == 'String') {
  	    template2 += 'const char* ' + parsedParams[i].name + ';\n'
  	  }
  	}

  	var template3 = '\n' +
  	'extern "C" {\n\n' +
  	'EMSCRIPTEN_KEEPALIVE\n' +
  	'void onTick (int uid, int barNum, double ask, double bid, double point, int digits) {\n' +
  	'  iFintecheeUID = uid;\n' +
  	'  Bars = barNum;\n' +
  	'  Ask = ask;\n' +
  	'  Bid = bid;\n' +
  	'  Point = point;\n' +
  	'  Digits = digits;\n\n' +
  	'  if (paramHandleList[uid].bInit) {\n' +
  	'    if (paramHandleList.find(uid) != paramHandleList.end()) {\n'

  	var template4 = ''
  	for (var i in parsedParams) {
  	  if (parsedParams[i].type == 'Integer') {
  	    template4 += '      ' + parsedParams[i].name + ' = paramHandleList[uid].paramList[' + i + '].paramInt;\n'
  	  } else if (parsedParams[i].type == 'Number') {
  	    template4 += '      ' + parsedParams[i].name + ' = paramHandleList[uid].paramList[' + i + '].paramDouble;\n'
  	  } else if (parsedParams[i].type == 'Boolean') {
  	    template4 += '      ' + parsedParams[i].name + ' = paramHandleList[uid].paramList[' + i + '].paramBool;\n'
  	  } else if (parsedParams[i].type == 'Stringr') {
  	    template4 += '      ' + parsedParams[i].name + ' = paramHandleList[uid].paramList[' + i + '].paramString;\n'
  	  }
  	}

  	var template5 = '    }\n' +
      '    OnTick();\n' +
  	'    paramHandleList[uid].bInit = false;\n' +
  	'  } else {\n' +
      '    OnTick();\n' +
  	'  }\n' +
  	'}\n\n' +
  	'}\n'

  	var sourcecode = template + template2 + template3 + template4 + template5

  	var definition = {
  		name: namedesc[0],
  		description: namedesc[1],
  		url: namedesc[2],
  		parameters: parsedParams
  	}

    return {
      sourcecode: sourcecode,
      definition: definition
    }
  },
  compileIndi: function (serverUrl, name, sourceCodes) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "POST",
        url: (serverUrl.trim() == "" ? "http://127.0.0.1:3000" : serverUrl.trim()) + "/compile",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
          name: (name.trim() == "" ? "test" : name.trim()),
          sourceCode: sourceCodes,
          type: "indicator"
        }),
        success: function (data) {
          resolve(data.res)
        },
        error: function (request, status, error) {
          reject()
        }
      })
    })
  },
  compileEa: function (serverUrl, name, sourceCodes) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "POST",
        url: (serverUrl.trim() == "" ? "http://127.0.0.1:3000" : serverUrl.trim()) + "/compile",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
          name: (name.trim() == "" ? "test" : name.trim()),
          sourceCode: sourceCodes,
          type: "EA"
        }),
        success: function (data) {
          resolve(data.res)
        },
        error: function (request, status, error) {
          reject()
        }
      })
    })
  }
}

// Currently, the source codes are required not to be confusing.
// Especially, variables' names attached with key words may not be parsed successfully.
// Because the key words have been used to split the source lines to extract the parts of the variables.
// Fortunately, a better parser compatible with more complex syntax will be coming soon.
var eaStudio = {
  parseVariable: function (subParts, bVariable) {
    var variable = null

    if (bVariable) {
      variable = subParts.split("=")
      variable.push("v")
    } else {
      variable = subParts.split("[]")
      if (variable.length > 1) {
        variable[1] = ";"
        variable.push("a")
      } else {
        variable = subParts.split("=")
        if (variable.length == 1) {
          variable[0] = variable[0].replace(";", "")
          variable[1] = ";"
        }
        variable.push("g")
      }
    }

    return variable
  },
  generateStructure: function (srcCode) {
    var generatedStructure = null

		if (srcCode.length > 0) {
      var sourceCode = srcCode
        .replaceAll(/\/\*([\s\S]*?)\*\//g, "")

			var lines = sourceCode.split("\n")
			var op = []

			for (var i in lines) {
				var line = lines[i]

        if (line.trim() == "") {
          continue
        }

        if (line.indexOf("OnCalculate") != -1 ||
            line.indexOf("start") != -1 ||
            line.indexOf("init") != -1 ||
            line.indexOf("OnInit") != -1 ||
            line.indexOf("OnDeinit") != -1 ||
            line.indexOf("OnTick") != -1) {
          break
        }

        var leftBIndex = line.indexOf("(")
        if (leftBIndex != -1) {
          var detectComment = line.split("//")
          if (detectComment.length > 1 && detectComment[0].length > leftBIndex) {
            break
          } else if (detectComment.length == 1) {
            detectComment = line.split("#")
            if (detectComment.length == 1 || detectComment[0].trim() != "") {
              break
            }
          }
        }

				var parts = null

				parts = line.split("#")
				if (parts.length > 1) {
					if (parts[0].trim() == "") {
            if (parts[1].indexOf("define") != -1) {
              op[i] = {
                op: "c",
                line: line
              }
            } else {
              op[i] = {
                op: "r",
                line: "// " + line
              }
            }
          }
				} else {
          parts = line.split("//")
          if (parts.length > 1) {
            line = parts[0].trim()
  					if (line == "") {
              continue
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
          var variable = this.parseVariable(subParts[1], bVariable)

          if (variable.length < 3) throw new Error("Incorrect Syntax: " + line)

          var value = variable[1].trim()
          value = value.substring(0, value.length - 1)
          op[i] = {
            type: variable[2],
            op: "m",
            dataType: "int",
            name: variable[0].trim().replaceAll(",", "~"),
            value: (value != "" ? value : null)
          }
				} else {
					subParts = mainParts.split("long")
					if (subParts.length > 1 && subParts[0].trim() == "") {
            var variable = this.parseVariable(subParts[1], bVariable)

            if (variable.length < 3) throw new Error("Incorrect Syntax: " + line)

            var value = variable[1].trim()
            value = value.substring(0, value.length - 1)
            op[i] = {
              type: variable[2],
              op: "m",
              dataType: "long",
              name: variable[0].trim().replaceAll(",", "~"),
              value: (value != "" ? value : null)
            }
					} else {
						subParts = mainParts.split("bool")
						if (subParts.length > 1 && subParts[0].trim() == "") {
              var variable = this.parseVariable(subParts[1], bVariable)

              if (variable.length < 3) throw new Error("Incorrect Syntax: " + line)

              var value = variable[1].trim()
              value = value.substring(0, value.length - 1)
              op[i] = {
                type: variable[2],
                op: "m",
                dataType: "bool",
                name: variable[0].trim().replaceAll(",", "~"),
                value: (value != "" ? value : null)
              }
						} else {
							subParts = mainParts.split("string")
							if (subParts.length > 1 && subParts[0].trim() == "") {
                var variable = this.parseVariable(subParts[1], bVariable)

                if (variable.length < 3) throw new Error("Incorrect Syntax: " + line)

                var value = variable[1].trim()
                value = value.substring(0, value.length - 1)
                op[i] = {
                  type: variable[2],
                  op: "m",
                  dataType: "string",
                  name: variable[0].trim().replaceAll(",", "~"),
                  value: (value != "" ? value : null)
                }
							} else {
								subParts = mainParts.split("float")
								if (subParts.length > 1 && subParts[0].trim() == "") {
                  var variable = this.parseVariable(subParts[1], bVariable)

                  if (variable.length < 3) throw new Error("Incorrect Syntax: " + line)

                  var value = variable[1].trim()
                  value = value.substring(0, value.length - 1)
                  op[i] = {
                    type: variable[2],
                    op: "m",
                    dataType: "float",
                    name: variable[0].trim().replaceAll(",", "~"),
                    value: (value != "" ? value : null)
                  }
								} else {
									subParts = mainParts.split("double")
									if (subParts.length > 1 && subParts[0].trim() == "") {
                    var variable = this.parseVariable(subParts[1], bVariable)

                    if (variable.length < 3) throw new Error("Incorrect Syntax: " + line)

                    var value = variable[1].trim()
                    value = value.substring(0, value.length - 1)
                    op[i] = {
                      type: variable[2],
                      op: "m",
                      dataType: "double",
                      name: variable[0].trim().replaceAll(",", "~").replaceAll(" ", ""),
                      value: (value != "" ? value : null)
                    }
									} else {
                    subParts = mainParts.split("datetime")
          					if (subParts.length > 1 && subParts[0].trim() == "") {
                      var variable = this.parseVariable(subParts[1], bVariable)

                      if (variable.length < 3) throw new Error("Incorrect Syntax: " + line)

                      var value = variable[1].trim()
                      value = value.substring(0, value.length - 1)
                      op[i] = {
                        type: variable[2],
                        op: "m",
                        dataType: "long",
                        name: variable[0].trim().replaceAll(",", "~"),
                        value: (value != "" ? value : null)
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
      var globalVars = ""
      var constants = ""

      for (var i in op) {
        var o = op[i]
        if (o.op == "m") {
          if (o.type == "v") {
            if (o.dataType == "int") {
              params += o.name + "," + "Integer" + ",false," + o.value + "," + o.value + "," + o.value + "\n"
            } else if (o.dataType == "long") {
              params += o.name + "," + "Integer" + ",false," + o.value + "," + o.value + "," + o.value + "\n"
            } else if (o.dataType == "bool") {
              params += o.name + "," + "Boolean" + ",false," + o.value + ",false,true" + "\n"
            } else if (o.dataType == "string") {
              params += o.name + "," + "String" + ",false," + o.value + ",false,true" + "\n"
            } else if (o.dataType == "float") {
              params += o.name + "," + "Number" + ",false," + o.value + "," + o.value + "," + o.value + "\n"
            } else if (o.dataType == "double") {
              params += o.name + "," + "Number" + ",false," + o.value + "," + o.value + "," + o.value + "\n"
            }
          }

          if (o.type == "v" || o.type == "g") {
            if (o.dataType == "int") {
              globalVars += o.name + "," + "Integer" + ",false," + o.value + "," + o.value + "," + o.value + "\n"
            } else if (o.dataType == "long") {
              globalVars += o.name + "," + "Integer" + ",false," + o.value + "," + o.value + "," + o.value + "\n"
            } else if (o.dataType == "bool") {
              globalVars += o.name + "," + "Boolean" + ",false," + o.value + ",false,true" + "\n"
            } else if (o.dataType == "string") {
              globalVars += o.name + "," + "String" + ",false," + o.value + ",false,true" + "\n"
            } else if (o.dataType == "float") {
              globalVars += o.name + "," + "Number" + ",false," + o.value + "," + o.value + "," + o.value + "\n"
            } else if (o.dataType == "double") {
              globalVars += o.name + "," + "Number" + ",false," + o.value + "," + o.value + "," + o.value + "\n"
            }
          }
        } else if (o.op == "c") {
          constants += o.line + "\n"
        }
      }

      params = params.substring(0, params.length - 1)
      globalVars = globalVars.substring(0, globalVars.length - 1)

      var dataoutput = ""

      for (var i in op) {
        var o = op[i]
        if (o.op == "m" && o.type == "a") {
          dataoutput += o.name + ", true, Line, #00CCFF\n"
        }
      }
		}

    dataoutput = dataoutput.substring(0, dataoutput.length - 1)

    return {
      removedLines: removedLines,
      constants: constants,
      params: params,
      globalVars: globalVars,
      datainput: "Time, 0\nVolume, 1\nOpen, 2\nHigh, 3\nLow, 4\nClose, 5",
      dataoutput: dataoutput
    }
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
      if (pm.length < 6) continue

      var pm1 = pm[1]
  	  var pm3 = pm[3]
  	  var pm4 = pm[4]
  	  var pm5 = pm[5]
  	  var obj = {
  	    name: pm[0].replaceAll("~", ", "),
  	    type: pm1,
  	    required: pm[2] == 'true' ? true : false,
  	    value: this.isInteger(pm3) ? parseInt(pm3) : (this.isNumeric(pm3) ? parseFloat(pm3) : (pm3 == 'true' ? true : (pm3 == 'false' ? false : (pm3 == 'null' ? null : (pm1 == 'String' ? pm3.slice(1,-1) : pm3))))),
  	    range: pm1 != 'String' ? [] : null
  	  }
      if (pm1 != 'String') {
	      obj.range.push(this.isInteger(pm4) ? parseInt(pm4) : (this.isNumeric(pm4) ? parseFloat(pm4) : (pm4 == 'true' ? true : (pm4 == 'false' ? false : (pm4 == 'null' ? null : pm4)))))
	      obj.range.push(this.isInteger(pm5) ? parseInt(pm5) : (this.isNumeric(pm5) ? parseFloat(pm5) : (pm5 == 'true' ? true : (pm5 == 'false' ? false : (pm5 == 'null' ? null : pm5)))))
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
    var that = this
    return new Promise(function(resolve, reject) {
      try {
        resolve(that.generateIndi2(serverUrl, name, sourceCode))
      } catch (e) {
        reject(e.message)
      }
    })
  },
  generateIndi2: function (serverUrl, name, sourceCode) {
    var fileName = name.trim() == "" ? "test" : name.trim()
    var generatedStructure = this.generateStructure(sourceCode)

  	var namedesc = [fileName, "This is an example.", (serverUrl.trim() == "" ? "http://127.0.0.1:3000" : serverUrl.trim()) + "/js/" + fileName + ".js"]

    var constants = generatedStructure.constants
  	var params = generatedStructure.params.split("\n")
    var globalVars = generatedStructure.globalVars.split("\n")
  	var datainput = generatedStructure.datainput.split("\n")
  	var dataoutput = generatedStructure.dataoutput.split("\n")
  	var separatewindow = true

  	var parsedParams = this.parseParams(params)
    var parsedGlobalVars = this.parseParams(globalVars)
  	var parsedInput = this.parseInput(datainput)
  	var parsedOutput = this.parseOutput(dataoutput)

  	var template = '#include "mqlindi2fintechee.h"\n\n'

    var template1 = constants

  	var template2 = '\n'
  	for (var i in parsedGlobalVars) {
  	  if (parsedGlobalVars[i].type == 'Integer') {
  	    template2 += 'int ' + parsedGlobalVars[i].name + (parsedGlobalVars[i].value != null ? (" = " + parsedGlobalVars[i].value) : "") + ';\n'
  	  } else if (parsedGlobalVars[i].type == 'Number') {
  	    template2 += 'double ' + parsedGlobalVars[i].name + (parsedGlobalVars[i].value != null ? (" = " + parsedGlobalVars[i].value) : "") + ';\n'
  	  } else if (parsedGlobalVars[i].type == 'Boolean') {
  	    template2 += 'bool ' + parsedGlobalVars[i].name + (parsedGlobalVars[i].value != null ? (" = " + parsedGlobalVars[i].value) : "") + ';\n'
  	  } else if (parsedGlobalVars[i].type == 'String') {
  	    template2 += 'string ' + parsedGlobalVars[i].name + (parsedGlobalVars[i].value != null ? (' = "' + parsedGlobalVars[i].value + '"') : "") + ';\n'
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

  	var sourcecode = template + template1 + template2 + template3 + template4 + template5 + template6 + template7 + template8 + template9 + template10 +
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
    var that = this
    return new Promise(function(resolve, reject) {
      try {
        resolve(that.generateEa2(serverUrl, name, sourceCode))
      } catch (e) {
        reject(e.message)
      }
    })
  },
  generateEa2: function (serverUrl, name, sourceCode) {
    var fileName = name.trim() == "" ? "test" : name.trim()
    var generatedStructure = this.generateStructure(sourceCode)

  	var namedesc = [fileName, "This is an example.", (serverUrl.trim() == "" ? "http://127.0.0.1:3000" : serverUrl.trim()) + "/js/" + fileName + ".js"]
    var constants = generatedStructure.constants
  	var params = generatedStructure.params.split("\n")
    var globalVars = generatedStructure.globalVars.split("\n")

  	var parsedParams = this.parseParams(params)
    var parsedGlobalVars = this.parseParams(globalVars)

  	var template = '#include "mqlea2fintechee.h"\n\n'

    var template1 = constants

  	var template2 = '\n'
  	for (var i in parsedGlobalVars) {
  	  if (parsedGlobalVars[i].type == 'Integer') {
  	    template2 += 'int ' + parsedGlobalVars[i].name + (parsedGlobalVars[i].value != null ? (" = " + parsedGlobalVars[i].value) : "") + ';\n'
  	  } else if (parsedGlobalVars[i].type == 'Number') {
  	    template2 += 'double ' + parsedGlobalVars[i].name + (parsedGlobalVars[i].value != null ? (" = " + parsedGlobalVars[i].value) : "") + ';\n'
  	  } else if (parsedGlobalVars[i].type == 'Boolean') {
  	    template2 += 'bool ' + parsedGlobalVars[i].name + (parsedGlobalVars[i].value != null ? (" = " + parsedGlobalVars[i].value) : "") + ';\n'
  	  } else if (parsedGlobalVars[i].type == 'String') {
  	    template2 += 'string ' + parsedGlobalVars[i].name + (parsedGlobalVars[i].value != null ? (' = "' + parsedGlobalVars[i].value + '"') : "") + ';\n'
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
  	  } else if (parsedParams[i].type == 'String') {
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

  	var sourcecode = template + template1 + template2 + template3 + template4 + template5

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

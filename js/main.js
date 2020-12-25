var crd = null;
var connected = false;
const oneHour = 3600000;
const notificationTimeout = 10000;
const refreshInterval = 60000;
const priceNum = 21;
const latestTradesLimit = 30;
const serverUrl = "https://lmk2m8udud.execute-api.eu-central-1.amazonaws.com/v1";
const sandbox = true;

function generateNonce() {
  return Math.floor(Math.random() * 10000000000) + ""
};

function notifySuccess(message) {
  new PNotify({
    title: "Success",
    text: message,
    type: "success",
    styling: "bootstrap3"
  })
};

function notifyNews(message) {
  new PNotify({
    title: "News",
    text: message,
    type: "info",
    styling: "bootstrap3"
  })
};

function notifyWarning(message) {
  new PNotify({
    title: "Warning",
    text: message,
    styling: "bootstrap3"
  })
};

function notifyError(message) {
  new PNotify({
    title: "Error",
    text: message,
    type: "error",
    styling: "bootstrap3"
  })
};

function notifyInfo(message) {
  new PNotify({
    title: "Information",
    text: message,
    type: "info",
    styling: "bootstrap3",
    addclass: "dark"
  })
};
const eosRpcUrl = "https://jungle3.cryptolions.io";
const chainId = "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473";
const scatterCore = "https://www.fintechee.com/js/wallet/scatterjs-core.min.js";
const scatterEos = "https://www.fintechee.com/js/wallet/scatterjs-plugin-eosjs2.min.js";
const eosRpc = "https://www.fintechee.com/js/wallet/eosjs-jsonrpc.min.js";
const eosApi = "https://www.fintechee.com/js/wallet/eosjs-api.min.js";
const web3Url = "https://www.fintechee.com/js/wallet/web3.min.js";
var ethReceiptUrl = null;
window.platforms = [];
window.platforms["eos"] = {
  exchange: null,
  feeRecipient: null,
  feeAmountRequired: null,
  cryptocurrencies: []
};
window.platforms["eth"] = {
  exchange: null,
  feeRecipient: null,
  feeAmountRequired: null,
  cryptocurrencies: []
};
if (typeof window.dexEosLibsLoaded == "undefined") {
  window.eosRpcUrl = eosRpcUrl;
  window.chainId = chainId;
  window.scatterCore = scatterCore;
  window.scatterEos = scatterEos;
  window.eosRpc = eosRpc;
  window.eosApi = eosApi
}
if (typeof window.dexEthLibsLoaded == "undefined") {
  window.web3Url = web3Url
}
if (typeof window.dexEosLibsLoaded == "undefined" || !window.dexEosLibsLoaded || window.eosRpcUrl != eosRpcUrl || window.chainId != chainId || window.scatterCore != scatterCore || window.scatterEos != scatterEos || window.eosRpc != eosRpc || window.eosApi != eosApi) {
  window.dexEosLibsLoaded = false;
  window.eosRpcUrl = eosRpcUrl;
  window.chainId = chainId;
  window.scatterCore = scatterCore;
  window.scatterEos = scatterEos;
  window.eosRpc = eosRpc;
  window.eosApi = eosApi;
  var tags = document.getElementsByTagName("script");
  for (var i = tags.length - 1; i >= 0; i--) {
    if (tags[i] && tags[i].getAttribute("src") != null && (tags[i].getAttribute("src") == scatterCore || tags[i].getAttribute("src") == scatterEos || tags[i].getAttribute("src") == eosRpc || tags[i].getAttribute("src") == eosApi || tags[i].getAttribute("src") == web3Url)) {
      tags[i].parentNode.removeChild(tags[i])
    }
  }
  var script1 = document.createElement("script");
  document.body.appendChild(script1);
  script1.onload = function() {
    var script2 = document.createElement("script");
    document.body.appendChild(script2);
    script2.onload = function() {
      var script3 = document.createElement("script");
      document.body.appendChild(script3);
      script3.onload = function() {
        var script4 = document.createElement("script");
        document.body.appendChild(script4);
        script4.onload = function() {
          var parsedJsonRpcUrl = eosRpcUrl.split("://");
          var parsedJsonRpcUrl2 = parsedJsonRpcUrl[1].split(":");
          window.network = ScatterJS.Network.fromJson({
            blockchain: "eos",
            protocol: parsedJsonRpcUrl[0],
            host: parsedJsonRpcUrl2[0],
            port: parsedJsonRpcUrl2.length == 1 ? 443 : parseInt(parsedJsonRpcUrl2[1]),
            chainId: chainId
          });
          ScatterJS.plugins(new ScatterEOS());
          ScatterJS.scatter.connect("www.fintechee.com", {
            network: window.network
          }).then(function(connected) {
            if (!connected) {
              notifyError("Failed to connect to your Scatter APP. Scatter APP is required to transfer funds from EOS platform.");
              return false
            }
            const scatter = ScatterJS.scatter;
            window.eosjs_jsonrpc = eosjs_jsonrpc;
            window.eos_rpc = new eosjs_jsonrpc.JsonRpc(eosRpcUrl);
            window.eos_api = scatter.eos(network, eosjs_api.Api, {
              rpc: eos_rpc
            });
            (async function() {
              if (scatter.identity) {
                scatter.logout()
              }
              await scatter.login();
              window.scatter = scatter;
              window.dexEosLibsLoaded = true;
              notifySuccess("Connected to Scatter successfully!")
            })();
            window.ScatterJS = null
          })
        };
        script4.onerror = function() {
          notifyError("Failed to load required libs. Please run this program again.")
        };
        script4.async = true;
        script4.src = scatterEos
      };
      script3.onerror = function() {
        notifyError("Failed to load required libs. Please run this program again.")
      };
      script3.async = true;
      script3.src = scatterCore
    };
    script2.onerror = function() {
      notifyError("Failed to load required libs. Please run this program again.")
    };
    script2.async = true;
    script2.src = eosRpc
  };
  script1.onerror = function() {
    notifyError("Failed to load required libs. Please run this program again.")
  };
  script1.async = true;
  script1.src = eosApi
}
if (typeof window.dexEthLibsLoaded == "undefined" || !window.dexEthLibsLoaded || window.web3Url != web3Url) {
  window.web3Url = web3Url;
  var script5 = document.createElement("script");
  document.body.appendChild(script5);
  script5.onload = function() {
    if (typeof ethereum == "undefined") return;
    ethereum.request({
      method: "eth_requestAccounts"
    });
    window.eth_api = new Web3(web3.currentProvider);
    window.dexEthLibsLoaded = true
  };
  script5.onerror = function() {
    notifyError("Failed to load required libs. Please run this program again.")
  };
  script5.async = true;
  script5.src = web3Url
}

function getOrders(basePlatform, baseCryptocurrency, termPlatform, termCryptocurrency) {
  return new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      url: serverUrl + "/orders/" + basePlatform + "/" + baseCryptocurrency + "/" + termPlatform + "/" + termCryptocurrency,
      headers: {
        "Authorization": "Basic " + btoa("guest:guest")
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        contactId: contactId
      }),
      success: function(data) {
        if (Array.isArray(data.res)) {
          if (data.res.length > 0) {
            res(data.res)
          } else {
            res([])
          }
        } else {
          rej()
        }
      }
    })
  })
};

function getMyOrders() {
  return new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      url: serverUrl + "/orders/all/ALL/all/ALL",
      headers: {
        "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        contactId: contactId
      }),
      success: function(data) {
        if (Array.isArray(data.res)) {
          if (data.res.length > 0) {
            res(data.res)
          } else {
            res([])
          }
        } else {
          rej()
        }
      }
    })
  })
};

function getOrderState(platform, trxId, state) {
  return new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      url: serverUrl + "/pending/confirmation",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        platform: platform,
        trxId: trxId,
        state: state
      }),
      success: function(data) {
        if (typeof data.res == "object") {
          res(data.res)
        } else {
          rej()
        }
      }
    })
  })
};

function getMyTransactions() {
  return new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      url: serverUrl + "/trades/all/ALL/all/ALL",
      headers: {
        "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        contactId: contactId
      }),
      success: function(data) {
        if (Array.isArray(data.res)) {
          if (data.res.length > 0) {
            res(data.res)
          } else {
            res([])
          }
        } else {
          rej()
        }
      }
    })
  })
};

function getTrades(basePlatform, baseCryptocurrency, termPlatform, termCryptocurrency) {
  return new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      url: serverUrl + "/trades/" + basePlatform + "/" + baseCryptocurrency + "/" + termPlatform + "/" + termCryptocurrency,
      headers: {
        "Authorization": "Basic " + btoa("guest:guest")
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        contactId: contactId
      }),
      success: function(data) {
        if (Array.isArray(data.res)) {
          if (data.res.length > 0) {
            res(data.res)
          } else {
            res([])
          }
        } else {
          rej()
        }
      }
    })
  })
};

function sendVerificationCode(mailAddr) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/users/activation",
    headers: {
      "Authorization": "Basic " + btoa(mailAddr)
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      contactId: contactId
    }),
    success: function(data) {}
  })
};

function changePassword(verificationCode, newPassword) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/users/update",
    headers: {
      "Authorization": "Basic " + btoa(crd.mailAddr + ":" + verificationCode + ":" + newPassword)
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      contactId: contactId
    }),
    success: function(data) {
      if (typeof data.res == "object" && data.res != null && typeof data.res.mailAddr == "string" && typeof data.res.credentialToken == "string" && data.res.mailAddr != "" && data.res.credentialToken != "") {
        crd.mailAddr = data.res.mailAddr;
        crd.credentialToken = data.res.credentialToken;
        localStorage.credential = JSON.stringify(crd)
      }
    }
  })
};

function notifyTransactionForModification(platform, modificationFeeTrxId, modificationFeeBlockNum, callback) {
  var data = JSON.stringify({
    platform: platform,
    modificationFeeTrxId: modificationFeeTrxId,
    modificationFeeBlockNum: modificationFeeBlockNum,
    contactId: contactId
  });
  $.ajax({
    type: "POST",
    url: serverUrl + "/notifications/modification",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      type: "M",
      data: data
    }),
    success: function(data) {
      if (typeof data.res == "string" && data.res == "success") {
        callback()
      }
    },
    error: function(request, status, error) {
      setTimeout(function() {
        notifyTransactionForModification(platform, modificationFeeTrxId, modificationFeeBlockNum, callback)
      }, notificationTimeout)
    }
  })
};

function notifyTransactionForCancellation(platform, cancellationFeeTrxId, cancellationFeeBlockNum, callback) {
  var data = JSON.stringify({
    platform: platform,
    cancellationFeeTrxId: cancellationFeeTrxId,
    cancellationFeeBlockNum: cancellationFeeBlockNum,
    contactId: contactId
  });
  $.ajax({
    type: "POST",
    url: serverUrl + "/notifications/cancellation",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      type: "C",
      data: data
    }),
    success: function(data) {
      if (typeof data.res == "string" && data.res == "success") {
        callback()
      }
    },
    error: function(request, status, error) {
      setTimeout(function() {
        notifyTransactionForCancellation(platform, cancellationFeeTrxId, cancellationFeeBlockNum, callback)
      }, notificationTimeout)
    }
  })
};

function notifyTransaction(mailAddress, platform, feeTrxId, feeBlockNum, trxId, blockNum, callback) {
  var data = JSON.stringify({
    mailAddr: mailAddress,
    platform: platform,
    feeTrxId: feeTrxId,
    feeBlockNum: feeBlockNum,
    trxId: trxId,
    blockNum: blockNum,
    contactId: contactId
  });
  $.ajax({
    type: "POST",
    url: serverUrl + "/notifications/transaction",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      type: "O",
      data: data
    }),
    success: function(data) {
      if (typeof data.res == "string" && data.res == "success") {
        callback()
      }
    },
    error: function(request, status, error) {
      setTimeout(function() {
        notifyTransaction(mailAddress, platform, feeTrxId, feeBlockNum, trxId, blockNum, callback)
      }, notificationTimeout)
    }
  })
};

function sendDexRequest(mailAddr, siteUrl, accounts) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/contacts/request",
    headers: {
      "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      mailAddr: mailAddr,
      siteUrl: siteUrl,
      ethFeeRecipient: accounts.ethFeeRecipient,
      ethRecipient: accounts.ethRecipient,
      ethFeeAmountRequired: accounts.ethFeeAmountRequired,
      eosFeeRecipient: accounts.eosFeeRecipient,
      eosRecipient: accounts.eosRecipient,
      eosFeeAmountRequired: accounts.eosFeeAmountRequired,
      contactId: contactId
    }),
    success: function(data) {}
  })
};

function getDex(state) {
  return new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      url: serverUrl + "/contacts/listing",
      headers: {
        "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        state: state,
        contactId: contactId
      }),
      success: function(data) {
        if (Array.isArray(data.res)) {
          if (data.res.length > 0) {
            res(data.res)
          } else {
            res([])
          }
        } else {
          rej()
        }
      }
    })
  })
};

function approveDex(dexKey, mailAddrKey) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/contacts/approval",
    headers: {
      "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      dexKey: dexKey,
      mailAddrKey: mailAddrKey,
      contactId: contactId
    }),
    success: function(data) {}
  })
};

function rejectDex(dexKey, mailAddrKey) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/contacts/rejection",
    headers: {
      "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      dexKey: dexKey,
      mailAddrKey: mailAddrKey,
      contactId: contactId
    }),
    success: function(data) {}
  })
};

function sendListingRequest(chainName, cryptocurrency, smartContract, actionName, accuracy, mailAddr) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/cryptocurrencies/request",
    headers: {
      "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      chainName: chainName,
      cryptocurrency: cryptocurrency,
      smartContract: smartContract,
      actionName: actionName,
      accuracy: accuracy,
      mailAddr: mailAddr,
      contactId: contactId
    }),
    success: function(data) {}
  })
};

function getCryptocurrencies(state) {
  return new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      url: serverUrl + "/cryptocurrencies/listing",
      headers: {
        "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        state: state,
        contactId: contactId
      }),
      success: function(data) {
        if (Array.isArray(data.res)) {
          if (data.res.length > 0) {
            res(data.res)
          } else {
            res([])
          }
        } else {
          rej()
        }
      }
    })
  })
};

function approveListing(cryptocurrencyKey) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/cryptocurrencies/approval",
    headers: {
      "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      cryptocurrencyKey: cryptocurrencyKey,
      contactId: contactId
    }),
    success: function(data) {}
  })
};

function rejectListing(cryptocurrencyKey) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/cryptocurrencies/rejection",
    headers: {
      "Authorization": "Basic " + btoa(crd.mailAddr + ":" + crd.credentialToken)
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      cryptocurrencyKey: cryptocurrencyKey,
      contactId: contactId
    }),
    success: function(data) {}
  })
};
window.platforms["eos"].checkBlockInterval = 3000;
window.platforms["eos"].getSmartContract = function(cryptocurrency) {
  if (typeof this.cryptocurrencies[cryptocurrency] != "undefined") {
    return this.cryptocurrencies[cryptocurrency].smartContract
  } else if (cryptocurrency == "EOS") {
    return "eosio.token"
  }
  return null
};
window.platforms["eos"].getActionName = function(cryptocurrency) {
  if (typeof this.cryptocurrencies[cryptocurrency] != "undefined") {
    return this.cryptocurrencies[cryptocurrency].actionName
  } else if (cryptocurrency == "EOS") {
    return "transfer"
  }
  return null
};
window.platforms["eos"].getPlatformCurrency = function() {
  return "EOS"
};
window.platforms["eos"].getFeeAmountRequired = function() {
  return this.feeAmountRequired * 2.0
};
window.platforms["eos"].getFeeAmountRequiredForOperation = function() {
  return this.feeAmountRequired
};
window.platforms["eos"].makeAmountAccurate = function(currency, amount) {
  if (typeof this.cryptocurrencies[currency] != "undefined") {
    if (this.cryptocurrencies[currency].accuracy < 0) {
      return amount.toFixed(Math.abs(this.cryptocurrencies[currency].accuracy))
    } else {
      return Math.round(amount) + ""
    }
  } else if (currency == "EOS") {
    return amount.toFixed(4)
  }
  return null
};
window.platforms["eos"].sendOrder = function(mailAddr, smartContract, actionName, termAmount, termCryptocurrency, feeAmount, platformCurrency, memo, basePlatform, baseAccount, baseCryptocurrency, baseAmount, termPlatform, price, currentAllowedTimesToTransfer, expiration, baseAmountTmp, termAmountTmp) {
  if (!window.dexEosLibsLoaded) return;
  var context = {
    that: this,
    mailAddr: mailAddr,
    smartContract: smartContract,
    actionName: actionName,
    termAmount: termAmount,
    termAmountTmp: termAmountTmp,
    termCryptocurrency: termCryptocurrency,
    feeAmount: feeAmount,
    platformCurrency: platformCurrency,
    memo: memo,
    trxId: null,
    blockNum: null,
    feeTrxId: null,
    feeBlockNum: null,
    basePlatform: basePlatform,
    baseAccount: baseAccount,
    baseCryptocurrency: baseCryptocurrency,
    baseAmount: baseAmount,
    baseAmountTmp: baseAmountTmp,
    termPlatform: termPlatform,
    price: price,
    currentAllowedTimesToTransfer: currentAllowedTimesToTransfer,
    expiration: expiration
  };
  const requiredFields = {
    accounts: [window.network]
  };
  window.scatter.getIdentity(requiredFields).then(() => {
    var context2 = context;
    const account = window.scatter.identity.accounts.find(x => x.blockchain === "eos");
    (async () => {
      try {
        const result = await window.eos_api.transact({
          actions: [{
            account: "eosio.token",
            name: "transfer",
            authorization: [{
              actor: account.name,
              permission: account.authority,
            }],
            data: {
              from: account.name,
              to: context2.that.feeRecipient,
              quantity: context2.feeAmount + " " + context2.platformCurrency,
              memo: "O:" + context2.memo
            }
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        notifySuccess("Transaction to pay for the fee is pushed!");
        context2.feeTrxId = result.transaction_id;
        var context3 = context2;
        var funcTmp = async function() {
          while (!context3.feeBlockNum) {
            await new Promise(resolve => setTimeout(resolve, context3.that.checkBlockInterval));
            const res = await window.eos_rpc.history_get_transaction(context3.feeTrxId);
            notifyInfo("Fee trx EOS new block number: " + context3.feeTrxId + " " + +res.block_num);
            if (res != null && typeof res.trx != "undefined" && typeof res.trx.receipt != "undefined" && typeof res.trx.receipt.status == "string" && res.trx.receipt.status == "executed" && typeof res.block_num != "undefined" && Number.isInteger(res.block_num)) {
              context3.feeBlockNum = res.block_num;
              break
            }
          }
        };
        await funcTmp();
        (async () => {
          try {
            const result = await window.eos_api.transact({
              actions: [{
                account: context3.smartContract,
                name: context3.actionName,
                authorization: [{
                  actor: account.name,
                  permission: account.authority,
                }],
                data: {
                  from: account.name,
                  to: context3.that.exchange,
                  quantity: context3.termAmount + " " + context3.termCryptocurrency,
                  memo: ""
                }
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30
            });
            context3.trxId = result.transaction_id;
            var context0 = context3;
            var funcTmp2 = async function() {
              while (!context0.blockNum) {
                await new Promise(resolve => setTimeout(resolve, context0.that.checkBlockInterval));
                const res = await window.eos_rpc.history_get_transaction(context0.trxId);
                notifyInfo("Trx EOS new block number: " + context0.trxId + " " + res.block_num);
                if (res != null && typeof res.trx != "undefined" && typeof res.trx.receipt != "undefined" && typeof res.trx.receipt.status == "string" && res.trx.receipt.status == "executed" && typeof res.block_num != "undefined" && Number.isInteger(res.block_num)) {
                  context0.blockNum = res.block_num;
                  break
                }
              }
            };
            await funcTmp2();
            notifyTransaction(context3.mailAddr, "eos", context3.feeTrxId, context3.feeBlockNum, context3.trxId, context3.blockNum, function() {
              notifySuccess("Transaction to transfer the collateral is pushed! Pending to list on the orderbook.");
              var order = {
                price: context0.price,
                basePlatform: context0.basePlatform,
                baseCryptocurrency: context0.baseCryptocurrency,
                baseAmount: context0.baseAmountTmp,
                accuBaseAmountTraded: 0,
                termPlatform: context0.termPlatform,
                termCryptocurrency: context0.termCryptocurrency,
                termAmount: context0.termAmountTmp,
                termCurrentAmount: context0.termAmountTmp,
                currentAllowedTimesToTransfer: context0.currentAllowedTimesToTransfer,
                expiration: context0.expiration,
                baseAccount: context0.baseAccount,
                trxId: context0.trxId,
                blockNum: context0.blockNum,
                feeTrxId: context0.feeTrxId,
                feeBlockNum: context0.feeBlockNum,
                modificationFeeTrxId: null,
                modificationFeeBlockNum: null,
                cancellationFeeTrxId: null,
                cancellationFeeBlockNum: null,
                mailAddr: context0.mailAddr,
                state: "PO"
              };
              storeAddedOrder(order);
              renderAddedOrder(order)
            })
          } catch (e) {
            notifyError("Caught exception while sending transaction(EOS platform): " + e);
            if (e instanceof window.eosjs_jsonrpc.RpcError) {
              notifyError(JSON.stringify(e.json, null, 2))
            }
          }
        })()
      } catch (e) {
        notifyError("Caught exception while sending transaction(EOS platform): " + e);
        if (e instanceof window.eosjs_jsonrpc.RpcError) {
          notifyError(JSON.stringify(e.json, null, 2))
        }
      }
    })()
  }).catch(error => {
    notifyError("Scatter.getIdentity: " + error)
  })
};
window.platforms["eos"].modifyOrder = function(feeAmount, platformCurrency, memo, oldTrxId, oldBlockNum, basePlatform, baseAccount, baseCryptocurrency, baseAmount, price, currentAllowedTimesToTransfer, expiration, baseAmountTmp) {
  if (!window.dexEosLibsLoaded) return;
  var context = {
    that: this,
    feeAmount: feeAmount,
    platformCurrency: platformCurrency,
    memo: memo,
    feeTrxId: null,
    feeBlockNum: null,
    oldTrxId: oldTrxId,
    oldBlockNum: oldBlockNum,
    basePlatform: basePlatform,
    baseAccount: baseAccount,
    baseCryptocurrency: baseCryptocurrency,
    baseAmount: baseAmount,
    baseAmountTmp: baseAmountTmp,
    price: price,
    currentAllowedTimesToTransfer: currentAllowedTimesToTransfer,
    expiration: expiration
  };
  const requiredFields = {
    accounts: [window.network]
  };
  window.scatter.getIdentity(requiredFields).then(() => {
    var context2 = context;
    const account = window.scatter.identity.accounts.find(x => x.blockchain === "eos");
    (async () => {
      try {
        const result = await window.eos_api.transact({
          actions: [{
            account: "eosio.token",
            name: "transfer",
            authorization: [{
              actor: account.name,
              permission: account.authority,
            }],
            data: {
              from: account.name,
              to: context2.that.feeRecipient,
              quantity: context2.feeAmount + " " + context2.platformCurrency,
              memo: "U:" + context2.memo
            }
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        notifySuccess("Transaction to modify the order is pushed! Pending to update on the orderbook.");
        context2.feeTrxId = result.transaction_id;
        var context3 = context2;
        var funcTmp = async function() {
          while (!context3.feeBlockNum) {
            await new Promise(resolve => setTimeout(resolve, context3.that.checkBlockInterval));
            const res = await window.eos_rpc.history_get_transaction(context3.feeTrxId);
            if (res != null && typeof res.trx != "undefined" && typeof res.trx.receipt != "undefined" && typeof res.trx.receipt.status == "string" && res.trx.receipt.status == "executed" && typeof res.block_num != "undefined" && Number.isInteger(res.block_num)) {
              context3.feeBlockNum = res.block_num;
              break
            }
          }
        };
        await funcTmp();
        notifyTransactionForModification("eos", context2.feeTrxId, context2.feeBlockNum, function() {
          var order = {
            price: context3.price,
            basePlatform: context3.basePlatform,
            baseCryptocurrency: context3.baseCryptocurrency,
            baseAmount: context3.baseAmountTmp,
            accuBaseAmountTraded: 0,
            currentAllowedTimesToTransfer: context3.currentAllowedTimesToTransfer,
            expiration: context3.expiration,
            baseAccount: context3.baseAccount,
            oldTrxId: context3.oldTrxId,
            oldBlockNum: context3.oldBlockNum,
            modificationFeeTrxId: context3.feeTrxId,
            modificationFeeBlockNum: context3.feeBlockNum,
            state: "PU"
          };
          storeUpdatedOrder(order);
          renderUpdatedOrder(order)
        })
      } catch (e) {
        notifyError("Caught exception while sending transaction(EOS platform): " + e);
        if (e instanceof window.eosjs_jsonrpc.RpcError) {
          notifyError(JSON.stringify(e.json, null, 2))
        }
      }
    })()
  }).catch(error => {
    notifyError("Scatter.getIdentity: " + error)
  })
};
window.platforms["eos"].cancelOrder = function(feeAmount, platformCurrency, memo, oldTrxId, oldBlockNum) {
  if (!window.dexEosLibsLoaded) return;
  var context = {
    that: this,
    feeAmount: feeAmount,
    platformCurrency: platformCurrency,
    memo: memo,
    feeTrxId: null,
    feeBlockNum: null,
    oldTrxId: oldTrxId,
    oldBlockNum: oldBlockNum
  };
  const requiredFields = {
    accounts: [window.network]
  };
  window.scatter.getIdentity(requiredFields).then(() => {
    var context2 = context;
    const account = window.scatter.identity.accounts.find(x => x.blockchain === "eos");
    (async () => {
      try {
        const result = await window.eos_api.transact({
          actions: [{
            account: "eosio.token",
            name: "transfer",
            authorization: [{
              actor: account.name,
              permission: account.authority,
            }],
            data: {
              from: account.name,
              to: context2.that.feeRecipient,
              quantity: context2.feeAmount + " " + context2.platformCurrency,
              memo: "C:" + context2.memo
            }
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        notifySuccess("Transaction to cancel the order is pushed! Pending to remove the order from the orderbook.");
        context2.feeTrxId = result.transaction_id;
        var context3 = context2;
        var funcTmp = async function() {
          while (!context3.feeBlockNum) {
            await new Promise(resolve => setTimeout(resolve, context3.that.checkBlockInterval));
            const res = await window.eos_rpc.history_get_transaction(context3.feeTrxId);
            if (res != null && typeof res.trx != "undefined" && typeof res.trx.receipt != "undefined" && typeof res.trx.receipt.status == "string" && res.trx.receipt.status == "executed" && typeof res.block_num != "undefined" && Number.isInteger(res.block_num)) {
              context3.feeBlockNum = res.block_num;
              break
            }
          }
        };
        await funcTmp();
        notifyTransactionForCancellation("eos", context2.feeTrxId, context2.feeBlockNum, function() {
          storeRemovedOrder(context3.oldTrxId, context3.oldBlockNum, context3.feeTrxId, context3.feeBlockNum);
          renderUpdatedState(context3.oldTrxId, "Pending(C)")
        })
      } catch (e) {
        notifyError("Caught exception while sending transaction(EOS platform): " + e);
        if (e instanceof window.eosjs_jsonrpc.RpcError) {
          notifyError(JSON.stringify(e.json, null, 2))
        }
      }
    })()
  }).catch(error => {
    notifyError("Scatter.getIdentity: " + error)
  })
};
window.platforms["eth"].checkBlockInterval = 20000;
window.platforms["eth"].latestContext = null;
window.platforms["eth"].notifications = [];
window.platforms["eth"].getSmartContract = function(cryptocurrency) {
  if (typeof this.cryptocurrencies[cryptocurrency] != "undefined") {
    return this.cryptocurrencies[cryptocurrency].smartContract.toLowerCase()
  } else if (cryptocurrency == "ETH") {
    return "ETH"
  }
  return null
};
window.platforms["eth"].getActionName = function(cryptocurrency) {
  var actionName = null;
  if (typeof this.cryptocurrencies[cryptocurrency] != "undefined") {
    actionName = this.cryptocurrencies[cryptocurrency].actionName
  } else if (cryptocurrency == "ETH") {
    actionName = []
  }
  return actionName
};
window.platforms["eth"].getPlatformCurrency = function() {
  return "ETH"
};
window.platforms["eth"].getFeeAmountRequired = function() {
  return this.feeAmountRequired * 2.0
};
window.platforms["eth"].getFeeAmountRequiredForOperation = function() {
  return this.feeAmountRequired
};
window.platforms["eth"].makeAmountAccurate = function(currency, amount) {
  if (typeof this.cryptocurrencies[currency] != "undefined") {
    if (this.cryptocurrencies[currency].accuracy > 0) {
      return Math.round(amount * Math.pow(10, this.cryptocurrencies[currency].accuracy)) + ""
    } else if (this.cryptocurrencies[currency].accuracy < 0) {
      return amount.toFixed(Math.abs(this.cryptocurrencies[currency].accuracy))
    } else {
      return Math.round(amount) + ""
    }
  } else if (currency == "ETH") {
    return Math.round(amount * 1e18) + ""
  }
  return null
};
window.platforms["eth"].getGasPrice = function() {
  return new Promise((resolve, reject) => {
    window.eth_api.eth.getGasPrice((err, data) => {
      if (err) reject(err);
      else resolve(parseInt(data))
    })
  })
};
window.platforms["eth"].estimateGas = function(txOptions) {
  return new Promise((resolve, reject) => {
    window.eth_api.eth.estimateGas(txOptions, (err, data) => {
      if (err) reject(err);
      else resolve(data)
    })
  })
};
window.platforms["eth"].checkBlock = function(context, callback) {
  $.ajax({
    type: "GET",
    url: ethReceiptUrl + window.eth_api.givenProvider.selectedAddress,
    contentType: "application/json; charset=utf-8",
    success: function(data) {
      (async () => {
        if (typeof data.result != "undefined") {
          var result = data.result;
          if (Array.isArray(result)) {
            for (var i in result) {
              var receipt = result[i];
              if (receipt.from.toLowerCase() == window.eth_api.givenProvider.selectedAddress.toLowerCase() && receipt.to.toLowerCase() == context.that.exchange.toLowerCase()) {
                var memo = window.eth_api.utils.toUtf8(result[i].input).split(":");
                var nonce = memo[memo.length - 1];
                if (context.nonce == nonce) {
                  if (receipt.blockNumber) {
                    context.feeTrxId = receipt.hash;
                    context.feeBlockNum = parseInt(receipt.blockNumber)
                  }
                  break
                }
              }
            }
            if (!context.feeBlockNum) {
              await new Promise(resolve => setTimeout(resolve, context.that.checkBlockInterval));
              context.that.checkBlock(context, callback)
            } else {
              callback(context)
            }
          }
        }
      })()
    },
    error: function(request, status, error) {
      setTimeout(function() {
        context.that.checkBlock(context, callback)
      }, context.that.checkBlockInterval)
    }
  })
};

function notifyOrderbook() {
  for (var i in window.platforms["eth"].notifications) {
    var notification = window.platforms["eth"].notifications[i];
    var context = notification.context;
    if (!notification.done) {
      if (context.mode == "sendOrder") {
        context.that.checkBlock(context, function(ctx) {
          var notification2 = window.platforms["eth"].notifications[ctx.nonce];
          if (!notification2.done) {
            notifyTransaction(ctx.mailAddr, "eth", ctx.feeTrxId, ctx.feeBlockNum, ctx.trxId, ctx.blockNum, function() {
              notifySuccess("Transaction to pay for the fee is pushed! Pending to list on the orderbook.");
              var order = {
                price: ctx.price,
                basePlatform: ctx.basePlatform,
                baseCryptocurrency: ctx.baseCryptocurrency,
                baseAmount: ctx.baseAmountTmp,
                accuBaseAmountTraded: 0,
                termPlatform: ctx.termPlatform,
                termCryptocurrency: ctx.termCryptocurrency,
                termAmount: ctx.termAmountTmp,
                termCurrentAmount: ctx.termAmountTmp,
                currentAllowedTimesToTransfer: ctx.currentAllowedTimesToTransfer,
                expiration: ctx.expiration,
                baseAccount: ctx.baseAccount,
                trxId: ctx.trxId,
                blockNum: ctx.blockNum,
                feeTrxId: ctx.feeTrxId,
                feeBlockNum: ctx.feeBlockNum,
                modificationFeeTrxId: null,
                modificationFeeBlockNum: null,
                cancellationFeeTrxId: null,
                cancellationFeeBlockNum: null,
                mailAddr: ctx.mailAddr,
                state: "PO"
              };
              storeAddedOrder(order);
              renderAddedOrder(order)
            });
            notification2.done = true
          }
        })
      } else if (context.mode == "modifyOrder") {
        context.that.checkBlock(context, function(ctx) {
          var notification2 = window.platforms["eth"].notifications[ctx.nonce];
          if (!notification2.done) {
            notifyTransactionForModification("eth", ctx.feeTrxId, ctx.feeBlockNum, function() {
              notifySuccess("Transaction to modify the order is pushed! Pending to update on the orderbook.");
              var order = {
                price: ctx.price,
                basePlatform: ctx.basePlatform,
                baseCryptocurrency: ctx.baseCryptocurrency,
                baseAmount: ctx.baseAmountTmp,
                accuBaseAmountTraded: 0,
                currentAllowedTimesToTransfer: ctx.currentAllowedTimesToTransfer,
                expiration: ctx.expiration,
                baseAccount: ctx.baseAccount,
                oldTrxId: ctx.oldTrxId,
                oldBlockNum: ctx.oldBlockNum,
                modificationFeeTrxId: ctx.feeTrxId,
                modificationFeeBlockNum: ctx.feeBlockNum,
                state: "PU"
              };
              storeUpdatedOrder(order);
              renderUpdatedOrder(order)
            });
            notification2.done = true
          }
        })
      } else if (context.mode == "cancelOrder") {
        context.that.checkBlock(context, function(ctx) {
          var notification2 = window.platforms["eth"].notifications[ctx.nonce];
          if (!notification2.done) {
            notifyTransactionForCancellation("eth", ctx.feeTrxId, ctx.feeBlockNum, function() {
              notifySuccess("Transaction to cancel the order is pushed! Pending to remove the order from the orderbook.");
              storeRemovedOrder(ctx.oldTrxId, ctx.oldBlockNum, ctx.feeTrxId, ctx.feeBlockNum);
              renderUpdatedState(ctx.oldTrxId, "Pending(C)")
            });
            notification2.done = true
          }
        })
      }
    }
  }
};
window.platforms["eth"].sendOrder = async function(mailAddr, smartContract, actionName, termAmount, termCryptocurrency, feeAmount, platformCurrency, memo, basePlatform, baseAccount, baseCryptocurrency, baseAmount, termPlatform, price, currentAllowedTimesToTransfer, expiration, baseAmountTmp, termAmountTmp) {
  if (!window.dexEthLibsLoaded) return;
  var context = {
    mode: "sendOrder",
    that: this,
    mailAddr: mailAddr,
    smartContract: smartContract,
    actionName: actionName,
    termAmount: termAmount,
    termAmountTmp: termAmountTmp,
    termCryptocurrency: termCryptocurrency,
    feeAmount: feeAmount,
    platformCurrency: platformCurrency,
    memo: "O:" + memo,
    trxId: null,
    blockNum: null,
    feeTrxId: null,
    feeBlockNum: null,
    basePlatform: basePlatform,
    baseAccount: baseAccount,
    baseCryptocurrency: baseCryptocurrency,
    baseAmount: baseAmount,
    baseAmountTmp: baseAmountTmp,
    termPlatform: termPlatform,
    price: price,
    currentAllowedTimesToTransfer: currentAllowedTimesToTransfer,
    expiration: expiration
  };
  if (context.smartContract == "ETH") {
    window.eth_api.eth.sendTransaction({
      from: window.eth_api.givenProvider.selectedAddress,
      to: this.exchange,
      value: termAmount
    }).then(async function(receipt) {
      var context2 = context;
      context.trxId = receipt.transactionHash;
      context.blockNum = receipt.blockNumber;
      notifySuccess("Transaction to transfer the collateral is pushed!");
      var funcTmp = async function() {
        var context3 = context2;
        while (!context2.blockNum) {
          await new Promise(resolve => setTimeout(resolve, context2.that.checkBlockInterval));
          const result = await window.eth_api.eth.getTransaction(context2.trxId);
          if (result.blockNumber) {
            context2.blockNum = result.blockNumber;
            break
          }
        }
        var nonce = generateNonce();
        context2.nonce = nonce;
        context2.that.notifications[nonce] = {
          context: context2,
          done: false
        };
        var params = {
          from: window.eth_api.givenProvider.selectedAddress,
          to: context2.that.feeRecipient,
          value: context2.feeAmount,
          data: window.eth_api.utils.toHex(context2.memo + ":" + nonce)
        };
        params.gas = await context2.that.estimateGas(params);
        window.eth_api.eth.sendTransaction(params);
        await new Promise(resolve => setTimeout(resolve, context2.that.checkBlockInterval));
        notifyOrderbook()
      };
      await funcTmp()
    }).catch(err => {
      notifyError("Error while sending transaction(ETH platform): ", err)
    })
  } else {
    var contract = new window.eth_api.eth.Contract(actionName, smartContract);
    await contract.methods.transfer(this.exchange, termAmount).send({
      from: window.eth_api.givenProvider.selectedAddress
    }).on("receipt", async function(receipt) {
      var context2 = context;
      context.trxId = receipt.transactionHash;
      context.blockNum = receipt.blockNumber;
      notifySuccess("Transaction to transfer the collateral is pushed!");
      var funcTmp = async function() {
        var context3 = context2;
        while (!context2.blockNum) {
          await new Promise(resolve => setTimeout(resolve, context2.that.checkBlockInterval));
          const result = await window.eth_api.eth.getTransaction(context2.trxId);
          if (result.blockNumber) {
            context2.blockNum = result.blockNumber;
            break
          }
        }
        var nonce = generateNonce();
        context2.nonce = nonce;
        context2.that.notifications[nonce] = {
          context: context2,
          done: false
        };
        var params = {
          from: window.eth_api.givenProvider.selectedAddress,
          to: context2.that.feeRecipient,
          value: context2.feeAmount,
          data: window.eth_api.utils.toHex(context2.memo + ":" + nonce)
        };
        params.gas = await context2.that.estimateGas(params);
        window.eth_api.eth.sendTransaction(params);
        await new Promise(resolve => setTimeout(resolve, context2.that.checkBlockInterval));
        notifyOrderbook()
      };
      await funcTmp()
    }).on("error", function(err) {
      notifyError("Error while sending transaction(ETH platform): ", err)
    })
  }
};
window.platforms["eth"].modifyOrder = async function(feeAmount, platformCurrency, memo, oldTrxId, oldBlockNum, basePlatform, baseAccount, baseCryptocurrency, baseAmount, price, currentAllowedTimesToTransfer, expiration, baseAmountTmp) {
  if (!window.dexEthLibsLoaded) return;
  var context = {
    mode: "modifyOrder",
    that: this,
    feeAmount: feeAmount,
    platformCurrency: platformCurrency,
    memo: "U:" + memo,
    feeTrxId: null,
    feeBlockNum: null,
    oldTrxId: oldTrxId,
    oldBlockNum: oldBlockNum,
    basePlatform: basePlatform,
    baseAccount: baseAccount,
    baseCryptocurrency: baseCryptocurrency,
    baseAmount: baseAmount,
    baseAmountTmp: baseAmountTmp,
    price: price,
    currentAllowedTimesToTransfer: currentAllowedTimesToTransfer,
    expiration: expiration
  };
  var nonce = generateNonce();
  context.nonce = nonce;
  this.notifications[nonce] = {
    context: context,
    done: false
  };
  var params = {
    from: window.eth_api.givenProvider.selectedAddress,
    to: this.feeRecipient,
    value: feeAmount,
    data: window.eth_api.utils.toHex(context.memo + ":" + nonce)
  };
  params.gas = await this.estimateGas(params);
  window.eth_api.eth.sendTransaction(params);
  await new Promise(resolve => setTimeout(resolve, this.checkBlockInterval));
  notifyOrderbook()
};
window.platforms["eth"].cancelOrder = async function(feeAmount, platformCurrency, memo, oldTrxId, oldBlockNum) {
  if (!window.dexEthLibsLoaded) return;
  var context = {
    mode: "cancelOrder",
    that: this,
    feeAmount: feeAmount,
    platformCurrency: platformCurrency,
    memo: "C:" + memo,
    feeTrxId: null,
    feeBlockNum: null,
    oldTrxId: oldTrxId,
    oldBlockNum: oldBlockNum
  };
  var nonce = generateNonce();
  context.nonce = nonce;
  this.notifications[nonce] = {
    context: context,
    done: false
  };
  var params = {
    from: window.eth_api.givenProvider.selectedAddress,
    to: this.feeRecipient,
    value: feeAmount,
    data: window.eth_api.utils.toHex(context.memo + ":" + nonce)
  };
  params.gas = await this.estimateGas(params);
  window.eth_api.eth.sendTransaction(params);
  await new Promise(resolve => setTimeout(resolve, this.checkBlockInterval));
  notifyOrderbook()
};

function sendOrder() {
  var mailAddr = $("#mail_address").val();
  var basePlatform = $("#base_platform").val().toLowerCase();
  var baseAccount = $("#base_account").val();
  var baseCryptocurrency = $("#base_cryptocurrency").val().toUpperCase();
  var termPlatform = $("#term_platform").val().toLowerCase();
  var termCryptocurrency = $("#term_cryptocurrency").val().toUpperCase();
  if (mailAddr == "") {
    notifyError("The mail address should not be empty.");
    return
  }
  if (basePlatform == "") {
    notifyError("The base platform should not be empty.");
    return
  }
  if (typeof window.platforms[basePlatform] == "undefined") {
    notifyError("The base platform is not supported.");
    return
  }
  if (baseAccount == "") {
    notifyError("The base account(to whom the base cryptocurrency will be transferred) should not be empty.");
    return
  }
  if (baseCryptocurrency == "") {
    notifyError("The base cryptocurrency should not be empty.");
    return
  }
  if (termPlatform == "") {
    notifyError("The term platform should not be empty.");
    return
  }
  if (typeof window.platforms[termPlatform] == "undefined") {
    notifyError("The term platform is not supported.");
    return
  }
  if (termCryptocurrency == "") {
    notifyError("The term cryptocurrency should not be empty.");
    return
  }
  var basePlatformObj = window.platforms[basePlatform];
  var termPlatformObj = window.platforms[termPlatform];
  var smartContract = termPlatformObj.getSmartContract(termCryptocurrency);
  if (smartContract == null || smartContract == "") {
    notifyError("The smart contract doesn't exist.");
    return
  }
  var actionName = termPlatformObj.getActionName(termCryptocurrency);
  if (actionName == null) {
    notifyError("The action name doesn't exist.");
    return
  }
  if ($("#base_amount").val() == "" || isNaN($("#base_amount").val())) {
    notifyError("The amount of the base cryptocurrency should be a number.");
    return
  }
  var baseAmountTmp = parseFloat($("#base_amount").val());
  if (baseAmountTmp <= 0) {
    notifyError("The amount of the base cryptocurrency should be greater than zero.");
    return
  }
  var baseAmount = basePlatformObj.makeAmountAccurate(baseCryptocurrency, baseAmountTmp);
  if (baseAmount == null) {
    notifyError("The base cryptocurrency is not supported.");
    return
  }
  if ($("#term_amount").val() == "" || isNaN($("#term_amount").val())) {
    notifyError("The amount of the term cryptocurrency should be a number.");
    return
  }
  var termAmountTmp = parseFloat($("#term_amount").val());
  if (termAmountTmp <= 0) {
    notifyError("The amount of the term cryptocurrency should be greater than zero.");
    return
  }
  var termAmount = termPlatformObj.makeAmountAccurate(termCryptocurrency, termAmountTmp);
  if (termAmount == null) {
    notifyError("The term cryptocurrency is not supported.");
    return
  }
  var platformCurrency = termPlatformObj.getPlatformCurrency();
  if (platformCurrency == null) {
    notifyError("The platform currency doesn't exist.");
    return
  }
  if ($("#fee_amount").val() == "" || isNaN($("#fee_amount").val())) {
    notifyError("The fee should be a number.");
    return
  }
  var feeAmountTmp = parseFloat($("#fee_amount").val());
  var feeAmountRequired = termPlatformObj.getFeeAmountRequired();
  if (feeAmountTmp < feeAmountRequired) {
    notifyError("The fee shouldn't be less than " + feeAmountRequired + " " + platformCurrency + ".");
    return
  }
  var feeAmount = termPlatformObj.makeAmountAccurate(platformCurrency, feeAmountTmp);
  if ($("#order_expiration").val() == "" || isNaN($("#order_expiration").val())) {
    notifyError("The expiration of the order should be an integer.");
    return
  }
  var orderExpiration = Math.floor(parseInt($("#order_expiration").val())) * oneHour;
  if (orderExpiration < oneHour) {
    notifyError("The expiration of the order should be greater than or equal to one hour.");
    return
  }
  if (window.platforms[termPlatform].exchange == null || window.platforms[termPlatform].feeRecipient == null) {
    notifyError("The server side is not connected yet.");
    return
  }
  var expiration = Math.round(new Date().getTime() + orderExpiration);
  var memo = baseCryptocurrency + ":" + baseAmount + ":" + termCryptocurrency + ":" + termAmount + ":" + expiration + ":" + basePlatform + ":" + baseAccount;
  termPlatformObj.sendOrder(mailAddr, smartContract, actionName, termAmount, termCryptocurrency, feeAmount, platformCurrency, memo, basePlatform, baseAccount, baseCryptocurrency, baseAmount, termPlatform, termAmountTmp / baseAmountTmp, Math.round(feeAmountTmp / termPlatformObj.getFeeAmountRequiredForOperation()), expiration, baseAmountTmp, termAmountTmp)
};

function modifyOrder() {
  var oldTrxId = $("#trx_id").val();
  var oldBlockNum = $("#block_num").val();
  var basePlatform = $("#base_platform").val().toLowerCase();
  var baseAccount = $("#base_account").val();
  var baseCryptocurrency = $("#base_cryptocurrency").val().toUpperCase();
  var termPlatform = $("#term_platform").val().toLowerCase();
  var termCryptocurrency = $("#term_cryptocurrency").val().toUpperCase();
  var oldBasePlatform = $("#old_base_platform").val();
  var oldBaseCryptocurrency = $("#old_base_cryptocurrency").val();
  var termPlatformObj = window.platforms[termPlatform];
  if (basePlatform == "") {
    notifyError("The base platform should not be empty.");
    return
  }
  if (typeof window.platforms[basePlatform] == "undefined") {
    notifyError("The base platform is not supported.");
    return
  }
  if (baseAccount == "") {
    notifyError("The base account(to whom the base cryptocurrency will be transferred) should not be empty.");
    return
  }
  if (baseCryptocurrency == "") {
    notifyError("The base cryptocurrency should not be empty.");
    return
  }
  if ($("#base_amount").val() == "" || isNaN($("#base_amount").val())) {
    notifyError("The amount of the base cryptocurrency should be a number.");
    return
  }
  var baseAmountTmp = parseFloat($("#base_amount").val());
  if (baseAmountTmp <= 0) {
    notifyError("The amount of the base cryptocurrency should be greater than zero.");
    return
  }
  var basePlatformObj = window.platforms[basePlatform];
  var termPlatformObj = window.platforms[termPlatform];
  var baseAmount = basePlatformObj.makeAmountAccurate(baseCryptocurrency, baseAmountTmp);
  if (baseAmount == null) {
    notifyError("The base cryptocurrency is not supported.");
    return
  }
  var termAmountTmp = parseFloat($("#term_amount").val());
  var platformCurrency = termPlatformObj.getPlatformCurrency();
  if (platformCurrency == null) {
    notifyError("The platform currency doesn't exist.");
    return
  }
  if ($("#fee_amount").val() == "" || isNaN($("#fee_amount").val())) {
    notifyError("The fee should be a number.");
    return
  }
  var feeAmountTmp = parseFloat($("#fee_amount").val());
  var feeAmountRequired = termPlatformObj.getFeeAmountRequiredForOperation();
  if (feeAmountTmp < feeAmountRequired) {
    notifyError("The fee shouldn't be less than " + feeAmountRequired + " " + platformCurrency + ".");
    return
  }
  var feeAmount = termPlatformObj.makeAmountAccurate(platformCurrency, feeAmountTmp);
  if ($("#order_expiration").val() == "" || isNaN($("#order_expiration").val())) {
    notifyError("The expiration of the order should be an integer.");
    return
  }
  var orderExpiration = Math.floor(parseInt($("#order_expiration").val())) * oneHour;
  if (orderExpiration < oneHour) {
    notifyError("The expiration of the order should be greater than or equal to one hour.");
    return
  }
  if (window.platforms[termPlatform].exchange == null || window.platforms[termPlatform].feeRecipient == null) {
    notifyError("The server side is not connected yet.");
    return
  }
  var expiration = Math.round(new Date().getTime() + orderExpiration);
  var memo = baseCryptocurrency + ":" + baseAmount + ":" + termCryptocurrency + ":" + oldBasePlatform + ":" + oldBaseCryptocurrency + ":" + oldTrxId + ":" + oldBlockNum + ":" + expiration + ":" + basePlatform + ":" + baseAccount;
  termPlatformObj.modifyOrder(feeAmount, platformCurrency, memo, oldTrxId, oldBlockNum, basePlatform, baseAccount, baseCryptocurrency, baseAmount, termAmountTmp / baseAmountTmp, Math.round(feeAmountTmp / feeAmountRequired), expiration, baseAmountTmp)
};

function cancelOrder() {
  var basePlatform = $("#old_base_platform").val();
  var baseCryptocurrency = $("#old_base_cryptocurrency").val();
  var termPlatform = $("#term_platform").val().toLowerCase();
  var termCryptocurrency = $("#term_cryptocurrency").val().toUpperCase();
  var expiration = new Date($("#old_expiration").val()).getTime();
  var trxId = $("#trx_id").val();
  var blockNum = $("#block_num").val();
  var termPlatformObj = window.platforms[termPlatform];
  if (expiration <= new Date().getTime()) {
    notifyError("The order has expired.");
    return
  }
  var platformCurrency = termPlatformObj.getPlatformCurrency();
  if (platformCurrency == null) {
    notifyError("The platform currency doesn't exist.");
    return
  }
  var feeAmount = termPlatformObj.makeAmountAccurate(platformCurrency, termPlatformObj.getFeeAmountRequiredForOperation());
  if (window.platforms[termPlatform].exchange == null || window.platforms[termPlatform].feeRecipient == null) {
    notifyError("The server side is not connected yet.");
    return
  }
  var memo = basePlatform + ":" + baseCryptocurrency + ":" + termCryptocurrency + ":" + trxId + ":" + blockNum;
  termPlatformObj.cancelOrder(feeAmount, platformCurrency, memo)
};

function storeMyOrders(orders) {
  var dexOrders = [];
  for (var i in orders) {
    var odr = orders[i];
    var order = {
      price: odr.price,
      basePlatform: odr.basePlatform,
      baseCryptocurrency: odr.baseCryptocurrency,
      baseAmount: odr.baseAmount,
      accuBaseAmountTraded: odr.baseAmount - odr.baseCurrentAmount,
      termPlatform: odr.termPlatform,
      termCryptocurrency: odr.termCryptocurrency,
      termAmount: odr.termAmount,
      termCurrentAmount: odr.termCurrentAmount,
      currentAllowedTimesToTransfer: odr.currentAllowedTimesToTransfer,
      expiration: odr.expiration,
      baseAccount: odr.baseAccount,
      trxId: odr.trxId,
      blockNum: odr.blockNum,
      feeTrxId: odr.feeTrxId,
      feeBlockNum: odr.feeBlockNum,
      modificationFeeTrxId: null,
      modificationFeeBlockNum: null,
      cancellationFeeTrxId: null,
      cancellationFeeBlockNum: null,
      mailAddr: odr.mailAddr,
      state: odr.state
    };
    dexOrders.push(order)
  }
  localStorage.dexOrders = JSON.stringify(dexOrders);
  return dexOrders
};

function storeAddedOrder(order) {
  var dexOrders = [];
  if (typeof localStorage.dexOrders != "undefined") {
    dexOrders = JSON.parse(localStorage.dexOrders)
  }
  dexOrders.push(order);
  localStorage.dexOrders = JSON.stringify(dexOrders)
};

function storeUpdatedOrder(order) {
  if (typeof localStorage.dexOrders != "undefined") {
    var dexOrders = JSON.parse(localStorage.dexOrders);
    for (var i in dexOrders) {
      var oldOrder = dexOrders[i];
      if (oldOrder.trxId == order.oldTrxId && oldOrder.blockNum == order.oldBlockNum) {
        oldOrder.price = order.price;
        oldOrder.basePlatform = order.basePlatform;
        oldOrder.baseCryptocurrency = order.baseCryptocurrency;
        oldOrder.baseAmount = order.baseAmount;
        oldOrder.accuBaseAmountTraded = order.accuBaseAmountTraded;
        oldOrder.currentAllowedTimesToTransfer = order.currentAllowedTimesToTransfer;
        oldOrder.expiration = order.expiration;
        oldOrder.baseAccount = order.baseAccount;
        oldOrder.modificationFeeTrxId = order.modificationFeeTrxId;
        oldOrder.modificationFeeBlockNum = order.modificationFeeBlockNum;
        oldOrder.state = order.state;
        localStorage.dexOrders = JSON.stringify(dexOrders);
        break
      }
    }
  }
};

function storeRemovedOrder(oldTrxId, oldBlockNum, cancellationFeeTrxId, cancellationFeeBlockNum) {
  if (typeof localStorage.dexOrders != "undefined") {
    var dexOrders = JSON.parse(localStorage.dexOrders);
    for (var i in dexOrders) {
      var oldOrder = dexOrders[i];
      if (oldOrder.trxId == oldTrxId && oldOrder.blockNum == oldBlockNum) {
        oldOrder.cancellationFeeTrxId = cancellationFeeTrxId;
        oldOrder.cancellationFeeBlockNum = cancellationFeeBlockNum;
        oldOrder.state = "PC";
        localStorage.dexOrders = JSON.stringify(dexOrders);
        break
      }
    }
  }
};

function requestDex() {
  var siteUrl = $("#dq_site_url").val();
  var ethFeeRecipient = $("#dq_eth_fee_recipient").val();
  var ethRecipient = $("#dq_eth_recipient").val();
  var ethFeeAmountRequiredTmp = $("#dq_eth_fee_required").val();
  var eosFeeRecipient = $("#dq_eos_fee_recipient").val();
  var eosRecipient = $("#dq_eos_recipient").val();
  var eosFeeAmountRequiredTmp = $("#dq_eos_fee_required").val();
  if (crd.mailAddr == "guest") {
    notifyError("You are now in the guest mode. You need to sign in first.");
    return
  }
  if (siteUrl == "") {
    notifyError("The site URL should not be empty.");
    return
  }
  if (ethFeeRecipient == "") {
    notifyError("The ETH fee recipient address should not be empty.");
    return
  }
  if (ethRecipient == "") {
    notifyError("The ETH collateral recipient address should not be empty.");
    return
  }
  if (ethFeeAmountRequiredTmp == "") {
    notifyError("The ETH fee amount should not be empty.");
    return
  }
  if (isNaN(ethFeeAmountRequiredTmp)) {
    notifyError("The ETH fee amount should be a number.");
    return
  }
  ethFeeAmountRequired = parseFloat(ethFeeAmountRequiredTmp);
  if (eosFeeRecipient == "") {
    notifyError("The EOS fee recipient account should not be empty.");
    return
  }
  if (eosRecipient == "") {
    notifyError("The EOS collateral recipient account should not be empty.");
    return
  }
  if (eosFeeAmountRequiredTmp == "") {
    notifyError("The EOS fee amount should not be empty.");
    return
  }
  if (isNaN(eosFeeAmountRequiredTmp)) {
    notifyError("The EOS fee amount should be a number.");
    return
  }
  eosFeeAmountRequired = parseFloat(eosFeeAmountRequiredTmp);
  sendDexRequest(crd.mailAddr, siteUrl, {
    ethFeeRecipient: ethFeeRecipient,
    ethRecipient: ethRecipient,
    ethFeeAmountRequired: ethFeeAmountRequired,
    eosFeeRecipient: eosFeeRecipient,
    eosRecipient: eosRecipient,
    eosFeeAmountRequired: eosFeeAmountRequired
  })
};

function requestListing() {
  var chainName = $("#lq_chain_name").val().toLowerCase();
  var cryptocurrency = $("#lq_cryptocurrency").val().toUpperCase();
  var smartContract = $("#lq_smart_contract").val();
  var actionName = $("#lq_action_name").val();
  var accuracyTmp = $("#lq_accuracy").val();
  if (chainName == "") {
    notifyError("The chain name should not be empty.");
    return
  }
  if (chainName != "eth" && chainName != "eos") {
    notifyError("The chain is not supported.");
    return
  }
  if (cryptocurrency == "") {
    notifyError("The cryptocurrency should not be empty.");
    return
  }
  if (smartContract == "") {
    notifyError("The smart contract should not be empty.");
    return
  }
  if (actionName == "") {
    notifyError("The action name(or ABI) should not be empty.");
    return
  }
  if (accuracyTmp == "") {
    notifyError("The accuracy should not be empty.");
    return
  }
  if (isNaN(accuracyTmp)) {
    notifyError("The accuracy should be a number.");
    return
  }
  if (parseFloat(accuracyTmp) < 0) {
    notifyError("The accuracy should not be less than zero.");
    return
  }
  accuracy = Math.round(Math.log10(parseFloat(accuracyTmp)));
  if (crd.mailAddr == "guest") {
    notifyError("You are now in the guest mode. You need to sign in first.");
    return
  }
  sendListingRequest(chainName, cryptocurrency, smartContract, actionName, accuracy, crd.mailAddr)
};

function changeCrossPlatforms(basePlatform, termPlatform) {
  if (typeof basePlatform == "undefined" || typeof termPlatform == "undefined") {
    return
  }
  $("#base_platform").val(basePlatform);
  $("#term_platform").val(termPlatform);
  $("#" + currentPanel).removeClass("active");
  if (basePlatform + "_" + termPlatform == "eth_eth") {
    $("#menuitem_eth_eth").addClass("active");
    currentPanel = "menuitem_eth_eth"
  }
  if (basePlatform + "_" + termPlatform == "eos_eos") {
    $("#menuitem_eos_eos").addClass("active");
    currentPanel = "menuitem_eos_eos"
  }
  if (basePlatform + "_" + termPlatform == "eth_eos") {
    $("#menuitem_eth_eos").addClass("active");
    currentPanel = "menuitem_eth_eos"
  }
  if (basePlatform + "_" + termPlatform == "eos_eth") {
    $("#menuitem_eos_eth").addClass("active");
    currentPanel = "menuitem_eos_eth"
  }
  $("#crypto_platform").text("for TestNet: " + basePlatform.toUpperCase() + " (Base) X " + termPlatform.toUpperCase() + " (Term)");
  if (basePlatform == "eth") {
    $("#base_cryptocurrency_search").attr("placeholder", "Base Cryptocurrency(ETH)");
    $("#base_cryptocurrency").attr("placeholder", "Base Cryptocurrency(ETH)");
    $("#base_account").attr("placeholder", "Recipient's Address")
  } else {
    $("#base_cryptocurrency_search").attr("placeholder", "Base Cryptocurrency(EOS)");
    $("#base_cryptocurrency").attr("placeholder", "Base Cryptocurrency(EOS)");
    $("#base_account").attr("placeholder", "Recipient's Account")
  }
  if (termPlatform == "eth") {
    $("#term_cryptocurrency_search").attr("placeholder", "Term Cryptocurrency(ETH)");
    $("#term_cryptocurrency").attr("placeholder", "Term Cryptocurrency(ETH)")
  } else {
    $("#term_cryptocurrency_search").attr("placeholder", "Term Cryptocurrency(EOS)");
    $("#term_cryptocurrency").attr("placeholder", "Term Cryptocurrency(EOS)")
  }
  $("#fee_amount").attr("placeholder", "Amount (Unit: " + termPlatform.toUpperCase() + ")");
  $("#section_chains").show();
  $("#section_listing_request").hide();
  $("#section_dex_request").hide();
  $("#section_market_cap").hide();
  $("#section_setting").hide();
  $("#data_ticker").show()
};

function renderCryptocurrencies(cryptocurrencies) {
  if (cryptocurrencies.length == 0) {
    $("#crypto_dex_listing_req_div").hide();
    $("#crypto_dex_listing_req").DataTable().clear().draw();
    return
  }
  $("#crypto_dex_listing_req_div").show();
  $("#crypto_dex_listing_req").DataTable().clear().draw();
  for (var i in cryptocurrencies) {
    var cryptocurrency = cryptocurrencies[i];
    if (!cryptocurrency.cryptocurrencyKey) continue;
    var accuracy = null;
    if (cryptocurrency.platform) {
      if (cryptocurrency.accuracy > 0) {
        accuracy = "1e" + cryptocurrency.accuracy
      } else if (cryptocurrency.accuracy < 0) {
        accuracy = parseFloat(Math.pow(10, cryptocurrency.accuracy).toFixed(Math.abs(cryptocurrency.accuracy))) + ""
      } else {
        accuracy = "0"
      }
    }
    var ccState = null;
    if (cryptocurrency.ccState) {
      if (cryptocurrency.ccState == "P") {
        ccState = "Pending"
      } else if (cryptocurrency.ccState == "A") {
        ccState = "Approved"
      } else if (cryptocurrency.ccState == "R") {
        ccState = "Rejected"
      }
    }
    $("#crypto_dex_listing_req").DataTable().row.add([cryptocurrency.cryptocurrencyKey, !cryptocurrency.platform ? "" : cryptocurrency.platform, !cryptocurrency.cryptocurrency ? "" : cryptocurrency.cryptocurrency, !cryptocurrency.smartContract ? "" : cryptocurrency.smartContract, !cryptocurrency.actionName ? "" : cryptocurrency.actionName, !accuracy ? "" : accuracy, !cryptocurrency.mailAddr ? "" : cryptocurrency.mailAddr, !ccState ? "" : ccState, 0]).draw(false)
  }
};

function loadCryptocurrencies() {
  getCryptocurrencies("NR").then(function(cryptocurrencies) {
    renderCryptocurrencies(cryptocurrencies)
  }).catch(function() {})
};

function showListingRequest() {
  $("#" + currentPanel).removeClass("active");
  $("#menuitem_listing_request").addClass("active");
  currentPanel = "menuitem_listing_request";
  $("#crypto_platform").text("for Coin Founders");
  $("#section_chains").hide();
  $("#section_listing_request").show();
  $("#section_dex_request").hide();
  $("#section_market_cap").hide();
  $("#section_setting").hide();
  $("#data_ticker").hide();
  loadCryptocurrencies()
};

function renderDex(dex) {
  if (dex.length == 0) {
    $("#crypto_dex_req_div").hide();
    $("#crypto_dex_req").DataTable().clear().draw();
    return
  }
  $("#crypto_dex_req_div").show();
  $("#crypto_dex_req").DataTable().clear().draw();
  for (var i in dex) {
    var dx = dex[i];
    var state = null;
    if (dx.dState) {
      if (dx.dState == "P") {
        state = "Pending"
      } else if (dx.dState == "A") {
        state = "Approved"
      } else if (dx.dState == "R") {
        state = "Rejected"
      }
    }
    $("#crypto_dex_req").DataTable().row.add([dx.contactId, !dx.mailAddr ? "" : dx.mailAddr, !dx.siteUrl ? "" : dx.siteUrl, !dx.ethFeeRecipient ? "" : dx.ethFeeRecipient, !dx.ethRecipient ? "" : dx.ethRecipient, !dx.ethFeeAmountRequired ? "" : dx.ethFeeAmountRequired, !dx.eosFeeRecipient ? "" : dx.eosFeeRecipient, !dx.eosRecipient ? "" : dx.eosRecipient, !dx.eosFeeAmountRequired ? "" : dx.eosFeeAmountRequired, !state ? "" : state, dx.connected ? "o" : "x", 0]).draw(false)
  }
};

function loadDex() {
  getDex("NR").then(function(dex) {
    renderDex(dex)
  }).catch(function() {})
};

function showDexRequest() {
  $("#" + currentPanel).removeClass("active");
  $("#menuitem_dex_request").addClass("active");
  currentPanel = "menuitem_dex_request";
  $("#crypto_platform").text("for Coin Institutions");
  $("#section_chains").hide();
  $("#section_listing_request").hide();
  $("#section_dex_request").show();
  $("#section_market_cap").hide();
  $("#section_setting").hide();
  $("#data_ticker").hide();
  loadDex()
};

function showMarketCap() {
  $("#" + currentPanel).removeClass("active");
  $("#menuitem_market_cap").addClass("active");
  currentPanel = "menuitem_market_cap";
  $("#crypto_platform").text(" Data Ticker");
  $("#section_chains").hide();
  $("#section_listing_request").hide();
  $("#section_dex_request").hide();
  $("#section_market_cap").show();
  $("#section_setting").hide();
  $("#data_ticker").show()
};

function showSetting() {
  if (crd.mailAddr == "guest") {
    window.open("/login.html", "_self");
    return false
  }
  $("#" + currentPanel).removeClass("active");
  $("#crypto_platform").text(" Profile");
  $("#section_chains").hide();
  $("#section_listing_request").hide();
  $("#section_dex_request").hide();
  $("#section_market_cap").hide();
  $("#section_setting").show();
  $("#data_ticker").hide()
};

function genOrderBook(orders) {
  orders.sort(function(a, b) {
    return a.price - b.price
  });
  var bids = [];
  var asks = [];
  var highest = orders[orders.length - 1].price;
  var lowest = orders[0].price;
  var diff = highest - lowest;
  var group = priceNum - 1;
  var interval = diff / group;
  var interpolation = [];
  var step = lowest;
  interpolation.push(lowest);
  for (var i = 0; i < group - 1; i++) {
    step = step + interval;
    interpolation.push(step)
  }
  interpolation.push(highest);
  var interpolationLength = interpolation.length;
  var ordersLength = orders.length;
  var cursor = 0;
  var asksAccum = 0;
  for (var i = 0; i < interpolationLength - 1; i++) {
    for (var j = cursor; j < ordersLength; j++) {
      if (orders[j].orderType == "S") {
        if (orders[j].price > interpolation[i]) {
          cursor = j;
          break
        } else {
          asksAccum += orders[j].baseAmount;
          cursor = j + 1
        }
      }
    }
    asks.push(asksAccum)
  }
  for (var i = cursor; i < ordersLength; i++) {
    if (orders[i].orderType == "S") {
      asksAccum += orders[i].baseAmount
    }
  }
  asks.push(asksAccum);
  cursor = ordersLength - 1;
  var bidsAccum = 0;
  for (var i = interpolationLength - 2; i >= 0; i--) {
    for (var j = cursor; j >= 0; j--) {
      if (orders[j].orderType == "B") {
        if (orders[j].price <= interpolation[i]) {
          cursor = j;
          break
        } else {
          bidsAccum += orders[j].baseAmount;
          cursor = j - 1
        }
      }
    }
    bids.splice(0, 0, bidsAccum)
  }
  for (var i = cursor; i >= 0; i--) {
    if (orders[i].orderType == "B") {
      bidsAccum += orders[i].baseAmount
    }
  }
  bids.splice(0, 0, bidsAccum);
  return {
    interpolation: interpolation,
    asks: asks,
    bids: bids
  }
};

function renderMyOrders(orders) {
  $("#crypto_dex_myorders").DataTable().clear().draw();
  for (var i in orders) {
    var order = orders[i];
    var state = null;
    if (order.state == "O") {
      state = "Open"
    } else if (order.state == "M" || order.state == "P") {
      state = "Processing"
    } else if (order.state == "R") {
      state = "Refunded"
    } else if (order.state == "C") {
      state = "Cancelled"
    } else if (order.state == "D") {
      state = "Filled"
    } else if (order.state == "PO") {
      state = "Pending(O)"
    } else if (order.state == "PU") {
      state = "Pending(U)"
    } else if (order.state == "PC") {
      state = "Pending(C)"
    }
    $("#crypto_dex_myorders").DataTable().row.add([!order.price ? "" : order.price, (!order.basePlatform || !order.baseCryptocurrency) ? "" : (order.basePlatform + "." + order.baseCryptocurrency), !order.baseAmount ? "" : (order.accuBaseAmountTraded + " / " + order.baseAmount), (!order.termPlatform || !order.termCryptocurrency) ? "" : (order.termPlatform + "." + order.termCryptocurrency), !order.termAmount ? "" : (order.termCurrentAmount + " / " + order.termAmount), !order.currentAllowedTimesToTransfer ? "" : order.currentAllowedTimesToTransfer, !order.expiration ? "" : new Date(order.expiration), !order.baseAccount ? "" : order.baseAccount, !order.trxId ? "" : order.trxId, !order.blockNum ? "" : order.blockNum, !state ? "" : state]).draw(false)
  }
};

function renderMyTransactions(transactions) {
  var transactionsNum = transactions.length;
  var trxHtml = "";
  var dt = new Date().getTime();
  for (var i in transactions) {
    var transaction = transactions[i];
    var symbolName = null;
    var desc = null;
    if (transaction.state == "F") {
      symbolName = transaction.basePlatform + "." + transaction.baseCryptocurrency + "/" + transaction.termPlatform + "." + transaction.termCryptocurrency;
      desc = "Filled, price: " + transaction.price + ", volume: " + transaction.baseAmountTraded
    } else if (transaction.state == "R") {
      symbolName = transaction.termPlatform + "." + transaction.termCryptocurrency;
      desc = "Refunded, volume: " + transaction.termAmountTraded
    } else if (transaction.state == "C") {
      symbolName = transaction.termPlatform + "." + transaction.termCryptocurrency;
      desc = "Cancelled, volume: " + transaction.taseAmountTraded
    }
    trxHtml += '<li class="nav-item">' + '<a class="dropdown-item">' + '<span>' + '<span>' + symbolName + '</span>' + '<span class="time">' + Math.round((dt - transaction.time) / 60000) + 'min ago</span>' + '</span>' + '<span class="message">' + desc + '</span>' + '</a>' + '</li>'
  }
  $("#transactions_num").html(transactionsNum);
  $("#transactions_num").show();
  $("#transactions_list").html(trxHtml)
};

function loadMyOrders() {
  if (crd.mailAddr != "guest") {
    getMyOrders().then(function(orders) {
      if (orders.length > 0) {
        var dexOrders = storeMyOrders(orders);
        renderMyOrders(dexOrders);
        loadMyTransactions()
      }
    }).catch(function() {})
  } else if (crd.mailAddr == "guest") {
    var orders = [];
    if (typeof localStorage.dexOrders != "undefined") {
      orders = JSON.parse(localStorage.dexOrders)
    }
    if (orders.length > 0) {
      renderMyOrders(orders)
    }
  }
};

function loadMyTransactions() {
  if (crd.mailAddr != "guest") {
    getMyTransactions().then(function(transactions) {
      if (transactions.length > 0) {
        notifyNews("You have new messages.");
        renderMyTransactions(transactions);
        var orders = storeMyTransactions(transactions);
        renderMyOrders(orders)
      }
    }).catch(function() {})
  }
};

function renderAddedOrder(order) {
  $("#crypto_dex_myorders").DataTable().row.add([order.price, (order.basePlatform + "." + order.baseCryptocurrency), order.accuBaseAmountTraded + " / " + order.baseAmount, (order.termPlatform + "." + order.termCryptocurrency), order.termCurrentAmount + " / " + order.termAmount, order.currentAllowedTimesToTransfer, new Date(order.expiration), order.baseAccount, order.trxId, order.blockNum, "Pending(O)"]).draw(false)
};

function renderUpdatedOrder(order) {
  var table = $('#crypto_dex_myorders').DataTable();
  var tb = $('#crypto_dex_myorders').dataTable();
  table.columns().eq(0).each(function(index) {
    if (index == 8) {
      var column = table.column(index).data();
      for (var i in column) {
        var rowId = parseInt(i);
        if (column[i] == order.oldTrxId) {
          tb.fnUpdate(order.price, rowId, 0, false, false);
          tb.fnUpdate((order.basePlatform + "." + order.baseCryptocurrency), rowId, 1, false, false);
          tb.fnUpdate(order.accuBaseAmountTraded + " / " + order.baseAmount, rowId, 2, false, false);
          tb.fnUpdate(order.currentAllowedTimesToTransfer, rowId, 5, false, false);
          tb.fnUpdate(new Date(order.expiration), rowId, 6, false, false);
          tb.fnUpdate(order.baseAccount, rowId, 7, false, false);
          tb.fnUpdate("Pending(U)", rowId, 10, false, false);
          break
        }
      }
    }
  })
};

function renderUpdatedState(trxId, state) {
  var table = $('#crypto_dex_myorders').DataTable();
  var tb = $('#crypto_dex_myorders').dataTable();
  table.columns().eq(0).each(function(index) {
    if (index == 8) {
      var column = table.column(index).data();
      for (var i in column) {
        var rowId = parseInt(i);
        if (column[i] == trxId) {
          tb.fnUpdate(state, rowId, 10, false, false);
          break
        }
      }
    }
  })
};

function storeUpdatedState(state) {
  var trxId = null;
  if (typeof localStorage.dexOrders != "undefined") {
    var orders = JSON.parse(localStorage.dexOrders);
    for (var i in orders) {
      var order = orders[i];
      if (state.platform == order.termPlatform) {
        if (state.trxId == order.trxId && state.oldState == "PO") {
          order.state = "O";
          trxId = order.trxId;
          break
        } else if (state.trxId == order.modificationFeeTrxId && state.oldState == "PU") {
          order.state = "O";
          trxId = order.modificationFeeTrxId;
          break
        } else if (state.trxId == order.cancellationFeeTrxId && state.oldState == "PC") {
          order.state = "C";
          trxId = order.cancellationFeeTrxId;
          break
        }
      }
    }
    localStorage.dexOrders = JSON.stringify(orders)
  }
  return trxId
};

function storeMyTransactions(transactions) {
  var orders = [];
  if (typeof localStorage.dexOrders != "undefined") {
    orders = JSON.parse(localStorage.dexOrders);
    for (var i in transactions) {
      var transaction = transactions[i];
      for (var j in orders) {
        var order = orders[j];
        if (transaction.orderId == order.termPlatform + "-" + order.trxId) {
          if (transaction.state == "F") {
            order.accuBaseAmountTraded += transaction.baseAmountTraded;
            order.termCurrentAmount -= transaction.termAmountTraded;
            order.currentAllowedTimesToTransfer--;
            if (order.termCurrentAmount == 0) {
              order.state = "D"
            }
          } else if (transaction.state == "R") {
            order.currentAllowedTimesToTransfer--;
            order.state = "R"
          } else if (transaction.state == "C") {
            order.currentAllowedTimesToTransfer--;
            order.state = "C"
          }
          break
        }
      }
    }
    localStorage.dexOrders = JSON.stringify(orders)
  }
  return orders
};

function refreshOrderState() {
  if (typeof localStorage.dexOrders != "undefined") {
    var orders = JSON.parse(localStorage.dexOrders);
    for (var i in orders) {
      var order = orders[i];
      var platform = order.termPlatform;
      var trxId = null;
      var oldState = order.state;
      if (oldState == "PO") {
        trxId = order.trxId
      } else if (oldState == "PU") {
        trxId = order.modificationFeeTrxId
      } else if (oldState == "PC") {
        trxId = order.cancellationFeeTrxId
      } else {
        continue
      }
      getOrderState(platform, trxId, oldState).then((state) => {
        if (state.state == "O") {
          var transactionId = storeUpdatedState(state);
          if (transactionId != null) {
            var newState = null;
            if (state.oldState == "PO") {
              newState = "Open"
            } else if (state.oldState == "PU") {
              newState = "Open"
            } else if (state.oldState == "PC") {
              newState = "Cancelled"
            }
            renderUpdatedState(transactionId, newState);
            notifySuccess("Your transaction pushed has been confirmed by the server side.")
          }
        }
      }).catch(() => {})
    }
  }
};

function renderUpdatedDexReq(rowId, state) {
  var tb = $('#crypto_dex_req').dataTable();
  tb.fnUpdate(state, rowId, 9, false, false)
};

function renderUpdatedListingReq(rowId, state) {
  var tb = $('#crypto_dex_listing_req').dataTable();
  tb.fnUpdate(state, rowId, 7, false, false)
};

function getOrdersTrades(bNotify) {
  var basePlatform = $("#base_platform").val();
  var baseCryptocurrency = $("#base_cryptocurrency_search").val();
  var termPlatform = $("#term_platform").val();
  var termCryptocurrency = $("#term_cryptocurrency_search").val();
  if (basePlatform != "" && baseCryptocurrency != "" && termPlatform != "" && termCryptocurrency != "" && typeof window.platforms[basePlatform].cryptocurrencies[baseCryptocurrency] != "undefined" && typeof window.platforms[termPlatform].cryptocurrencies[termCryptocurrency] != "undefined") {
    getOrders(basePlatform, baseCryptocurrency, termPlatform, termCryptocurrency).then(function(orders) {
      $("#base_cryptocurrency").val(baseCryptocurrency);
      $("#term_cryptocurrency").val(termCryptocurrency);
      if (orders.length <= 0) {
        lineChart.data.labels = initLabelsData;
        lineChart.data.datasets[0].data = initBidsData;
        lineChart.data.datasets[1].data = initAsksData;
        lineChart.update();
        return
      }
      var asksBids = genOrderBook(orders);
      lineChart.data.labels = asksBids.interpolation;
      lineChart.data.datasets[0].data = asksBids.bids;
      lineChart.data.datasets[1].data = asksBids.asks;
      lineChart.update()
    }).catch(function() {});
    getTrades(basePlatform, baseCryptocurrency, termPlatform, termCryptocurrency).then(function(trades) {
      if (trades.length <= 0) {
        chartPlotParams[0].data = initChartPlotData;
        chartPlotSettings.xaxis.min = initChartPlotData[0][0];
        chartPlotSettings.xaxis.max = initChartPlotData[initChartPlotData.length - 1][0];
        $.plot($("#chart_plot"), chartPlotParams, chartPlotSettings);
        return
      }
      var chartPlotData = [];
      var cursor = 0;
      var tradesLength = trades.length;
      trades.sort(function(a, b) {
        return a.updatedTime - b.updatedTime
      });
      var startTime = trades[0].updatedTime;
      var endTime = trades[tradesLength - 1].updatedTime;
      var step = (endTime - startTime) / (latestTradesLimit - 1);
      var prevPrice = 0;
      for (var i = 1; i <= latestTradesLimit; i++) {
        var price = 0;
        var cnt = 0;
        var time = startTime + i * step;
        for (var j = cursor; j < tradesLength; j++) {
          var trade = trades[j];
          if (trade.updatedTime < time) {
            price += trade.price;
            cnt++
          } else {
            cursor = j;
            break
          }
        }
        price = cnt > 0 ? price / cnt : prevPrice;
        chartPlotData.push([time, price]);
        prevPrice = price
      }
      var firstPrice = trades[0].price;
      var tradesLength = latestTradesLimit - trades.length;
      for (var i = 0; i < tradesLength; i++) {
        chartPlotData.splice(0, 0, [0, firstPrice])
      }
      chartPlotParams[0].data = chartPlotData;
      chartPlotSettings.xaxis.min = chartPlotData[0][0];
      chartPlotSettings.xaxis.max = chartPlotData[chartPlotData.length - 1][0];
      $.plot($("#chart_plot"), chartPlotParams, chartPlotSettings)
    }).catch(function() {})
  } else {
    if (bNotify) {
      notifyWarning("The pair of cryptocurrencies are not supported. Please check whether you have chosen the correct platforms, such as ETH x ETH, EOS x EOS, EOS x ETH, ETH x EOS.")
    }
  }
};

function refresh() {
  if (currentPanel == "menuitem_eth_eth" || currentPanel == "menuitem_eos_eos" || currentPanel == "menuitem_eth_eos" || currentPanel == "menuitem_eos_eth") {
    loadMyTransactions();
    refreshOrderState();
    getOrdersTrades(false)
  } else if (currentPanel == "menuitem_listing_request") {
    loadCryptocurrencies()
  } else if (currentPanel == "menuitem_dex_request") {
    loadDex()
  }
  setTimeout(refresh, refreshInterval)
};

function logout() {
  $("#show_orders").prop("disabled", true);
  $("#new_order").prop("disabled", true);
  $("#send_order").prop("disabled", true);
  $("#modify_order").prop("disabled", true);
  $("#dex_logout").prop("disabled", true);
  if (typeof window.scatter != "undefined" && window.scatter != null) {
    window.scatter.logout();
    delete window.dexEosLibsLoaded;
    delete window.scatter;
    delete window.eosjs_jsonrpc;
    delete window.eos_rpc;
    delete window.eos_api;
    delete window.eosRpcUrl;
    delete window.chainId;
    delete window.scatterCore;
    delete window.scatterEos;
    delete window.eosRpc;
    delete window.eosApi
  }
  if (typeof window.eth_api != "undefined" && window.eth_api != null) {
    delete window.dexEthLibsLoaded;
    delete window.eth_api;
    delete window.web3Url
  }
  delete window.platforms;
  delete localStorage.dexOrders;
  delete localStorage.credential;
  window.open("/login.html", "_self");
  return false
};
var currentPanel = "menuitem_eth_eth";
var myOrdersTable = null;
var cryptocurrenciesTable = null;
var initChartPlotData = [];
initChartPlotData.push([new Date(Date.today().add(i).days()).getTime(), 1]);
for (var i = 1; i < latestTradesLimit; i++) {
  var previousData = initChartPlotData[initChartPlotData.length - 1][1];
  initChartPlotData.push([new Date(Date.today().add(i).days()).getTime(), previousData * 1.1])
}
var chartPlotSettings = {
  grid: {
    show: true,
    aboveData: true,
    color: "#888",
    backgroundColor: "#212b46",
    labelMargin: 10,
    axisMargin: 0,
    borderWidth: 0,
    borderColor: null,
    minBorderMargin: 5,
    clickable: true,
    hoverable: true,
    autoHighlight: true,
    mouseActiveRadius: 100
  },
  series: {
    lines: {
      show: true,
      fill: true,
      lineWidth: 2,
      steps: false
    },
    points: {
      show: true,
      radius: 4.5,
      symbol: "circle",
      lineWidth: 3.0
    }
  },
  legend: {
    position: "ne",
    margin: [0, -25],
    noColumns: 0,
    labelBoxBorderColor: null,
    labelFormatter: function(label, series) {
      return label + '&nbsp;&nbsp;';
    },
    width: 40,
    height: 1
  },
  colors: ["#96CA59", "#3F97EB", "#72c380", "#6f7a8a", "#f7cb38", "#5a8022", "#2c7282"],
  shadowSize: 0,
  tooltip: true,
  tooltipOpts: {
    content: "%s: %y.0",
    xDateFormat: "%d/%m",
    shifts: {
      x: -30,
      y: -50
    },
    defaultTheme: false
  },
  yaxis: {
    min: 0
  },
  xaxis: {
    mode: "time",
    minTickSize: [1, "day"],
    timeformat: "%h/%M",
    min: initChartPlotData[0][0],
    max: initChartPlotData[initChartPlotData.length - 1][0]
  }
};
var chartPlotParams = [{
  label: "Trades",
  data: initChartPlotData,
  lines: {
    fillColor: "rgba(150, 202, 89, 0.12)"
  },
  points: {
    fillColor: "#fff"
  }
}];
var initLabelsData = [];
var initAsksData = [];
var initBidsData = [];
initLabelsData.push(1);
initAsksData.push(1);
initBidsData.push(1);
for (var i = 2; i <= priceNum; i++) {
  initLabelsData.push(i);
  var previousData = initAsksData[initAsksData.length - 1];
  var currentData = previousData * 1.5;
  initAsksData.push(currentData);
  initBidsData.push(currentData)
}
initBidsData.sort(function(a, b) {
  return b - a
});
var chartCtx = document.getElementById("crypto_dex_orderbook");
var lineChart = null;

function main() {
  $("#base_platform").val("eth");
  $("#term_platform").val("eth");
  $("#crypto_platform").text("for ETH");
  $("#base_account").attr("placeholder", "Recipient's Address");
  $("#fee_amount").attr("placeholder", "Amount (Unit: ETH)");
  if (!$.fn.dataTable.isDataTable("#crypto_dex_myorders")) {
    myOrdersTable = $("#crypto_dex_myorders").DataTable({
      data: [],
      columns: [{
        title: "Price"
      }, {
        title: "Base"
      }, {
        title: "Amount"
      }, {
        title: "Term"
      }, {
        title: "Amount"
      }, {
        title: "Available"
      }, {
        title: "Expiration"
      }, {
        title: "To"
      }, {
        title: "TrxId"
      }, {
        title: "BlockNum"
      }, {
        title: "State"
      }, {
        title: "Op"
      }],
      ordering: false,
      searching: true,
      bPaginate: true,
      bLengthChange: true,
      bFilter: true,
      bInfo: true,
      scrollY: "50vh",
      sScrollX: "100%",
      scrollCollapse: true,
      paging: true,
      columnDefs: [{
        width: "12%",
        targets: 0,
        className: "dt-body-right"
      }, {
        width: "12%",
        targets: 1,
        className: "dt-body-center"
      }, {
        width: "12%",
        targets: 2,
        className: "dt-body-right"
      }, {
        width: "12%",
        targets: 3,
        className: "dt-body-center"
      }, {
        width: "12%",
        targets: 4,
        className: "dt-body-right"
      }, {
        width: "5%",
        targets: 5,
        className: "dt-body-right"
      }, {
        width: "10%",
        targets: 6,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 7,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 8,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 9,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 10,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 10,
        className: "dt-body-center"
      }, {
        width: "12%",
        targets: [0, 1, 2, 3, 4],
        className: "dt-head-center"
      }, {
        width: "5%",
        targets: [5],
        className: "dt-head-center"
      }, {
        width: "10%",
        targets: [6],
        className: "dt-head-center"
      }, {
        width: "5%",
        targets: [7, 8, 9, 10, 11],
        className: "dt-head-center"
      }, {
        targets: -1,
        data: null,
        defaultContent: '<button id="btn_modify_order" class="btn btn-primary btn-xs" style="padding:0 5px 0 5px"><i class="fa fa-pencil"></i></button>'
      }]
    })
  }
  if (!$.fn.dataTable.isDataTable("#crypto_dex_req")) {
    dexsTable = $("#crypto_dex_req").DataTable({
      data: [],
      columns: [{
        title: "ID"
      }, {
        title: "Mail"
      }, {
        title: "URL"
      }, {
        title: "ETH Fee Recipient"
      }, {
        title: "ETH Collateral"
      }, {
        title: "ETH Fee Amount"
      }, {
        title: "EOS Fee Recipient"
      }, {
        title: "EOS Collateral"
      }, {
        title: "EOS Fee Amount"
      }, {
        title: "State"
      }, {
        title: "On"
      }, {
        title: "Op"
      }],
      ordering: false,
      searching: true,
      bPaginate: true,
      bLengthChange: true,
      bFilter: true,
      bInfo: true,
      scrollY: "50vh",
      sScrollX: "100%",
      scrollCollapse: true,
      paging: true,
      columnDefs: [{
        width: "5%",
        targets: 0,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 1,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 2,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 3,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 4,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 5,
        className: "dt-body-right"
      }, {
        width: "10%",
        targets: 6,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 7,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 8,
        className: "dt-body-right"
      }, {
        width: "5%",
        targets: 9,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 10,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 11,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: [0],
        className: "dt-head-center"
      }, {
        width: "10%",
        targets: [1, 2, 3, 4, 5, 6, 7, 8],
        className: "dt-head-center"
      }, {
        width: "5%",
        targets: [9, 10, 11],
        className: "dt-head-center"
      }, {
        targets: -1,
        data: null,
        defaultContent: '<button id="btn_show_dex_detail" class="btn btn-primary btn-xs" style="padding:0 5px 0 5px"><i class="fa fa-edit"></i></button>' + '<button id="btn_approve_dex" class="btn btn-success btn-xs" style="padding:0 5px 0 5px"><i class="fa fa-check-circle"></i></button>' + '<button id="btn_reject_dex" class="btn btn-danger btn-xs" style="padding:0 5px 0 5px"><i class="fa fa-remove"></i></button>'
      }]
    })
  }
  if (!$.fn.dataTable.isDataTable("#crypto_dex_listing_req")) {
    cryptocurrenciesTable = $("#crypto_dex_listing_req").DataTable({
      data: [],
      columns: [{
        title: "ID"
      }, {
        title: "Chain"
      }, {
        title: "Cryptocurrency"
      }, {
        title: "Smart Contract"
      }, {
        title: "Action"
      }, {
        title: "Accuracy"
      }, {
        title: "Mail"
      }, {
        title: "State"
      }, {
        title: "Op"
      }],
      ordering: false,
      searching: true,
      bPaginate: true,
      bLengthChange: true,
      bFilter: true,
      bInfo: true,
      scrollY: "50vh",
      sScrollX: "100%",
      scrollCollapse: true,
      paging: true,
      columnDefs: [{
        width: "10%",
        targets: 0,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 1,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 2,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 3,
        className: "dt-body-center"
      }, {
        width: "40%",
        targets: 4,
        className: "dt-body-left"
      }, {
        width: "5%",
        targets: 5,
        className: "dt-body-right"
      }, {
        width: "10%",
        targets: 6,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: 7,
        className: "dt-body-center"
      }, {
        width: "5%",
        targets: 8,
        className: "dt-body-center"
      }, {
        width: "10%",
        targets: [0],
        className: "dt-head-center"
      }, {
        width: "5%",
        targets: [1],
        className: "dt-head-center"
      }, {
        width: "5%",
        targets: [2],
        className: "dt-head-center"
      }, {
        width: "10%",
        targets: [3],
        className: "dt-head-center"
      }, {
        width: "40%",
        targets: [4],
        className: "dt-head-center"
      }, {
        width: "5%",
        targets: [5],
        className: "dt-head-center"
      }, {
        width: "10%",
        targets: [6],
        className: "dt-head-center"
      }, {
        width: "10%",
        targets: [7],
        className: "dt-head-center"
      }, {
        width: "5%",
        targets: [8],
        className: "dt-head-center"
      }, {
        targets: -1,
        data: null,
        defaultContent: '<button id="btn_show_listing_detail" class="btn btn-primary btn-xs" style="padding:0 5px 0 5px"><i class="fa fa-edit"></i></button>' + '<button id="btn_approve_listing" class="btn btn-success btn-xs" style="padding:0 5px 0 5px"><i class="fa fa-check-circle"></i></button>' + '<button id="btn_reject_listing" class="btn btn-danger btn-xs" style="padding:0 5px 0 5px"><i class="fa fa-remove"></i></button>'
      }]
    })
  }
  $.plot($("#chart_plot"), chartPlotParams, chartPlotSettings);
  lineChart = new Chart(chartCtx, {
    type: "line",
    data: {
      labels: initLabelsData,
      datasets: [{
        label: "Bids",
        backgroundColor: "rgba(255, 99, 71, 0.3)",
        borderColor: "rgba(255, 99, 71, 0.70)",
        pointBorderColor: "rgba(255, 99, 71, 0.70)",
        pointBackgroundColor: "rgba(255, 99, 71, 0.70)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(151,187,205,1)",
        pointBorderWidth: 1,
        data: initBidsData
      }, {
        label: "Asks",
        backgroundColor: "rgba(38, 185, 154, 0.31)",
        borderColor: "rgba(38, 185, 154, 0.7)",
        pointBorderColor: "rgba(38, 185, 154, 0.7)",
        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointBorderWidth: 1,
        data: initAsksData
      }]
    }
  });
  $("#show_orders").on("click", function() {
    getOrdersTrades(true)
  });
  $("#crypto_dex_myorders tbody").on("click", "[id*=btn_modify_order]", function() {
    if (myOrdersTable != null) {
      var data = myOrdersTable.row($(this).parents("tr")).data();
      if (typeof data == "undefined") {
        data = myOrdersTable.row($(this)).data()
      }
      if (data[10] == "Open") {
        var baseCryptocurrency = data[1].split(".");
        var termCryptocurrency = data[3].split(".");
        $("#fee_amount").val("");
        $("#order_expiration").val("");
        $("#trx_id").val(data[8]);
        $("#block_num").val(data[9]);
        $("#base_platform").val(baseCryptocurrency[0]);
        $("#base_account").val(data[7]);
        $("#base_cryptocurrency").val(baseCryptocurrency[1]);
        $("#base_amount").val(parseFloat(data[2].split(" / ")[1]));
        $("#term_platform").val(termCryptocurrency[0]);
        $("#term_cryptocurrency").val(termCryptocurrency[1]);
        $("#term_amount").val(parseFloat(data[4].split(" / ")[1]));
        $("#old_base_platform").val(baseCryptocurrency[0]);
        $("#old_base_cryptocurrency").val(baseCryptocurrency[1]);
        $("#old_expiration").val(data[6]);
        $("#trx_id_div").show();
        $("#block_num_div").show();
        $("#term_platform").prop("disabled", true);
        $("#term_cryptocurrency").prop("disabled", true);
        $("#term_amount").prop("disabled", true);
        $("#send_order").prop("disabled", true);
        $("#send_order").hide();
        $("#modify_order").prop("disabled", false);
        $("#modify_order").show();
        $("#cancel_order").prop("disabled", false);
        $("#cancel_order").show()
      }
    }
  });
  $("#crypto_dex_req tbody").on("click", "[id*=btn_show_dex_detail]", function() {
    if (dexsTable != null) {
      var data = dexsTable.row($(this).parents("tr")).data();
      if (typeof data == "undefined") {
        data = dexsTable.row($(this)).data()
      }
      if (typeof data[0] != "undefined") {
        $("#dq_site_url").val(data[2]);
        $("#dq_eth_fee_recipient").val(data[3]);
        $("#dq_eth_recipient").val(data[4]);
        $("#dq_eth_fee_required").val(data[5]);
        $("#dq_eos_fee_recipient").val(data[6]);
        $("#dq_eos_recipient").val(data[7]);
        $("#dq_eos_fee_required").val(data[8])
      }
    }
  });
  $("#crypto_dex_req tbody").on("click", "[id*=btn_approve_dex]", function() {
    if (dexsTable != null) {
      var data = dexsTable.row($(this).parents("tr")).data();
      if (typeof data == "undefined") {
        data = dexsTable.row($(this)).data()
      }
      approveDex(data[0] + "", data[1]);
      renderUpdatedDexReq($(this).closest("tr").index(), "Approved")
    }
  });
  $("#crypto_dex_req tbody").on("click", "[id*=btn_reject_dex]", function() {
    if (dexsTable != null) {
      var data = dexsTable.row($(this).parents("tr")).data();
      if (typeof data == "undefined") {
        data = dexsTable.row($(this)).data()
      }
      rejectDex(data[0] + "", data[1]);
      renderUpdatedDexReq($(this).closest("tr").index(), "Rejected")
    }
  });
  $("#crypto_dex_listing_req tbody").on("click", "[id*=btn_show_listing_detail]", function() {
    if (cryptocurrenciesTable != null) {
      var data = cryptocurrenciesTable.row($(this).parents("tr")).data();
      if (typeof data == "undefined") {
        data = cryptocurrenciesTable.row($(this)).data()
      }
      if (data[0]) {
        $("#lq_chain_name").val(data[1]);
        $("#lq_cryptocurrency").val(data[2]);
        $("#lq_smart_contract").val(data[3]);
        $("#lq_action_name").val(data[4]);
        $("#lq_accuracy").val(data[5])
      }
    }
  });
  $("#crypto_dex_listing_req tbody").on("click", "[id*=btn_approve_listing]", function() {
    if (cryptocurrenciesTable != null) {
      var data = cryptocurrenciesTable.row($(this).parents("tr")).data();
      if (typeof data == "undefined") {
        data = cryptocurrenciesTable.row($(this)).data()
      }
      approveListing(parseInt(data[0]));
      renderUpdatedListingReq($(this).closest("tr").index(), "Approved")
    }
  });
  $("#crypto_dex_listing_req tbody").on("click", "[id*=btn_reject_listing]", function() {
    if (cryptocurrenciesTable != null) {
      var data = cryptocurrenciesTable.row($(this).parents("tr")).data();
      if (typeof data == "undefined") {
        data = cryptocurrenciesTable.row($(this)).data()
      }
      rejectListing(parseInt(data[0]));
      renderUpdatedListingReq($(this).closest("tr").index(), "Rejected")
    }
  });
  $("#new_order").on("click", function() {
    $("#mail_address").val(crd.mailAddr);
    $("#base_account").val("");
    $("#fee_amount").val("");
    $("#order_expiration").val("");
    $("#trx_id").val("");
    $("#block_num").val("");
    $("#base_cryptocurrency").val($("#base_cryptocurrency_search").val());
    $("#base_amount").val("");
    $("#term_cryptocurrency").val($("#term_cryptocurrency_search").val());
    $("#term_amount").val("");
    $("#old_base_platform").val("");
    $("#old_base_cryptocurrency").val("");
    $("#mail_address").prop("disabled", false);
    $("#trx_id_div").hide();
    $("#block_num_div").hide();
    $("#term_platform").prop("disabled", false);
    $("#term_cryptocurrency").prop("disabled", false);
    $("#term_amount").prop("disabled", false);
    $("#send_order").prop("disabled", false);
    $("#send_order").show();
    $("#modify_order").prop("disabled", true);
    $("#modify_order").hide();
    $("#cancel_order").prop("disabled", true);
    $("#cancel_order").hide()
  });
  $("#send_order").on("click", function() {
    sendOrder()
  });
  $("#modify_order").on("click", function() {
    modifyOrder()
  });
  $("#cancel_order").on("click", function() {
    cancelOrder()
  });
  $("#notify_orderbook").on("click", function() {
    notifyOrderbook()
  });
  $("#request_dex").on("click", function() {
    requestDex()
  });
  $("#request_listing").on("click", function() {
    requestListing()
  });
  $("#send_veri_code").on("click", function() {
    if (crd.mailAddr == "guest") {
      notifyWarning("You need to sign in first. If you forgot your password, you can send verification code to your mailbox on the login page. After that, you can sign in and then change password here.");
      return
    }
    sendVerificationCode(mailAddr)
  });
  $("#change_password").on("click", function() {
    var verificationCode = $("#verification_code").val();
    var newPassword = $("#new_password").val();
    if (!sandbox && verificationCode == "") {
      notifyError("The verification code should not be empty.");
      return
    }
    if (newPassword == "") {
      notifyError("The new password should not be empty.");
      return
    }
    changePassword(verificationCode, newPassword)
  });
  $("#menu_chains").on("click", function() {
    $("#" + currentPanel).removeClass("active");
    $("#" + currentPanel).addClass("active")
  });
  $("#menu_market_cap").on("click", function() {
    $("#" + currentPanel).removeClass("active");
    $("#" + currentPanel).addClass("active")
  });
  $("#menu_listing_request").on("click", function() {
    $("#" + currentPanel).removeClass("active");
    $("#" + currentPanel).addClass("active")
  });
  $("#menu_dex_request").on("click", function() {
    $("#" + currentPanel).removeClass("active");
    $("#" + currentPanel).addClass("active")
  });
  $("#trx_id").prop("disabled", true);
  $("#trx_id_div").hide();
  $("#block_num").prop("disabled", true);
  $("#block_num_div").hide();
  $("#modify_order").prop("disabled", true);
  $("#modify_order").hide();
  $("#cancel_order").prop("disabled", true);
  $("#cancel_order").hide();
  if (!sandbox) {
    $("#verification_code_div").show();
    $("#send_veri_code").show()
  }(() => {
    crd = {
      mailAddr: "guest",
      credentialToken: "guest"
    };
    if (typeof localStorage.credential != "undefined") {
      var credential = JSON.parse(localStorage.credential);
      if (typeof credential.mailAddr == "string" && typeof credential.credentialToken == "string" && credential.mailAddr != "" && credential.mailAddr != "guest" && credential.credentialToken != "") {
        if (typeof credential.loginPage != "undefined") {
          delete credential.loginPage;
          crd.mailAddr = credential.mailAddr;
          crd.credentialToken = credential.credentialToken;
          $("#mail_address").val(credential.mailAddr);
          $("#mail_address_div").hide();
          loadMyOrders();
          localStorage.credential = JSON.stringify(crd);
          $("#setting").show();
          $("#log_out").show()
        } else if (typeof credential.activated != "undefined") {
          delete credential.activated;
          crd.mailAddr = credential.mailAddr;
          crd.credentialToken = credential.credentialToken;
          $("#mail_address").val(credential.mailAddr);
          $("#mail_address_div").hide();
          loadMyOrders();
          localStorage.credential = JSON.stringify(crd);
          $("#setting").show();
          $("#log_out").show()
        } else {
          $.ajax({
            type: "POST",
            headers: {
              "Authorization": "Basic " + btoa(credential.mailAddr + "::" + credential.credentialToken)
            },
            url: serverUrl + "/users/login",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
              contactId: contactId
            }),
            success: function(data) {
              if (typeof data.res == "object" && data.res != null && typeof data.res.mailAddr == "string" && typeof data.res.credentialToken == "string" && data.res.mailAddr != "" && data.res.credentialToken != "") {
                crd.mailAddr = data.res.mailAddr;
                crd.credentialToken = data.res.credentialToken;
                $("#mail_address").val(data.res.mailAddr);
                $("#mail_address_div").hide();
                loadMyOrders();
                localStorage.credential = JSON.stringify(crd);
                $("#setting").show();
                $("#log_out").show()
              } else {
                localStorage.credential = JSON.stringify(crd);
                $("#log_in").show()
              }
            },
            error: function(e) {
              localStorage.credential = JSON.stringify(crd);
              $("#log_in").show()
            }
          })
        }
        return
      }
    }
    loadMyOrders();
    localStorage.credential = JSON.stringify(crd);
    $("#log_in").show()
  })();
  getDex("A").then(function(dex) {
    if (dex.length <= 0) {
      return
    }
    var dx = dex[0];
    if (parseInt(contactId) != dx.dexKey) {
      return
    }
    window.platforms["eth"].feeRecipient = dx.ethFeeRecipient;
    window.platforms["eth"].exchange = dx.ethRecipient;
    window.platforms["eth"].feeAmountRequired = dx.ethFeeAmountRequired;
    window.platforms["eos"].feeRecipient = dx.eosFeeRecipient;
    window.platforms["eos"].exchange = dx.eosRecipient;
    window.platforms["eos"].feeAmountRequired = dx.eosFeeAmountRequired;
    ethReceiptUrl = dx.ethReceiptUrl;
    connected = dx.connected
  }).catch(function() {});
  getCryptocurrencies("A").then(function(cryptocurrencies) {
    for (var i in cryptocurrencies) {
      var cryptocurrency = cryptocurrencies[i];
      var platform = window.platforms[cryptocurrency.platform];
      if (cryptocurrency.platform == "eth") {
        cryptocurrency.actionName = JSON.parse(cryptocurrency.actionName)
      }
      platform.cryptocurrencies[cryptocurrency.cryptocurrency] = cryptocurrency
    }
  }).catch(function() {});
  changeCrossPlatforms("eth", "eth");
  refresh()
}
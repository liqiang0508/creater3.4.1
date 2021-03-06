/*
 * @Description: 
 * @Author: li qiang
 * @Date: 2021-12-24 15:02:42
 * @LastEditTime: 2022-02-10 17:16:19
 */
// var gameProto = require("gameProto")
import { CMD2PB } from "./cmdDef"
import gameProto from "./gameProto.js"
let protoTool = {
    //根据协议编码pb数据
    encode: function (cmd, data) {
        var bytesData = null
        if (CMD2PB[cmd]) {
            var pak = CMD2PB[cmd].pak
            let arry = pak.split(".")
            let message = null
            for (var i = 0; i < arry.length; i++) {
                var key = arry[i]
                if (message) {
                    message = message[key]
                } else {
                    message = gameProto[key]
                }
            }

            bytesData = message.create(data)
            bytesData = message.encode(bytesData).finish()
            // bytesData = bytesData.slice().buffer
            // bytesData = bytesData.buffer.slice(bytesData.byteOffset, bytesData.byteLength + bytesData.byteOffset)
        }
        return bytesData
    },
    //根据协议解码pb数据
    decode: function (cmd, bytes) {
        var res = null

        if (CMD2PB[cmd]) {
            var pak = CMD2PB[cmd].pak
            let arry = pak.split(".")
            let message = null
            for (var i = 0; i < arry.length; i++) {
                var key = arry[i]
                if (message) {
                    message = message[key]
                } else {
                    message = gameProto[key]
                }
            }
            res = message.decode(new Uint8Array(bytes))
        }
        return res
    },

    Uint8ArrayToString: function (fileData) {
        var dataString = "";
        for (var i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }

        return dataString

    },

    stringToUint8Array: function (str) {
        var arr = [];
        for (var i = 0, j = str.length; i < j; ++i) {
            arr.push(str.charCodeAt(i));
        }

        var tmpUint8Array = new Uint8Array(arr);
        return tmpUint8Array
    },

    packData: function (cmd, byteData) {
        // var message = {cmd:cmd,data:ProtoTool.Uint8ArrayToString(byteData)}
        // console.log("message==",message)
        // message = ProtoTool.stringToUint8Array(JSON.stringify(message))
        // console.log("message==1",message)
        var data = { id: cmd, data: byteData }
        var message = gameProto.tutorial.Package.create(data)
        var bytesData = gameProto.tutorial.Package.encode(message).finish()
        return bytesData
    },

    parseData: function (byteData) {
        var message = gameProto.tutorial.Package.decode(byteData)
        return message
    },

}

// globalThis.ProtoTool = ProtoTool
export default protoTool
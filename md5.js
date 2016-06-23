/**
 * Copyright 2016 Dean Cording <dean@cording.id.au>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/

module.exports = function(RED) {
    "use strict";
    var md5 = require("md5");

    function MD5Node(n) {
        RED.nodes.createNode(this,n);
        var node = this;

        node.name = n.name;
        node.fieldToHash = n.fieldToHash;
        node.fieldTypeToHash = n.fieldTypeToHash;
        node.hashField = n.hashField;
        node.hashFieldType = n.hashFieldType;

        node.on("input", function(msg) {

            var hash;

            if (node.fieldToHashType === 'msg') {
                value = md5(RED.util.getMessageProperty(msg,node.fieldToHash).toString());
            } else if (node.fieldToHashType === 'flow') {
                value = md5(node.context().flow.get(node.fieldToHash).toString());
            } else if (node.fieldToHashType === 'global') {
                value = node.context().global.get(node.fieldToHash).toString());
            }

            if (node.hashFieldType === 'msg') {
                RED.util.setMessageProperty(msg,node.hashField,value);
            } else if (node.hashFieldType === 'flow') {
                node.context().flow.set(node.hashField,value);
            } else if (node.hashFieldType === 'global') {
                node.context().global.set(node.hashField,value);
            }

        });
    }

    RED.nodes.registerType("md5", MD5Node);
}


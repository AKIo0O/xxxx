


(function(){
    
    var letter = "abcdefghijklmnopqrstuvwxyz",
        upper  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        digit  = "0123456789";


    var Node = function(current,nextNode){
        this.current = current;
        this.nextNode = nextNode;
    };

    Node.prototype = {
        match: function(reg){
            if(reg.indexOf(this.current) > -1){
                if(this.nextNode === null) return this.current;
                var result = this.match.call(this.nextNode,reg);
                return  result !== "unmatched" ? this.current + result : this.current;
            }
            return "unmatched";
        }
    };

    var linkNode = function(str){
        var length = str.length,
            i = 0,
            node = null;

        while(--length>=0){
            var n = new Node(str.charAt(length),node);
            node = n;
        }
        return node;
    };

    var bracketReg = function(node){

        var content = "",
            nextNode = node;

        while(node.nextNode){
            // 改变循环状态，并从[的下一个节点开始
            node = node.nextNode;
            if(node.current === "]"){
                nextNode = node.nextNode;
                break;
            }
            content += node.current;
        }
        content = content.replace("0-9",digit).replace("a-z",letter).replace("A-Z",letter);
        return new Node(content,nextNode);        
    };

    var createReg = function(str){
        var node = linkNode(str),
            save = new Node("",null),
            first = save;


        while(node.nextNode){
            var current = node.current,
                nextChar = node.nextNode.current,
                reg;
            // 普通字符，不移位置
            if ("[]\\".indexOf(current) < 0) {
                reg = node;
            } else if (current === "[") {
                reg = bracketReg(node);
            }
            save = save.nextNode = reg;
            node = reg.nextNode;// 改变循环状态
        }

        return first.nextNode;
    };
        
    var complie = function(reg,source){
        var node = linkNode(source),
            regNode = createReg(reg),
            capture = [],
            begin = false,
            lastIndex = 0,
            cache = regNode;

        while(node.nextNode&&regNode){
            var sourceChar = node.current,
                regexpChar = regNode.current;
            if(regexpChar.indexOf(sourceChar) < 0){
                if(begin){
                    // 重置匹配Node
                    regNode = cache;
                    begin = false;
                    capture = [];
                } else {
                    node = node.nextNode;
                }
                continue;
            }
            begin = true;
            node = node.nextNode;
            regNode = regNode.nextNode;
            capture.push(sourceChar);
        }

        return capture.join("");
    };

    window.complie = complie;

    // complie("d[0-9]ww","dd33ww1123123ww")
})();



























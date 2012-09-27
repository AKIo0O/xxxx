/////////////////////////
//                     //
//                     //
//                     //
//                     //
//                     //
/////////////////////////

void function(){
	var E = {};

	// 核心逻辑1
	// 将数据变成 html ，然后放到指定位置
	// 需要 data , tmpl, target(目标dom节点), type:["beforeBegin","afterEnd","beforeEnd","replace","afterBegin"]

	var insertHTML = function(data,tmpl,target,type){

		var template = Handlebars.compile(tmpl),
			html = template(data),
			type = type || "beforeEnd";

		if (type === "replace") {
			target.innerHTML = html;
			return html;
		}
		target.insertAdjacentHTML(type,html);
	};

	var bindModel = function(data,target,tmpl){
		var name = Date.now();
		window[name] = new Model(data);
		window[name].on("change",function(){
			insertHTML(data,tmpl,target,"replace");
		});
		target.setAttribute("model",name);
		return window[name];
	};

	// 核心逻辑2
	// 获取数据，并将其替换成json数据，调用核心逻辑1
	// @TODO
	var getJSON = function(url,tmpl,target,type){

		E.getJSON(url,function(data){
			if(data.code===1) return "";
			innerHTML(data,tmpl,target,type);
			// 模型对应
			bindModel(data,target,tmpl);
		});
	};


	// 核心逻辑3 
	// 为用户自定义的代码。绑定事件并赋予其操作
	// 



	// 核心逻辑4
	// Model 绑定数据
	// 
	var event = {};
	void function(event){
		var handlers = {};
		event.on = function(type,handler){
			if(!handlers[type]) handlers[type] = [];
			handlers[type].push(handler);
		};

		event.trigger = function(type,opts){
			if(!handlers[type]) return;
			handlers[type].forEach(function(f){
				f.call(this,opts);
			});
		};
	}(event);

	var mix = function(obj,opts){
		for (o in opts) {
			obj[o] = opts[o];
		}
	};

	var Model = function(data){
		var me = this,
			children = {};
		mix(me,event);
		for (var p in data) {
			void function(o){
				Object.defineProperty(this,o,{
					set:function(v){
						data[o] = v;
						if(typeof data[o] == "object" && !Array.isArray(data[o])) children[o] = new Model(data[o]);
						me.trigger("change",{type:"change",property:o,v:v});
					},
					get:function(){
						return typeof data[o] == "object" &&!Array.isArray(data[o]) ? children[o] : data[o];
					}
				});
			}.call(me,p);
			if(typeof data[p] == "object" && !Array.isArray(data[p])) children[p] = new Model(data[p]);
		}
	};

	mix(window,{
		insertHTML: insertHTML,
		bindModel : bindModel
	})
}();




















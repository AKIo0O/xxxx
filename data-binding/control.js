(function(){

    var mix = function(target,opts,def){
        if(def) mix(target,def);
        for(var key in opts) target[key] = opts[key];
        return target;
    };

    var Control = {
        
        extends: function(opts){
            this.init();
            var o = mix({},opts,this);
            return function(args){
                o.init.call(o);
                o.dom = args.dom;
                o.inject();
                o = mix(o,args);
                o.inject();
                return o;
            };
        },

        init: function(){
            this.type = "Control";
            this.events = "";// 普通事件type:对应事件名 代理事件 type.class:事件名 
            this.doms = "";
        },

        inject: function(){
            this.events == "" ? "" : this.initEvents();
            this.doms   == "" ? "" : this.initDoms();
        },

        initEvents: function(){
            var events = this.events.split(","),
                me = this;
            events.forEach(function(item){
                var event = item.split(":"),
                    name = event[1];
                var    typeclass = event[0].split(" "),
                    type = typeclass[0],
                    clazz = typeclass[1];
                clazz ? me.on(type,clazz,me[name]) : me.on(type,me[name]);
            });
        },

        initDoms: function(){
            var doms = this.doms.split(","),
                me = this;
            doms.forEach(function(item){
                var names = item.split(":"),
                    key = names[0],
                    selector = names[1];
                me[key] = me.dom.querySelector(selector);
            });

        },

        on: function(type,delegate,handle){
            var me = this;
            if (typeof delegate === "function") {
                handle = delegate;
                delegate = "";
            }
            this.dom.addEventListener(type,function(e){
                if(e.target.className.toLowerCase().indexOf(delegate.slice(1)) > -1){
                    handle.call(e.target,e,me);
                }
            },false);
        },

        show: function(){
            this.dom.hidden = false;
        },

        hide: function(){
            this.dom.hidden = true;
        }
    };

       
































    window.mix = mix;
    window.Control =Control;

})();
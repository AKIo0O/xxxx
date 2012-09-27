(function(){
    var Dialog = Control.extends({

        init:function(){


        },
        
        events:"mousedown:moveable,mouseup:moveunable,mousemove:move,mouseout:moveunable,click .sure:sure,click .cancel:cancel",
        
        doms: "sbtn:.sure",
        
        sure: function(e,d){
            d.sbtn.style.color = Math.random()>0.5?"red":"blue";
        },

        cancel: function(){
            alert("cancel")
        },

        moveable: function(e,d){
            d.moveisable = true;
            d.x = e.clientX;
            d.y = e.clientY;
        },
        
        moveunable: function(e,d){
            d.moveisable = false;
        },

        move:function(e,d){
            if(d.moveisable){
                var top = this.offsetTop,
                    left = this.offsetLeft;
                this.style.top = (top + e.clientY - d.y) + "px";
                this.style.left = (left + e.clientX - d.x) + "px";
                d.x = e.clientX;
                d.y = e.clientY;
            }
        },
        
        type:"Dialog"
    });

    window.Dialog = Dialog;
})();



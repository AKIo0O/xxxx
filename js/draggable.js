(function(){

    var Draggable = {

        events:"mousedown:moveable,mouseup:unmoveable,mousemove:move,mouseout:unmoveable",

        moveable: function(e,d){
            d.moveisable = true;
            d.x = e.clientX;
            d.y = e.clientY;
        },
        
        unmoveable: function(e,d){
            d.moveisable = false;
            d.moveTo&&d.moveTo(1,1);
        },

        move: function(e,d){
            if(d.moveisable){
                var top = this.offsetTop,
                    left = this.offsetLeft;
                this.style.top = (top + e.clientY - d.y) + "px";
                this.style.left = (left + e.clientX - d.x) + "px";
                d.x = e.clientX;
                d.y = e.clientY;
            }
        }
    };

    window.Draggable = Draggable;
})();



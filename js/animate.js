(function(){


    var Animate = {


        requestAnimationFrame: window.webkitRequestAnimationFrame,

        moveTo: function(x,y){
            var X = this.dom.offsetLeft,
                Y = this.dom.offsetTop,
                stepX = (x - X)/60,
                stepY = (y - Y)/60;
            var dom = this.dom;
            function move(){
                dom.style.top =  X + "px";
                dom.style.left = Y + "px";

                if(X - x < 2 || Y - y < 2) return;
                X += stepX;
                Y += stepY;
                webkitRequestAnimationFrame(move);
            }

            webkitRequestAnimationFrame(move);
        }
    };

    window.Animate = Animate;
})();



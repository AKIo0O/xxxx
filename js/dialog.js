(function(){
    var Dialog = Control.extends({

        init:function(){


        },
        
        events:"click .sure:sure,click .cancel:cancel",
        
        doms: "sbtn:.sure",
        
        sure: function(e,d){
            d.sbtn.style.color = Math.random()>0.5?"red":"blue";
        },

        cancel: function(){
            alert("cancel")
        },
        
        type:"Dialog"
    });

    


    window.Dialog = Dialog;
})();



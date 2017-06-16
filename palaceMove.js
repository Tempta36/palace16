/**
 * Created by Administrator on 2017/6/16.
 */
window.onload = function () {
    var palace_unit = document.getElementsByClassName('palace_unit');
    var palace_move = document.getElementsByClassName('palace_move');
    var palace_tr=document.getElementsByClassName('palace_tr');
    var unit_length=palace_unit.length;
    var move_length=palace_move.length;

    var px=0;
    var py=0;

    for(var i=0;i<unit_length;i++){
        palace_unit[i].index=i;

        palace_unit[i].onmousedown=function(ev){
            var oEvent=ev||event;

            var downLeft=oEvent.clientX;
            var downTop=oEvent.clientY;
            var upLeft=0;
            var upTop=0;

            px=oEvent.clientX-offSet(palace_unit[this.index]).left;
            py=oEvent.clientY-offSet(palace_unit[this.index]).top;

            var tmp=new CreateDiv();
            tmp.createDiv(palace_unit[this.index]);

            document.onmousemove=function(ev){
                var oEvent=ev||event;

                var l=oEvent.clientX-px;
                var t=oEvent.clientY-py;

                tmp.tmp.style.left=l-6+'px';
                tmp.tmp.style.top=t-6+'px';
            };

            document.onmouseup=function(ev){
                var oEvent=ev||event;
                upLeft=oEvent.clientX;
                upTop=oEvent.clientY;

                var marginLeft=offSet(palace_unit[0]).left;
                var marginTop=offSet(palace_unit[0]).top;

                alert(gainUpDom(upLeft-marginLeft-px,upTop-marginTop));
                if(gainUpDom(upLeft-marginLeft-px,upTop-marginTop)){
                    var downDom=gainDownDom(downLeft-marginLeft,downTop-marginTop);
                    var upDom=gainUpDom(upLeft-marginLeft-px,upTop-marginTop);
                    var tmpHtml=upDom.innerHTML;
                    upDom.innerHTML=downDom.innerHTML;
                    downDom.innerHTML=tmpHtml;
                }


                document.onmousemove=null;
                document.onmouseup=null;
                tmp.removeDiv();
            };
            return false;
        };
    }

    function CreateDiv() {
        this.tmp = null;

        this.createDiv = function (obj) {
            this.tmp=document.createElement('div');

            this.tmp.className='tmp';
            this.tmp.style.left=offSet(obj).left+'px';
            this.tmp.style.top=offSet(obj).top+'px';
            document.body.appendChild(this.tmp);
        };

        this.removeDiv=function(){
            document.body.removeChild(this.tmp);
        };
    }

    function offSet(curEle) {
        var totalLeft = null;
        var totalTop = null;
        var par = curEle.offsetParent;

        totalLeft += curEle.offsetLeft;
        totalTop += curEle.offsetTop;

        while (par){
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1){

                totalTop += par.clientTop;
                totalLeft += par.clientLeft;
            }

            totalTop += par.offsetTop;
            totalLeft += par.offsetLeft;
            par = par.offsetParent;
        }
        return {left: totalLeft,top: totalTop};
    }

    function gainUpDom(x,y){
        var i=999;
        var j=999;

        if(y>=-30&&y<=50){
            i=0;
        }
        if(y>=70&&y<=150){
            i=1;
        }
        if(y>=170&&y<=250){
            i=2;
        }
        if(y>=270&&y<=350){
            i=3;
        }

        if(x>=-30&&x<=50){
            j=0;
        }
        if(x>=60&&x<=150){
            j=1;
        }
        if(x>=160&&x<=250){
            j=2;
        }
        if(x>=260&&x<=350){
            j=3;
        }
        console.log(i+'===='+j);
        if(i==999||j==999){
            return 0;
        }else {
            var row=document.getElementsByClassName('palace_tr')[i];
            var col=row.getElementsByClassName('palace_unit')[j];
            console.log('up');console.log(y+'===='+x);console.log(i+'===='+j);console.log();
            return col;
        }
    }

    function gainDownDom(x,y){
        var i=0;
        var j=0;

        if(y>=0&&y<=95){
            i=0;
        }else if(y>=100&&y<=200){
            i=1;
        }else if(y>=205&&y<=305){
            i=2;
        }else if(y>=310&&y<=410){
            i=3;
        }

        if(x>=0&&x<=95){
            j=0;
        }else if(x>=98&&x<=195){
            j=1;
        }else if(x>=198&&x<=295){
            j=2;
        }else if(x>=298&&x<=395){
            j=3;
        }

        var row=document.getElementsByClassName('palace_tr')[i];
        var col=row.getElementsByClassName('palace_unit')[j];
        console.log('down');console.log(y+'===='+x);console.log(i+'===='+j);
        return col;
    }

};
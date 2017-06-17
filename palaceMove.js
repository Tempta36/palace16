/**
 * Created by Administrator on 2017/6/16.
 */
window.onload = function () {
    var palace_unit = document.getElementsByClassName('palace_unit');
    var palace_move = document.getElementsByClassName('palace_move');
    var palace_reset=document.getElementsByClassName('palace_reset')[0];
    var palace_back=document.getElementsByClassName('palace_back')[0];
    var palace_tr=document.getElementsByClassName('palace_tr');
    var unit_length=palace_unit.length;
    var move_length=palace_move.length;

    var px=0;
    var py=0;


    //鼠标在第一行落下时，行/列互换
    for(var j=0;j<move_length-3;j++){
        palace_move[j].index=j;
        palace_move[j].onmousedown=function(ev){
            var oEvent=ev||event;
            var marginLeft=offSet(palace_move[0]).left;
            var marginTop=offSet(palace_move[0]).top
            var downLeft=oEvent.clientX-marginLeft;
            var downTop=oEvent.clientY-marginTop;

            var downDom=gainDom(downLeft,downTop);

            var tmp=new CreateDiv();
            tmp.createDiv(palace_move[this.index]);

            document.onmousemove=function(ev){
                var oEvent=ev||event;

                var l=oEvent.clientX-px;
                var t=oEvent.clientY-py;

                tmp.tmp.style.left=l-6+'px';
                tmp.tmp.style.top=t-6+'px';
            };

            document.onmouseup=function(ev){
                var oEvent=ev||event;

                var upLeft=oEvent.clientX-marginLeft;
                var upTop=oEvent.clientY-marginTop;

                var upDom=gainDom(upLeft,upTop);
                //鼠标在第一列抬起，进行行列互换
                if(upDom.col==0){
                    var row=upDom.row;
                    var col=downDom.col;
                    dataExchange(row,col);

                    palace_back.onclick=function(){
                        dataExchange(row,col);
                    };
                    palace_reset.onclick=function(){
                        window.location.reload();
                    };
                }

                document.onmousemove=null;
                document.onmouseup=null;
                tmp.removeDiv();
            };
            return false;
        };
    }




    //单元格互换
    for(var i=0;i<unit_length;i++){
        palace_unit[i].index=i;
        //鼠标在第二三行落下
        palace_unit[i].onmousedown=function(ev){
            var oEvent=ev||event;

            var marginLeft=offSet(palace_move[0]).left;
            var marginTop=offSet(palace_move[0]).top;
            var downLeft=oEvent.clientX;
            var downTop=oEvent.clientY;

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
                var upLeft=oEvent.clientX;
                var upTop=oEvent.clientY;

                var offsetLeft=upLeft-marginLeft;
                var offsetTop=upTop-marginTop;

                //交换两个宫格的内容

                if(gainDom(offsetLeft,offsetTop)!=0){
                    //鼠标在除第一行之外的单元格抬起，进行单元格互换
                    if(gainDom(offsetLeft,offsetTop).row!=0){
                        var upDom=gainDom(offsetLeft,offsetTop).obj;
                        var downDom=gainDom(downLeft-marginLeft,downTop-marginTop).obj;
                        var tmpHtml=upDom.innerHTML;
                        upDom.innerHTML=downDom.innerHTML;
                        downDom.innerHTML=tmpHtml;

                        palace_reset.onclick=function(){
                            window.location.reload();
                        };
                        palace_back.onclick=function(){
                            tmpHtml=upDom.innerHTML;
                            upDom.innerHTML=downDom.innerHTML;
                            downDom.innerHTML=tmpHtml;
                        };
                    }else {
                    //鼠标在第一行的单元格抬起，进行行列互换
                        var row=gainDom(downLeft-marginLeft,downTop-marginTop).row;
                        var col=gainDom(offsetLeft,offsetTop).col;
                        dataExchange(row,col);

                        palace_back.onclick=function(){
                            dataExchange(row,col);
                        };
                        palace_reset.onclick=function(){
                            window.location.reload();
                        };
                    }
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

            this.tmp.className='palace_tmp';
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


    function gainDom(x,y){
        var i=0;
        var j=0;

        if(y>=0&&y<95){
            i=0;
        }else if(y>=120&&y<=240){
            i=1;
        }else if(y>=250&&y<=360){
            i=2;
        }else if(y>=370&&y<=480){
            i=3;
        }else{
            return 0;
        }

        if(x>=0&&x<=120){
            j=0;
        }else if(x>=121&&x<=245){
            j=1;
        }else if(x>=198&&x<=370){
            j=2;
        }else if(x>=371&&x<=490){
            j=3;
        }else{
            return 0;
        }

        var row=document.getElementsByClassName('palace_tr')[i];
        return {
            obj:row.getElementsByClassName('palace_unit')[j],
            row:i,
            col:j
        };
    }

    function dataExchange(row,col){
        //row表示获取第row行
        //col表示获取第col列
        var isGain=1;   //1表示获取值，0表示赋值

        var length=0;
        var rowInnerHtmlList=[];
        var colInnerHtmlList=[];

        traverse();

        for(var n=0;n<length;n++){
            var tmp=rowInnerHtmlList[n];
            rowInnerHtmlList[n]=colInnerHtmlList[n];
            colInnerHtmlList[n]=tmp;
        }
        isGain=0;

        traverse();

        function traverse(){
            var arow=document.getElementsByClassName('palace_tr')[row];
            var cols=arow.getElementsByClassName('palace_td');
            length=cols.length;
            for(var k=0;k<length;k++){
                if(isGain){
                    rowInnerHtmlList[k]=cols[k].innerHTML;
                }else{
                    cols[k].innerHTML=rowInnerHtmlList[k];
                }
            }

            var rows=document.getElementsByClassName('palace_tr');
            for(var m=0;m<length;m++){
                var acol=rows[m].getElementsByClassName('palace_td')[col];
                if(isGain){
                    colInnerHtmlList[m]=acol.innerHTML;
                }else{
                    acol.innerHTML=colInnerHtmlList[m];
                }
            }
        }
    }

};
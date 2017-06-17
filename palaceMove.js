/**
 * Created by Administrator on 2017/6/16.
 */
window.onload = function () {
    var palace_unit = document.getElementsByClassName('palace_unit');
    var palace_row = document.getElementsByClassName('palace_row');
    var palace_col = document.getElementsByClassName('palace_col');
    var palace_reset=document.getElementsByClassName('palace_reset')[0];
    var palace_back=document.getElementsByClassName('palace_back')[0];
    var palace_tr=document.getElementsByClassName('palace_tr');
    var unit_length=palace_unit.length;
    var row_length=palace_row.length;
    var col_length=palace_col.length;

    var px=0;
    var py=0;


    for(var i=0;i<unit_length;i++){
        palace_unit[i].index=i;

        palace_unit[i].onmousedown=function(ev){
            var oEvent=ev||event;

            var marginLeft=offSet(palace_row[0]).left;
            var marginTop=offSet(palace_row[0]).top;
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
                    var upDom=gainDom(offsetLeft,offsetTop);
                    var downDom=gainDom(downLeft-marginLeft,downTop-marginTop);

                    //鼠标在第一列落下第一列抬起，进行 行行互换
                    if(downDom.col==0&&upDom.col==0){
                        var up_row=upDom.row;
                        var down_row=downDom.row;
                        dataExchange(up_row,down_row,1);

                        palace_back.onclick=function(){
                            dataExchange(up_row,down_row,1);
                        };
                        palace_reset.onclick=function(){
                            window.location.reload();
                        };
                    }else if(downDom.row==0&&upDom.row==0){
                        //鼠标在第一行落下第一行抬起，进行 列列互换
                        var up_col=upDom.col;
                        var down_col=downDom.col;
                        dataExchange(up_col,down_col,0);

                        palace_back.onclick=function(){
                            dataExchange(up_col,down_col,0);
                        };
                        palace_reset.onclick=function(){
                            window.location.reload();
                        };
                    }else if((downDom.col==0&&upDom.col!=0)||(downDom.row==0&&upDom.row!=0) || //进行单元格互换
                        downDom.row!=0|| downDom.col!=0){
                        var tmpHtml=upDom.obj.innerHTML;
                        upDom.obj.innerHTML=downDom.obj.innerHTML;
                        downDom.obj.innerHTML=tmpHtml;

                        palace_reset.onclick=function(){
                            window.location.reload();
                        };
                        palace_back.onclick=function(){
                            tmpHtml=upDom.obj.innerHTML;
                            upDom.obj.innerHTML=downDom.obj.innerHTML;
                            downDom.obj.innerHTML=tmpHtml;
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

    function dataExchange(up,down,way){
        var isGain=1;   //1表示获取值，0表示赋值

        var length=4;
        var upInnerHtmlList=[];
        var downInnerHtmlList=[];

        traverse();
        traverse();

        function traverse(){
            if(!way){
                var rows=document.getElementsByClassName('palace_tr');

                if(isGain){
                    isGain=0;
                    for(var k=0;k<length;k++) {
                        downInnerHtmlList[k] = rows[k].getElementsByClassName('palace_unit')[down].innerHTML;
                        upInnerHtmlList[k] = rows[k].getElementsByClassName('palace_unit')[up].innerHTML;
                    }
                }else{
                    for(var k=0;k<length;k++) {
                        rows[k].getElementsByClassName('palace_unit')[down].innerHTML = upInnerHtmlList[k];
                        rows[k].getElementsByClassName('palace_unit')[up].innerHTML = downInnerHtmlList[k];
                    }
                }
            }else{
                var upRow=document.getElementsByClassName('palace_tr')[up];
                var downRow=document.getElementsByClassName('palace_tr')[down];

                if(isGain){
                    isGain=0;
                    for(var m=0;m<length;m++) {
                        upInnerHtmlList[m] = upRow.getElementsByClassName('palace_unit')[m].innerHTML;
                        downInnerHtmlList[m] = downRow.getElementsByClassName('palace_unit')[m].innerHTML;
                     }
                }else{
                    for(var m=0;m<length;m++) {
                        upRow.getElementsByClassName('palace_unit')[m].innerHTML = downInnerHtmlList[m];
                        downRow.getElementsByClassName('palace_unit')[m].innerHTML = upInnerHtmlList[m];
                    }
                }

            }

        }
    }

};
var page=1;
getList();
$("#btnNext").on("click", function(){
    page++;
    getList();
});
$("#btnPre").on("click", function(){
    page--;
    getList();
});

$("#btnSearch").on("click", function(){
    page=1;
    getList();
});
$("#txtQuery").on("keydown", function(){
    page=1;
    getList();
});
$("#selSize").on("change", function(){
    page=1;
    getList();
});

function getList(){
    var query=$("#txtQuery").val();
    var size=$("#selSize").val();
    $.ajax({
        type:"get",
        url:url,
        headers:{"Authorization":"KakaoAK 83241b51b26798a25aa23b3f331ba439"},
        data:{"query":query, "size":size, "page":page},
        dataType:"json",
        success:function(data){
            var is_end=data.meta.is_end;
            var totCount=data.meta.pageable_count; //전체데이터갯수
            var lastPage =Math.ceil(totCount/size); //마지막페이지
            $("#total").html(totCount + "건");
            $("#page").html(page + "/" + lastPage);

            var temp=Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(data));
        
            if(page==1){
                $("#btnPre").attr("disabled",true);
            }else{
                $("#btnPre").attr("disabled",false);
            }
            if(is_end){
                $("#btnNext").attr("disabled",true);
            }else{
                $("#btnNext").attr("disabled",false);
            } 
        }
    });
}
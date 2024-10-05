$(document).ready(function() {
    /**登录**/
    $("#login_btn").click(function (){
        var account=$("#account").val();
        var password=$("#password").val();
        if(account.trim()===''|password.trim()===''){
            simple_modal('平台提示','请检查输入情况!',function (){
                return;
            });
        }
        $.ajax({
            url:'login',
            type: 'POST',
            data: {
                account: account,
                password:password
            },
            dataType: 'json',
            success: function(data) {
                if(data.handleType){
                    console.log(data)
                    location.href='/index';
                }else{
                    //waringToast('平台提示',"登录状态码:"+data.handleCode+"---"+data.handleMessage);
                    simple_modal('平台提示',"登录状态码:"+data.handleCode+"---"+data.handleMessage,function (){
                        location.reload(true);
                    });
                }
            },
            error: function(xhr, status, error) {
                //console.error("AJAX请求失败: " +xhr.responseText);
                waringToast('平台提示','请求失败:'+xhr.responseText);
            }
        });
    });
});
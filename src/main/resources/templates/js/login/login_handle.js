$(document).ready(function() {
    /**登录**/
    $("#login_btn").click(function (){
        var account=$("#account").val();
        var password=$("#password").val();
        if(account.trim()===''|password.trim()===''){
            //alert("请检查输入情况!");
            //simple_modal('平台提示','请检查输入情况!');
            simPleToast('平台提示','请检查输入情况!');
            return;
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
                    //console.log(data)
                    location.href='/index';
                }else{
                    alert("登录状态码:"+data.handleCode+"---"+data.handleMessage);
                    // location.href='/login';
                    location.reload(true);
                }
            },
            error: function(xhr, status, error) {
                //console.error("AJAX请求失败: " +xhr.responseText);
                simple_modal('平台提示','请求失败:'+xhr.responseText);
            }
        });
    });
});
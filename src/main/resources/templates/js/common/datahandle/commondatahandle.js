/**
 * 公共数据加载逻辑
 */
$(document).ready(function() {
    getUserInfoData();
});

/**
 * 获取用户信息
 */
function getUserInfoData() {
    // 假设这里是一个AJAX请求
    $.ajax({
        url:'/api/userInfo',/* /check */
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                //console.log(data);
                $('#headerView').attr('src', '/image'+data.handleData.headerImageUrl);
                //$("#nameLabel").text(data.handleData.uAccount);
                $('#nameLabel').html('您好!<strong>' + data.handleData.uAccount + '</strong>');
                //$('#organizationLabel').html('所属机构:<br><strong>' + data.handleData.organization_name + '</strong>');
                $('#organizationLabel').text(data.handleData.organization_name);
                $('#nameView').text(data.handleData.uAccount);
                //createHtmlView(data.handleData.authorities);
            }
        },
        error: function(xhr, status, error) {
            console.error("请求失败: " +error);
            simpleToast('平台提示','请求失败:' +error);
        }
    });
}
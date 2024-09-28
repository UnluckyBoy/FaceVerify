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
                console.log(data);
                console.log('权限:'+data.handleData.authorities[0]);
                $('#headerView').attr('src', '/image'+data.handleData.headerImageUrl);
                //$("#nameLabel").text(data.handleData.uAccount);
                $('#nameLabel').html('您好!<strong>' + data.handleData.uAccount + '</strong>');
                //$('#organizationLabel').html('所属机构:<br><strong>' + data.handleData.organization_name + '</strong>');
                $('#organizationLabel').text(data.handleData.organization_name);
                $('#nameView').text(data.handleData.uAccount);
                createHtmlView(data.handleData.authorities);
            }
        },
        error: function(xhr, status, error) {
            console.error("请求失败: " +error);
            simpleToast('平台提示','请求失败:' +error);
        }
    });
}

/***
 * 创建HTML
 */
function createHtmlView(authorities){
    var htmlView;
    // 动态创建导航菜单
    for (let item of authorities){
        switch (item){
            case '00001':
                htmlView =
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="/index" class="matrix-text-decoration link-dark fa fa-home">首页</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="#" class="matrix-text-decoration link-dark fa fa-cog">系统维护</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="/verify" class="matrix-text-decoration link-dark fa fa-wpforms">实名认证</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="#" class="matrix-text-decoration link-dark fa fa-coffee">其他</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="about" class="matrix-text-decoration link-dark fa fa-send">商务合作</a>' +
                    '</li>';
                break;
            case '00002':
                htmlView =
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="/index" class="matrix-text-decoration link-dark fa fa-home">首页</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="#" class="matrix-text-decoration link-dark fa fa-coffee">其他</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="about" class="matrix-text-decoration link-dark fa fa-send">商务合作</a>' +
                    '</li>';
                break;
            case '00003':
                htmlView =
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="/index" class="matrix-text-decoration link-dark fa fa-home">首页</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="/verify" class="matrix-text-decoration link-dark fa fa-wpforms">实名认证</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="#" class="matrix-text-decoration link-dark fa fa-coffee">其他</a>' +
                    '</li>' +
                    '<li class="matrix-list-item matrix-border-radius my-2 py-3">' +
                    '<a href="about" class="matrix-text-decoration link-dark fa fa-send">商务合作</a>' +
                    '</li>';
                break;
        }
    }
    $('#permission-function-list').html(htmlView);
}
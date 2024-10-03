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
    $.ajax({
        url:'/api/userInfo',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                console.log(data);
                console.log('权限:'+data.handleData.authorities[0]);
                $('#headerView').attr('src', '/image'+data.handleData.headerImageUrl);
                //$('#nameLabel').html('您好!<strong>' + data.handleData.uAccount + '</strong>');
                //$('#organizationLabel').text(data.handleData.organization_name);
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
    var htmlView=
        '<a href="/index" class="btn btn-primary" id="home" role="button"><span class="fa fa-home"></span>&nbsp;首页</a>';
    function createMenuItem(iconClass, title, href) {
        return '<a href="'+href+'" class="btn btn-primary" id="home" role="button"><span class="'+iconClass+'"></span>&nbsp;'+title+'</a>';
    }

    // 动态创建导航菜单
    for (let item of authorities){
        switch (item){
            case '10001':
                htmlView += createMenuItem('fa fa-cog', '系统维护', '/manager');
                htmlView += createMenuItem('fas fa-id-card', '实名认证', '/verify');
                break;
            case '10002':
                htmlView += '';
                break;
            case '10003':
                htmlView += createMenuItem('fas fa-id-card', '实名认证', '/verify');
                break;
        }
    }
    htmlView+='<a href="/about" class="btn btn-primary" id="about" role="button"><span class="fas fa-paper-plane"></span>&nbsp;商务合作</a>';
    $('#btn-group-view').html(htmlView);
}
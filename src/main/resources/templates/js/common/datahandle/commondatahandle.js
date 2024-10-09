/**
 * 公共数据加载逻辑
 */
$(document).ready(function() {
    /** *按钮提示* **/
    const exit_tooltipTriggerEl = $('#exit-btn');
    const exit_tooltip = new bootstrap.Tooltip(exit_tooltipTriggerEl, {
        placement: 'bottom', // 放置位置
        title: '安全退出!' // 提示框的标题
    });

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
                $('#nameView').text(data.handleData.uAccount);
                createHtmlView(data.handleData.authorities);
                createOrganizationToolTip(data.handleData.organization_name);
            }
        },
        error: function(xhr, status, error) {
            console.error("请求失败: " +error);
            waringToast('平台提示','请求失败:' +error);
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
                htmlView += createMenuItem('fa-solid fa-warehouse', '仓库管理', '/warehouse');
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

function createOrganizationToolTip(content){
    const name_tooltipTriggerEl = $('#name-parent-view');
    const name_tooltip = new bootstrap.Tooltip(name_tooltipTriggerEl, {
        placement: 'bottom', // 放置位置
        title: '所属机构:'+content // 提示框的标题
    });
}

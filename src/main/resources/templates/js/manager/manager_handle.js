$(document).ready(function() {
    btnViewHandle();
    //freshViewDatas();
});

/**
 * 显示视图逻辑
 * */
function btnViewHandle() {
    // 绑定按钮点击事件
    $('#edit-user-info').click(function() {
        // 隐藏所有视图
        $('#view-user-info, #view-authority, #view-other').hide();
        // 显示人员管理视图
        $('#view-user-info').show();
        freshViewDatas();
    });
    $('#edit-authority').click(function() {
        // 隐藏所有视图
        $('#view-user-info, #view-authority, #view-other').hide();
        // 显示权限管理视图
        $('#view-authority').show();
        bindAuthorityView();
    });
    $('#edit-other').click(function() {
        // 隐藏所有视图
        $('#view-user-info, #view-authority, #view-other').hide();
        // 显示其他管理视图
        $('#view-other').show();
        // 也可以将内容复制到#view-container，如果需要的话
        // $('#view-container').html($('#view-other').html());
    });
}

function freshViewDatas(){
    if ($.fn.DataTable.isDataTable('#user-info-table')) {
        // 如果是，则销毁现有的 DataTables 实例
        $('#user-info-table').DataTable().destroy();
    }
    $('#user-info-table').DataTable({
        renderer:'bootstrap',//启用bootstrap渲染
        processing:true,//隐藏加载提示
        //paging: false, // 取消分页功能
        pageLength: 10, // 默认每页显示10行
        lengthChange: false,// 禁用改变每页显示行数的功能
        order:[],//取消默认排序查询
        language:{
            //url: '//cdn.datatables.net/plug-ins/2.1.7/i18n/zh.json'
            url: '../datatables/location/Chinese.json'
        },
        ajax: {
            url: '/api/query_allUserInfo_authority', // 替换为你的实际后台API地址
            type: 'POST', // 根据你的API需求，这里可以是"GET"或"POST"
            dataType: 'json',
            dataSrc: 'handleData'
        },
        columns: [
            { "data": "uAccount", "type": "string" },
            { "data": "organization_code", "type": "string"},
            { "data": "organization_name", "type": "string" }, // 机构字段名
            { "data": "authority_type", "type": "string"
                ,"render": function (data, type, row, meta) {
                    return '<strong class="text-danger">' + data + '</strong>';
                }
            },   // 角色字段名
            {
                // 这个列不映射到任何数据字段，我们将在这里添加按钮
                "render": function (data, type, row, meta) {
                    // 创建一个包含按钮的HTML字符串
                    return '<button class="btn btn-xs btn-info">编辑</button> ' +
                        '<button class="btn btn-xs btn-danger">删除</button> '+
                        '<button class="btn btn-xs btn-primary" style="display:none">保存</button>';
                }
            }
        ],
        // 使用createdRow回调来添加事件监听器（如果需要的话）
        "createdRow": function(row, data, dataIndex) {
            // 你可以在这里为按钮添加事件监听器
            $(row).find('button.btn-info').on('click', function() {
                // 编辑操作
                $(row).find('td:eq(1)').prop('contenteditable', true).focus();
                $(row).find('td:eq(2)').prop('contenteditable', true);
                $(row).find('button.btn-primary').show();
            });
            $(row).find('button.btn-danger').on('click', function() {
                // 删除操作
                confirmModal('平台提示','是否删除:' + data.uAccount+'？',function (confirmed){
                    if(confirmed){
                        remove(data.uAccount);
                    }else{
                        showToastTr('温馨提示','已取消操作!','error');
                    }
                });
            });

            $(row).find('button.btn-primary').on('click', function() {
                confirmModal('平台提示','是否确认修改:' + data.uAccount+'信息？',function (confirmed){
                    if(confirmed){
                        $(row).find('td:eq(1)').prop('contenteditable', false);
                        $(row).find('td:eq(2)').prop('contenteditable', false);
                        $(row).find('button.btn-primary').hide();
                        updateOrganization(data.uAccount,$(row).find('td:eq(1)').text(),$(row).find('td:eq(2)').text());
                    }else{
                        showToastTr('温馨提示','已取消操作!','error');
                        $(row).find('td:eq(1)').prop('contenteditable', false);
                        $(row).find('td:eq(2)').prop('contenteditable', false);
                        $(row).find('button.btn-primary').hide();
                    }
                });
            });
        }
    });
}

function bindAuthorityView(){
    $.ajax({
        url:'/api/query_all_authority',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if(response.handleType){
                //console.log(response.handleData.uAccount);
                const container = $('#user_authority_view'); // 获取父元素
                const handleData = response.handleData;
                const addedAccounts = new Set(); // 用于跟踪已经添加过的uAccount
                container.empty();
                handleData.forEach(function(itemTemp) {
                    if (!addedAccounts.has(itemTemp.uAccount)) {
                        const button = $('<button>')
                            .addClass('btn btn-sm btn-primary my-1') // 添加Bootstrap的按钮样式
                            .text(itemTemp.uAccount); // 设置按钮的文本
                        // 将按钮添加到父元素中
                        container.append(button);
                        // 标记为已添加
                        addedAccounts.add(itemTemp.uAccount);
                    }
                    // 如果需要处理重复项，可以在这里添加逻辑
                });
            }else{
                console.log(response.handleMessage);
            }
        },
        error: function(xhr, status, error) {
            waringToast('平台提示','请求失败:'+xhr.responseText);
        }
    });
}
/***
 * 删除请求
 * @param uAccount
 */
function remove(uAccount){
    $.ajax({
        url:'/api/remove_user',
        type: 'POST',
        data: {
            uAccount: uAccount
        },
        dataType: 'json',
        success: function(response) {
            if(response.handleType){
                showToastTr('温馨提示',response.handleMessage,'success');
                freshViewDatas();
            }else{
                showToastTr('温馨提示',response.handleMessage,'error');
            }
        },
        error: function(xhr, status, error) {
            //console.error("AJAX请求失败: " +xhr.responseText);
            waringToast('平台提示','请求失败:'+xhr.responseText);
        }
    });
}

/***
 * 更新机构信息
 * @param uAccount
 * @param organization_code
 * @param organization_name
 */
function updateOrganization(uAccount,organization_code,organization_name){
    $.ajax({
        url:'/api/fresh_user_organization',
        type: 'POST',
        data: {
            uAccount: uAccount,
            organization_code:organization_code,
            organization_name:organization_name
        },
        dataType: 'json',
        success: function(response) {
            if(response.handleType){
                showToastTr('温馨提示',response.handleMessage,'success');
                freshViewDatas();
            }else{
                showToastTr('温馨提示',response.handleMessage,'error');
            }
        },
        error: function(xhr, status, error) {
            //console.error("AJAX请求失败: " +xhr.responseText);
            waringToast('平台提示','请求失败:'+xhr.responseText);
        }
    });
}

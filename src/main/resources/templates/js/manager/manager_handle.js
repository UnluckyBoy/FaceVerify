$(document).ready(function() {
    btnViewHandle();
    //userInfoTableHandle();
    $('#user-info-table').DataTable({
        renderer:'bootstrap',//启用bootstrap渲染
        processing:true,//隐藏加载提示
        order:[],//取消默认排序查询
        language:{
            //url: '//cdn.datatables.net/plug-ins/2.1.7/i18n/zh.json'
            url: '../datatables/location/Chinese.json'
        },
        ajax: {
            url: '/api/query_userInfo_authority', // 替换为你的实际后台API地址
            type: 'POST', // 根据你的API需求，这里可以是"GET"或"POST"
            dataType: 'json',
            dataSrc: 'handleData'
        },
        columns: [
            { "data": "uAccount" },
            { "data": "organization_name" }, // 假设这是CloudStudio的字段名
            { "data": "authority_type" },   // 假设这是管理员的字段名
            {
                // 这个列不映射到任何数据字段，我们将在这里添加按钮
                "render": function (data, type, row, meta) {
                    // 创建一个包含按钮的HTML字符串
                    return '<button class="btn btn-xs btn-info">编辑</button> ' +
                        '<button class="btn btn-xs btn-danger">删除</button>';
                }
            }
        ],
        // 使用createdRow回调来添加事件监听器（如果需要的话）
        "createdRow": function(row, data, dataIndex) {
            // 你可以在这里为按钮添加事件监听器
            $(row).find('button.btn-info').on('click', function() {
                // 编辑操作
                alert('Edit button clicked for ' + data.uAccount);
            });
            $(row).find('button.btn-danger').on('click', function() {
                // 删除操作
                alert('Delete button clicked for ' + data.uAccount);
            });
        }
    });
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
        //userInfoTableHandle();
    });
    $('#edit-authority').click(function() {
        // 隐藏所有视图
        $('#view-user-info, #view-authority, #view-other').hide();
        // 显示权限管理视图
        $('#view-authority').show();
        // 也可以将内容复制到#view-container，如果需要的话
        // $('#view-container').html($('#view-authority').html());
    });
    $('#edit-other').click(function() {
        // 隐藏所有视图
        $('#view-user-info, #view-authority, #view-other').hide();
        // 显示其他管理视图
        $('#view-other').show();
        // 也可以将内容复制到#view-container，如果需要的话
        // $('#view-container').html($('#view-other').html());
    });
    // 可以设置一个默认视图
    // $('#view-user-info').show();
}

/***
 * 表格检索逻辑
 */
function userInfoTableHandle(){
    $.ajax({
        url:'/api/query_userInfo_authority',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                console.log(data);
                //addDataToTable(data.handleData);
            }
        },
        error: function(xhr, status, error) {
            console.error("请求失败: " +error);
            simpleToast('平台提示','请求失败:' +error);
        }
    });
}

/***
 * 动态添加数据进表里
 * @param data
 */
function addDataToTable(data){
    // 清空现有的tbody内容
    $('#user-info-table-body').empty();

    $.each(data, function(index, dataInfo) {
        var dataRow = $('<tr></tr>');

        var uAccountCell = $('<td class="text-center"></td>').text(dataInfo.uAccount);
        var organization_nameCell = $('<td class="text-center"></td>').text(dataInfo.organization_name);
        dataRow.append(uAccountCell);
        dataRow.append(organization_nameCell);
        //dataRow.append($('<td class="text-center"></td>').text(dataInfo.uAccount));
        //dataRow.append($('<td class="text-center"></td>').text(dataInfo.organization_name));
        dataRow.append($('<td class="text-center"></td>').text(dataInfo.authority_type));

        var actionsCell = $('<td class="text-center"></td>');
        var editButton = $('<button></button>').attr({
            type: 'button',
            class: 'btn btn-xs btn-info edit-button' // 添加一个类来标识编辑按钮
        }).text('编辑');
        var deleteButton = $('<button></button>').attr({
            type: 'button',
            class: 'btn btn-xs btn-danger delete-button' // 添加一个类来标识删除按钮
        }).text('删除');
        // 将按钮添加到操作单元格中
        actionsCell.append(editButton).append(' ').append(deleteButton);
        // 将操作单元格添加到新行中
        dataRow.append(actionsCell);
        // 将新行添加到tbody中
        $('#user-info-table-body').append(dataRow);
    });

    // 为编辑按钮添加事件监听器
    $('.edit-button').on('click', function() {
        // 找到当前按钮所在的行
        var row = $(this).closest('tr');
        // 获取行的数据
        var clickData = {
            mAccount: row.find('td:eq(0)').text(),
            organization: row.find('td:eq(1)').text(),
            role: row.find('td:eq(2)').text()
        };
        // 处理编辑逻辑（例如，打开一个模态框显示这些数据）
        console.log('编辑:', clickData);

        let uAccountCell = row.find('td:eq(0)'); // 重新获取单元格，因为它们是动态创建的
        let organization_nameCell = row.find('td:eq(1)');
        uAccountCell.prop('contenteditable', true).focus(); // 使第一个单元格获得焦点
        organization_nameCell.prop('contenteditable', true);

        /*监听失去焦点事件以保存更改*/
        uAccountCell.off('blur').on('blur', function() {
            //saveRowChanges($row);
            row.find('td:eq(0), td:eq(1)').prop('contenteditable', false);
        });
        organization_nameCell.off('blur').on('blur', function() {
            //saveRowChanges($row);
            row.find('td:eq(0), td:eq(1)').prop('contenteditable', false);
        });
    });

    // 为删除按钮添加事件监听器
    $('.delete-button').on('click', function() {
        // 找到当前按钮所在的行
        var row = $(this).closest('tr');
        // 获取行的数据（可选，如果需要的话）
        var clickData = {
            mAccount: row.find('td:eq(0)').text(),
            organization: row.find('td:eq(1)').text(),
            role: row.find('td:eq(2)').text()
        };
        // 处理删除逻辑（例如，发送一个AJAX请求到后端API来删除用户）
        console.log('删除:', clickData);
        // 从DOM中移除行（这里只是前端移除，实际删除需要在后端处理）
        //row.remove();
    });
}
$(document).ready(function() {
    btnViewHandle();
    userInfoTableHandle();
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
        // 也可以将内容复制到#view-container，如果需要的话
        // $('#view-container').html($('#view-user-info').html());
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
    const $rows = $('#tableBody tr');
    const perPage = 1; // 每页显示的行数
    let currentPage = 1; // 当前页码
    const totalPages = Math.ceil($rows.length / perPage); // 总页数

    function showPage(page) {
        // 隐藏所有行
        $rows.addClass('matrix-hide-view');
        // 计算当前页应该显示的行的索引范围
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        // 显示当前页的行
        $rows.slice(startIndex, endIndex).removeClass('matrix-hide-view');
        // 更新页面信息
        $('#pageInfo').text(`第 ${page} 页 / 共 ${totalPages} 页`);
    }
    // 初始化时显示第一页
    showPage(currentPage);
    // 绑定上一页和下一页的点击事件
    $('#prevPage').click(function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
    $('#nextPage').click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
    // 搜索功能（保留原样，但需要在搜索后重置分页）
    $('#searchInput').keyup(function() {
        const searchValue = $(this).val().toLowerCase();
        $rows.each(function() {
            const text = $(this).text().toLowerCase();
            $(this).toggleClass('matrix-hide-view', !text.includes(searchValue));
        });
        // 重置分页到第一页（可选，取决于你的需求）
        currentPage = 1;
        showPage(currentPage);
    });
}
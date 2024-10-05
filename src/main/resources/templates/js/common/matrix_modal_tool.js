/**
 * 简单弹窗
 * */
function warningModal(title,content,onCloseCallback){
    var modalHTML = `
        <div class="modal fade" id="warningModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <!-- 模态框头部 -->
              <div class="modal-header">
                <h4 class="modal-title">${title}</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <!-- 模态框内容 -->
              <div class="modal-body">
                <div class="flex-row">
                    <span class="text-danger"><i class="fa-solid fa-circle-exclamation"></i></span>
                    <div class="text-center">${content}</div>
                </div>
              </div>
              <!-- 模态框底部 -->
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button>
              </div>
            </div>
          </div>
        </div>
`;
    // 将Modal的HTML添加到body中
    $('body').append(modalHTML);
    $('#warningModal').modal({backdrop: 'static', keyboard: false});//禁用空白关闭
    // 显示Modal
    $('#warningModal').modal('show');
    // 监听模态框隐藏事件
    $('#warningModal').on('hide.bs.modal', function () {
        if (onCloseCallback && typeof onCloseCallback === 'function') {
            onCloseCallback();
        }
    });
}

/**
 * 确定、返回弹窗
 * */
function confirmModal(title,content,onConfirmCallback){
    // 移除已存在的模态框(防止重复添加)
    $('#confirmModal').remove();
    const modalHTML = `
        <div class="modal fade" id="confirmModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <!-- 模态框头部 -->
              <div class="modal-header">
                <h4 class="modal-title">${title}</h4>
                <button type="button" class="btn-close" id="close"></button>
              </div>
              <!-- 模态框内容 -->
              <div class="modal-body">
                <div class="d-flex justify-content-center align-items-center">
                    <span class="text-danger"><i class="fa-solid fa-circle-exclamation"></i></span>&nbsp;&nbsp;
                    <div class="text-center">${content}</div>
                </div>
              </div>
              <!-- 模态框底部 -->
              <div class="modal-footer d-flex justify-content-between">
                <button type="button" class="btn btn-primary" id="confirm-btn">确定</button>
                <button type="button" class="btn btn-light" id="cancel-btn">取消</button>
              </div>
            </div>
          </div>
        </div>
`;
    // 将Modal的HTML添加到body中
    $('body').append(modalHTML);
    $('#confirmModal').modal({backdrop: 'static', keyboard: false});//禁用空白关闭
    // 显示Modal
    $('#confirmModal').modal('show');
    // 为按钮添加点击事件
    $('#confirm-btn').on('click', function() {
        if (typeof onConfirmCallback === 'function') {
            onConfirmCallback(true);
        }
        $('#confirmModal').modal('hide'); // 关闭模态框
    });
    $('#cancel-btn').on('click', function() {
        if (typeof onConfirmCallback === 'function') {
            onConfirmCallback(false);
        }
        $('#confirmModal').modal('hide'); // 关闭模态框
    });
    $('#close').on('click', function() {
        if (typeof onConfirmCallback === 'function') {
            onConfirmCallback(false);
        }
        $('#confirmModal').modal('hide'); // 关闭模态框
    });
}

/***
 * 弹窗
 * @param title
 * @param content
 */
function waringToast(title,content){
    let toastHTML = `
        <div class="toast matrix-toast show" id="simpleToast">
            <div class="toast-header">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="matrix-toast-body matrix-border-radius-1 flex-row toast-body text-center">
                <span class="text-danger fa fa-warning"></span>
                <strong>${content}</strong>
            </div>
        </div>
    `;
    $('body').append(toastHTML);
}
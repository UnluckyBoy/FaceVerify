/**
 * 简单弹窗
 * */
function simple_modal(title,content,onCloseCallback){
    var modalHTML = `
        <div class="modal fade" id="simple_modal">
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
    // 显示Modal
    $('#simple_modal').modal('show');
    // 监听模态框隐藏事件
    $('#simple_modal').on('hide.bs.modal', function () {
        if (onCloseCallback && typeof onCloseCallback === 'function') {
            onCloseCallback();
        }
    });
}

function waringToast(title,content){
    let toastHTML = `
        <div class="toast matrix-toast show" id="simpleToast">
            <div class="toast-header">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body matrix-toast-body text-center">
                <span class="text-danger fa fa-warning"></span>
                <p>${content}</p>
            </div>
        </div>
    `;
    $('body').append(toastHTML);
}
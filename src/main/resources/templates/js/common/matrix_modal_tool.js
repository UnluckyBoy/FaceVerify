/**
 * 简单弹窗
 * */
function simple_modal(title,content){
    var modalHTML = `
        <div class="modal fade" id="simpleModal" tabindex="-1" role="dialog" aria-labelledby="simpleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="simpleModalLabel">${title}</h5>
                        <span class="close" data-dismiss="modal" aria-label="Close">
                            <i class="fa fa-close" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
<!--                        <button type="button" class="btn btn-secondary close" data-dismiss="modal">Close</button>  -->
                    </div>
                </div>
            </div>
        </div>`;
    // 将Modal的HTML添加到body中
    $('body').append(modalHTML);
    // 显示Modal
    $('#simpleModal').modal('show');
}

function simPleToast(title,content){
    let toastHTML = `
        <div class="toast matrix-toast show" id="simpleToast">
            <div class="toast-header">
                <strong class="me-auto">
                    <span class="text-danger fa fa-warning"><!--<i class="fa fa-warning" aria-hidden="true" /></i>-->
                    </span>${title}
                </strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body matrix-toast-body text-center">
                <p>${content}</p>
            </div>
        </div>
    `;
    $('body').append(toastHTML);
    //new bootstrap.Toast($('#toast')).show();
}
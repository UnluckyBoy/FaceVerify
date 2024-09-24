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
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
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
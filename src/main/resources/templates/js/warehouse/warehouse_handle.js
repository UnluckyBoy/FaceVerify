$(document).ready(function() {
    createViewHandle();
});

function createViewHandle() {
    // 绑定按钮点击事件
    $('#warehouse-manager').click(function() {
        // 隐藏所有视图
        $('#view-generate-barcode, #view-warehouse-manager, #view-other').hide();
        // 显示权限管理视图
        $('#view-warehouse-manager').show();
    });
    $('#generate-barcode').click(function() {
        // 隐藏所有视图
        $('#view-generate-barcode, #view-warehouse-manager, #view-other').hide();
        // 显示人员管理视图
        $('#view-generate-barcode').show();
        getMedicineName();
    });
    $('#other').click(function() {
        // 隐藏所有视图
        $('#view-generate-barcode, #view-warehouse-manager, #view-other').hide();
        // 显示其他管理视图
        $('#view-other').show();
    });
}

function getMedicineName(){
    $.ajax({
        url:'/MedicineApi/queryMedicineBaseInfo',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if(response.handleType){
                console.log(response.handleData);
                if (response.handleType) {
                    const medicineData = {}; // 创建对象存储药品名称和价格键值对

                    // 获取select元素
                    const selectElement = $('#medicine-select-view');
                    // 清空现有的option项
                    selectElement.empty();
                    // 添加一个默认的option项
                    selectElement.append('<option selected>请选择药品</option>');
                    // 遍历handleData数组，并动态添加option项
                    if (Array.isArray(response.handleData)) {
                        response.handleData.forEach(function(item) {
                            medicineData[item.medicine_name] = item.medicine_price; // 将药品名称和价格存储到对象中
                            selectElement.append('<option value="' + item.medicine_code + '">' + item.medicine_name + '</option>');
                        });
                    } else {
                        waringToast('平台提醒','数据异常:handleData不是一个数组!');
                    }
                    selectElement.change(function() {
                        const selectedValue = $(this).val(); // 获取选中的值
                        const selectedText = $(this).find('option:selected').text(); // 获取选中的文本
                        const price= medicineData[selectedText];
                        $('#medicine-code-label').text(selectedValue);
                        $('#medicine-price-label').text(price);
                    });
                }
            }
        },
        error: function(xhr, status, error) {
            waringToast('平台提示','请求失败:'+xhr.responseText);
        }
    });
}
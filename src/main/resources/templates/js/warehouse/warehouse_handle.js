$(document).ready(function() {
    createViewHandle();
});
/**
 * 仓库管理主视图创建
 * **/
function createViewHandle() {
    /** 绑定按钮点击事件 **/
    /** 仓库管理按钮组视图 **/
    $('#warehouse-manager').click(function() {
        // 隐藏所有视图
        $('#view-generate-barcode, #view-warehouse-manager, #view-other').hide();
        // 显示权限管理视图
        $('#view-warehouse-manager').show();
        createWareHouseView();
    });

    $('#generate-barcode').click(function() {
        // 隐藏所有视图
        $('#view-generate-barcode, #view-warehouse-manager, #view-other').hide();
        // 显示人员管理视图
        $('#view-generate-barcode').show();
        getMedicineName();
        createMedicineBarcode();
    });
    $('#other').click(function() {
        // 隐藏所有视图
        $('#view-generate-barcode, #view-warehouse-manager, #view-other').hide();
        // 显示其他管理视图
        $('#view-other').show();
    });
}
/**
 * 出库、入库等视图创建
 * **/
function createWareHouseView(){
    $('#addMedicine').click(function() {
        $('#addMedicineView, #medicineDictionaryView, #receiveMedicineView, #dispatchMedicineView').hide();
        $('#addMedicineView').show();
    });
    $('#medicineDictionary').click(function() {
        $('#addMedicineView, #medicineDictionaryView, #receiveMedicineView, #dispatchMedicineView').hide();
        $('#medicineDictionaryView').show();
    });
    $('#receiveMedicine').click(function() {
        $('#addMedicineView, #medicineDictionaryView, #receiveMedicineView, #dispatchMedicineView').hide();
        $('#receiveMedicineView').show();
    });
    $('#dispatchMedicine').click(function() {
        $('#addMedicineView, #medicineDictionaryView, #receiveMedicineView, #dispatchMedicineView').hide();
        $('#dispatchMedicineView').show();
    });
}

/**
 * 发起后台查询获得药剂，名并绑定到选择器
 */
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
                    const selectElement = $('#medicine-select-view');
                    // 获取select元素
                    clearGenerateView();//清空所有
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

/***
 * 清空生成条码视图组件
 */
function clearGenerateView(){
    $('#medicine-select-view').empty();
    $('#medicine-code-label').text('');
    $('#medicine-price-label').text('');
    $('#medicine-create-time').val('');
    $('#barcode-num').val('');
}

function createMedicineBarcode(){
    $('#batch-generate-barcode').click(function (){
        const medicine_code=$('#medicine-code-label').text().trim();
        const create_time=$('#medicine-create-time').val().trim();
        const barcode_num=$('#barcode-num').val().trim();
        console.log("时间:"+create_time);
        if(!(isEmptyString(medicine_code))&&!(isEmptyString(create_time))&&!(isEmptyString(barcode_num))){
            $.ajax({
                url:'/MedicineApi/queryNearMedicineInfo',
                type: 'POST',
                data:{
                    medicine_code:medicine_code
                },
                dataType: 'json',
                success: function(response) {
                    if(response.handleType){
                        console.log(response.handleData);
                        if (response.handleType) {
                            printBarcode(response.handleData,create_time,barcode_num);
                            // for (let i = 0; i < barcode_num; i++){
                            //     printBarcode(response.handleData,create_time,barcode_num);
                            // }
                        }
                    }
                },
                error: function(xhr, status, error) {
                    waringToast('平台提示','请求失败:'+xhr.responseText);
                }
            });
        }else{
            waringToast('平台提示','请检查输入操作');
        }
    });
}
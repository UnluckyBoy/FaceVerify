$(document).ready(function() {
    createViewHandle();
    // $('#warehouseManager').click(function (){
    //     $('#dropdownMenuView').show();
    // });
});
/**
 * 仓库管理主视图创建
 * **/
function createViewHandle() {
    /** 绑定按钮点击事件 **/
    /** 仓库管理按钮组视图 **/
    $('#warehouseManager').on('click',function() {
        // 隐藏所有视图
        $('#view-generate-barcode, #view-warehouse-manager, #view-other').hide();
        $('#view-warehouse-manager').show();
        createWareHouseView();
    });

    $('#generate-barcode').on('click',function() {
        // 隐藏所有视图
        $('#view-generate-barcode, #view-warehouse-manager, #view-other').hide();
        $('#view-generate-barcode').show();
        getMedicineName();
        createMedicineBarcode();
    });
    $('#other').on('click',function() {
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
    /**药剂创建视图逻辑**/
    $('#addMedicine').on('click', function() {
        $('#commonWareHouseView').show();
        const content = `  
            <h6 class="text-center">药剂创建</h6>  
            <div class="matrix-only-flex-display matrix-only-flex-content matrix-item-center flex-column mt-2">  
                <div class="col-md-6">  
                    <div class="matrix-only-flex-content flex-column matrix-only-flex-content matrix-item-center">  
                        <div class="matrix-item-center flex-row col-md-4 p-1 gap-2">  
                            <label class="col-form-label text-center">药剂编码:</label>  
                            <strong class="text-center" id="addMedicineCode"></strong>  
                        </div>  
                        <div class="col-md-4 p-1">  
                            <div class="form-floating">  
                                <input type="text" class="form-control" id="addMedicineNameInput" placeholder="药剂名称" name="addMedicineNameInput">  
                                <label for="addMedicineNameInput">药剂名称</label>  
                            </div>  
                        </div>  
                        <div class="col-md-4 p-1">  
                            <div class="form-floating">  
                                <input type="text" class="form-control" id="addMedicinePriceInput" placeholder="价格" name="addMedicinePriceInput">  
                                <label for="addMedicinePriceInput">价格(￥)</label>  
                            </div>  
                        </div>
                        <div class="col-md-4 p-1">  
                            <div class="form-floating">  
                                <input type="text" class="form-control" id="addMedicineRetailInput" placeholder="零售价格" name="addMedicineRetailInput">  
                                <label for="addMedicineRetailInput">零售价格(￥)</label>  
                            </div>  
                        </div>
                        <div class="flex-row p-1 gap-2 matrix-item-center">  
                            <button type="button" class="btn btn-sm btn-success" id="createMedicineBtn"><span><i class="fa-regular fa-square-plus"></i></span>&nbsp;添加</button>  
                            <button type="button" class="btn btn-sm btn-primary" id="saveMedicineBtn"><span><i class="fa-regular fa-floppy-disk"></i></span>&nbsp;保存</button>  
                        </div>  
                    </div>  
                </div>  
            </div>  
        `;
        $('#commonWareHouseView').html(content);

        $('#createMedicineBtn').click(function (){
            addMedicineBaseInfo();
            $('#addMedicineNameInput').val('');
            $('#addMedicinePriceInput').val('');
            $('#addMedicineRetailInput').val('');
        });
        $('#saveMedicineBtn').click(function (){
            insertMedicineBaseInfo();
        });
    });

    /**药剂入库视图逻辑**/
    $('#medicineDictionary').on('click',function() {
        $('#commonWareHouseView').show();
        const content = `  
            <h6 class="text-center">药剂字典维护</h6>
            <div class="container mt-2">
               <table id="medicineDictionaryTable" class="matrix-common-table">
                  <thead>
                  <tr>
                     <th>药剂编码</th>
                     <th>药剂名称</th>
                     <th>药剂价格(￥)</th>
                     <th>零售价格(￥)</th>
                     <th>创建日期</th>
                     <th>操作</th>
                  </tr>
                  </thead>
                  <tbody id="medicineTableBody">
                     <!--动态加载-->
                  </tbody>
               </table>            
            </div>  
        `;
        $('#commonWareHouseView').html(content);
        bindMedicineDataTable();
    });
    $('#receiveMedicine').on('click',function() {
        $('#commonWareHouseView').show();
        const content = `  
            <h6 class="text-center">药剂入库</h6>
            <div class="matrix-only-flex-display matrix-only-flex-content matrix-item-center flex-column mt-2">  
                <div class="col-md-6">  
                    <div class="matrix-only-flex-content flex-column matrix-only-flex-content matrix-item-center">  
                        <div class="matrix-item-center flex-row col-md-4 p-1 gap-2">  
                            <label class="col-form-label text-center">药剂编码:</label>  
                            <strong class="text-center" id="inWareHouseCode"></strong>  
                        </div>  
                        <div class="col-md-4 p-1">  
                            <div class="form-floating">  
                                <input type="text" class="form-control" id="inWareHouseNum" placeholder="入库数量" name="inWareHouseNum">  
                                <label for="inWareHouseNum">入库数量</label>  
                            </div>  
                        </div>
                        <div class="flex-row p-1 gap-2 matrix-item-center">
                            <button type="button" class="btn btn-sm btn-success" id="initCamera"><span><i class="fa-solid fa-video"></i></span>&nbsp;启动摄像头</button>
                            <button type="button" class="btn btn-sm btn-primary" id="inWareHouseSave"><span><i class="fa-regular fa-floppy-disk"></i></span>&nbsp;药剂入库</button>
                        </div>
                        <div class="d-flex justify-content-center p-1">
                                <video class="matrix-border-radius" id="barcodeVideo" width="256" height="192" autoplay></video>
                                <canvas id="barcodeCanvas" width="256" height="192" style="display:none;"></canvas>
                        </div>
                    </div>  
                </div>  
            </div>  
        `;
        $('#commonWareHouseView').html(content);
        $('#initCamera').on('click',function (){
            decodeBarcodeHandle();
        });
    });


    $('#dispatchMedicine').on('click',function() {
        $('#commonWareHouseView').show();
        const content = `  
            <h6 class="text-center">药剂出库</h6>
               <div class="container mt-2">
                  <p>药剂出库视图</p>
               </div>  
        `;
        $('#commonWareHouseView').html(content);
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

/**
 * 生成打印条码
 */
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
                        //console.log(response.handleData);
                        if (response.handleType) {
                            doPrint(response.handleData,create_time,barcode_num,"药剂条码");
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
/**
 *打印
 * */
function doPrint(data,create_time,barcode_num,printName){
    $.ajax({
        url:'/MedicineApi/getPrintStyle',
        type: 'POST',
        data:{
            printName:printName
        },
        dataType: 'json',
        success: function(response) {
            if(response.handleType){
                printBarcode(data,create_time,barcode_num,response.handleData.print_style);
            }else{
                waringToast('平台提示',response.handleMessage);
            }
        },
        error: function(xhr, status, error) {
            waringToast('平台提示','请求失败:'+xhr.responseText);
        }
    });
}

/**
 * 获取最新药剂编码,生成新编码
 */
function addMedicineBaseInfo(){
    $.ajax({
        url:'/MedicineApi/queryNearMedicineCode',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if(response.handleType){
                console.log('最新编码:'+response.handleData.medicine_code);
                const addCode=incrementCode(response.handleData.medicine_code);//生成新编码
                $('#addMedicineCode').text(addCode);
            }else{
                waringToast('平台提示',response.handleMessage);
            }
        },
        error: function(xhr, status, error) {
            waringToast('平台提示','请求失败:'+xhr.responseText);
        }
    });
}

/**
 * 药剂基础字典写入
 */
function insertMedicineBaseInfo(){
    const code=$('#addMedicineCode').text();
    const name=$('#addMedicineNameInput').val().trim();
    const price=$('#addMedicinePriceInput').val().trim();
    const retail=$('#addMedicineRetailInput').val().trim();
    if(!(isEmptyString(code))&&!(isEmptyString(name))&&!(isEmptyString(price))){
        $.ajax({
            url:'/MedicineApi/addMedicineBaseInfo',
            type: 'POST',
            data:{
                medicine_code:code,
                medicine_name:name,
                medicine_price:price,
                medicine_retail:retail
            },
            dataType: 'json',
            success: function(response) {
                if(response.handleType){
                    successToast('平台提示',response.handleMessage);
                    clearCreateView();
                }else{
                    waringToast('平台提示',response.handleMessage);
                }
            },
            error: function(xhr, status, error) {
                waringToast('平台提示','请求失败:'+xhr.responseText);
            }
        });
    }else {
        waringToast('平台提示','请检查输入!');
    }
}

/***
 * 创建完之后清空视图
 */
function clearCreateView(){
    $('#addMedicineCode').text('');
    $('#addMedicineNameInput').val('');
    $('#addMedicinePriceInput').val('');
    $('#addMedicineRetailInput').val('');
}

/**
 * 绑定药剂字典维护表数据
 */
function bindMedicineDataTable(){
    if ($.fn.DataTable.isDataTable('#medicineDictionaryTable')) {
        // 如果是,则销毁现有的 DataTables 实例
        $('#medicineDictionaryTable').DataTable().destroy();
    }
    $('#medicineDictionaryTable').DataTable({
        renderer:'bootstrap',//启用bootstrap渲染
        processing:true,//隐藏加载提示
        //paging: false, // 取消分页功能
        pageLength: 10, // 默认每页显示10行
        lengthChange: false,// 禁用改变每页显示行数的功能
        order:[],//取消默认排序查询
        language:{
            url: '../datatables/location/Chinese.json'
        },
        ajax: {
            url: '/MedicineApi/queryMedicineBaseInfo',
            type: 'POST',
            dataType: 'json',
            dataSrc: 'handleData'
        },
        columns: [
            { "data": "medicine_code", "type": "string" },
            { "data": "medicine_name", "type": "string"},
            // { "data": "medicine_price", "type": "string" },
            {
                "data": "medicine_price",
                "type": "num", // 虽然这主要用于排序，但我们可以设置它，然后在渲染时格式化输出
                "render": function (data, type, row, meta) {
                    const price = parseFloat(data);
                    if (!isNaN(price)) { // 检查转换是否成功
                        return price.toFixed(2);
                    } else {
                        return data;
                    }
                }
            },
            {
                "data": "medicine_retail",
                "type": "num", // 虽然这主要用于排序，但我们可以设置它，然后在渲染时格式化输出
                "render": function (data, type, row, meta) {
                    const price = parseFloat(data);
                    if (!isNaN(price)) { // 检查转换是否成功
                        return price.toFixed(2);
                    } else {
                        return data;
                    }
                }
            },
            { "data": "medicine_time", "type": "string"
                ,"render": function (data, type, row, meta) {
                    return '<strong>' + data + '</strong>';
                }
            },
            {
                // 这个列不映射到任何数据字段,在这里添加按钮
                "render": function (data, type, row, meta) {
                    // 创建一个包含按钮的HTML字符串
                    return '<button class="btn btn-xs btn-info">编辑</button> ' +
                        // '<button class="btn btn-xs btn-danger">删除</button> '+
                        '<button class="btn btn-xs btn-primary" style="display:none">保存</button>';
                }
            }
        ],
        // 使用createdRow回调来添加事件监听器（如果需要的话）
        "createdRow": function(row, data, dataIndex) {
            // 按钮添加事件监听器
            $(row).find('button.btn-info').on('click', function() {
                // 编辑操作
                $(row).find('td:eq(1)').prop('contenteditable', true).focus();
                $(row).find('td:eq(2)').prop('contenteditable', true);
                $(row).find('button.btn-primary').show();
            });
            // $(row).find('button.btn-danger').on('click', function() {
            //     // 删除操作
            //     confirmModal('平台提示','是否删除:' + data.uAccount+'？',function (confirmed){
            //         if(confirmed){
            //             remove(data.uAccount);
            //         }else{
            //             showToastTr('温馨提示','已取消操作!','error');
            //         }
            //     });
            // });
            $(row).find('button.btn-primary').on('click', function() {
                confirmModal('平台提示','是否确认修改:' + data.medicine_name+'信息？',function (confirmed){
                    if(confirmed){
                        $(row).find('td:eq(1)').prop('contenteditable', false);
                        $(row).find('td:eq(2)').prop('contenteditable', false);
                        $(row).find('button.btn-primary').hide();
                        //updateOrganization(data.uAccount,$(row).find('td:eq(1)').text(),$(row).find('td:eq(2)').text());
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

/***
 * 入库逻辑
 */
function decodeBarcodeHandle(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // 启动摄像头
        navigator.mediaDevices.getUserMedia({video: true})
            .then(function (stream) {
                const videoElement = $('#barcodeVideo')[0]; // 获取DOM元素
                videoElement.srcObject = stream; // 设置媒体流
                videoElement.play(); // 开始播放视频
                $('#barcodeVideo').show(); // 显示视频元素

                // 设置6秒后暂停视频
                setTimeout(function() {
                    videoElement.pause(); // 暂停视频

                    // 创建一个canvas元素并设置其大小与视频元素相同
                    const canvas = $('#barcodeCanvas')[0];
                    canvas.width = videoElement.videoWidth;
                    canvas.height = videoElement.videoHeight;
                    // 获取canvas的2D绘图上下文
                    const context = canvas.getContext('2d');
                    // 将视频当前帧绘制到canvas上
                    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    // 将canvas内容转换为Base64编码的字符串（PNG格式）
                    const base64Image = (canvas.toDataURL('image/png')).split(',')[1];//去掉前缀
                    console.log('图片Base64编码:'+base64Image);

                    $('#barcodeVideo').hide();
                    decodeBarcode(base64Image);
                }, 6000); // 6000毫秒 = 6秒
            })
            .catch(function (error) {
                waringToast('体统提示', '无法启动摄像头：', error);
            });
    }else{
        waringToast('温馨提示','您的浏览器不支持获取摄像设备API');
    }
}

/**
 * 向后端发送条形码数据解码
 */
function decodeBarcode(base64Image){
    $.ajax({
        url:'/MedicineApi/decodeBarcode',
        type: 'POST',
        data:{
            image:base64Image
        },
        dataType: 'json',
        success: function(response) {
            if(response.handleType){
                console.log('信息:'+response.handleData.decodeResult);
            }else{
                waringToast('平台提示',response.handleMessage);
            }
        },
        error: function(xhr, status, error) {
            waringToast('平台提示','请求失败:'+xhr.responseText);
        }
    });
}
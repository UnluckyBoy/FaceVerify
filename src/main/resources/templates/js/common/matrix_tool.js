function isEmptyString(str) {
    return str === null || str === undefined || str.trim().length === 0;
}

/**
 * 获取系统时间
 * */
function getCurrentTime() {
    // 创建Date对象来获取当前日期和时间
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    // 返回时间
    return formattedTime;
}

/**
 * 显示弹窗
 * */
function showToastTr(title,content,result){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "6000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    switch (result) {
        case 'success':
            toastr['success'](content + '<br>' + getCurrentTime(), title);
            break;
        case 'error':
            toastr['warning'](content + '<br>' + getCurrentTime(), title);
            break;
    }
}

function printBarcode(ObjectDatas,createTime,printCount){
    const printConfig=`{
    "panels": [
        {
            "index": 0,
            "name": 1,
            "height": 30,
            "width": 50,
            "paperHeader": 0,
            "paperFooter": 78,
            "printElements": [
                {
                    "options": {
                        "left": 4,
                        "top": 3,
                        "height": 12,
                        "width": 85,
                        "title": "品名",
                        "field": "medicineName",
                        "testData": "山楂柠檬茶(1号)",
                        "coordinateSync": false,
                        "widthHeightSync": false,
                        "fontSize": 7.5,
                        "qrCodeLevel": 0,
                        "fontWeight": "bold"
                    },
                    "printElementType": {
                        "title": "文本",
                        "type": "text"
                    }
                },
                {
                    "options": {
                        "left": 91.5,
                        "top": 3,
                        "height": 12,
                        "width": 46,
                        "title": "售价",
                        "field": "medicinePrice",
                        "testData": "20.66",
                        "coordinateSync": false,
                        "widthHeightSync": false,
                        "fontSize": 7.5,
                        "qrCodeLevel": 0,
                        "right": 140.25,
                        "bottom": 13.5,
                        "vCenter": 119.25,
                        "hCenter": 8.625,
                        "fontFamily": "STHeitiSC-Light",
                        "fontWeight": "bold"
                    },
                    "printElementType": {
                        "title": "文本",
                        "type": "text"
                    }
                },
                {
                    "options": {
                        "left": 3,
                        "top": 18,
                        "height": 36,
                        "width": 134,
                        "title": "ID",
                        "barcodeType": "code128",
                        "testData": "YP1002",
                        "coordinateSync": false,
                        "widthHeightSync": false,
                        "field": "medicineCode"
                    },
                    "printElementType": {
                        "title": "条形码",
                        "type": "barcode"
                    }
                },
                {
                    "options": {
                        "left": 84,
                        "top": 67,
                        "height": 9.75,
                        "width": 51,
                        "title": "批号",
                        "right": 148.5,
                        "bottom": 77.2500057220459,
                        "vCenter": 117,
                        "hCenter": 72.3750057220459,
                        "field": "medicineBatch",
                        "testData": "0001",
                        "coordinateSync": false,
                        "widthHeightSync": false,
                        "fontFamily": "STHeitiSC-Light",
                        "qrCodeLevel": 0
                    },
                    "printElementType": {
                        "title": "这是更新后的元素",
                        "type": "text"
                    }
                },
                {
                    "options": {
                        "left": 3,
                        "top": 67,
                        "height": 9.75,
                        "width": 76.5,
                        "title": "日期",
                        "right": 125.25,
                        "bottom": 77.2500057220459,
                        "vCenter": 65.25,
                        "hCenter": 72.3750057220459,
                        "field": "medicineCreateTime",
                        "testData": "2024-10-09",
                        "coordinateSync": false,
                        "widthHeightSync": false,
                        "qrCodeLevel": 0,
                        "fontFamily": "STHeitiSC-Light"
                    },
                    "printElementType": {
                        "title": "这是更新后的元素",
                        "type": "text"
                    }
                }
            ],
            "paperNumberLeft": 58.5,
            "paperNumberTop": 57,
            "paperNumberDisabled": true,
            "paperNumberContinue": true,
            "watermarkOptions": {
                "content": "",
                "fillStyle": "rgba(184, 184, 184, 0.3)",
                "fontSize": "14px",
                "rotate": 25,
                "width": 200,
                "height": 200,
                "timestamp": false,
                "format": "YYYY-MM-DD HH:mm"
            },
            "panelLayoutOptions": {
                "layoutType": "column",
                "layoutRowGap": 0,
                "layoutColumnGap": 0
            }
        }
    ]
}`;

    console.log('打印次数:'+printCount);

    /**单独打印方案**/
    // const printTemplate = new hiprint.PrintTemplate({template: JSON.parse(printConfig)});<!--$('#barcode-textarea').val()-->
    // const html = printTemplate.getHtml([{
    //     medicineName: ObjectDatas.medicine_name, medicinePrice: ObjectDatas.medicine_price, medicineCode: ObjectDatas.medicine_code,
    //     medicineCreateTime:createTime,medicineBatch:(ObjectDatas.medicine_batch_number+1)
    // }]);
    // printTemplate.printByHtml(html);

    /**批量打印方案**/
    const printTemplates=[];
    for(let i=0;i<printCount;i++){
        const printTemplate = new hiprint.PrintTemplate({template: JSON.parse(printConfig)});
        printTemplates.push(printTemplate);
    }
    // hiprint.print({
    //     templates:[
    //         {template:printTemplates[0], data:[{medicineName: ObjectDatas.medicine_name, medicinePrice: ObjectDatas.medicine_price, medicineCode: ObjectDatas.medicine_code, medicineCreateTime:createTime,medicineBatch:(ObjectDatas.medicine_batch_number+1)}]},
    //         {template:printTemplates[1], data:[{medicineName: ObjectDatas.medicine_name, medicinePrice: ObjectDatas.medicine_price, medicineCode: ObjectDatas.medicine_code, medicineCreateTime:createTime,medicineBatch:(ObjectDatas.medicine_batch_number+1)}]}
    //     ]
    // });

    const templatesArray = printTemplates.map((template, index) => {
        return {
            template: template,
            data: [{
                medicineName: ObjectDatas.medicine_name,
                medicinePrice: ObjectDatas.medicine_price,
                medicineCode: ObjectDatas.medicine_code,
                medicineCreateTime: createTime,
                medicineBatch: (ObjectDatas.medicine_batch_number + 1) // 如果每个批次需要递增，这里加上了 index
            }]
        };
    });
    hiprint.print({
        templates: templatesArray
    });
}
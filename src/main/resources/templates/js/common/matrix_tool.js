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
    console.log('打印次数:'+printCount);
    const printTemplate = new hiprint.PrintTemplate({template: JSON.parse($('#barcode-textarea').val())});
    const $html = printTemplate.getHtml([{
        medicineName: ObjectDatas.medicine_name, medicinePrice: ObjectDatas.medicine_price, medicineCode: ObjectDatas.medicine_code,
        medicineCreateTime:createTime,medicineBatch:(ObjectDatas.medicine_batch_number+1)
    }]);
    printTemplate.printByHtml($html);

    // 创建数组来存储 PrintTemplate 实例
    // const printTemplates = [];
    // for (let i = 0; i < printCount; i++) {
    //     const printTemplate = new hiprint.PrintTemplate({ template: JSON.parse($('#barcode-textarea').val())});
    //     // 将创建的 PrintTemplate 实例添加到数组中
    //     printTemplates.push(printTemplate);
    // }
    // for (let i = 0; i < printCount; i++) {
    //     const $html = printTemplates[i].getHtml([{
    //         medicineName: ObjectDatas.medicine_name,
    //         medicinePrice: ObjectDatas.medicine_price,
    //         medicineCode: ObjectDatas.medicine_code,
    //         medicineCreateTime: createTime,
    //         medicineBatch: (ObjectDatas.medicine_batch_number + 1) // 如果需要每次打印的批次号都不同，可以在这里加上i
    //     }]);
    //     printTemplates[i].printByHtml($html);
    // }
}
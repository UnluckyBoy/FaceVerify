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

/**
 * 公共打印方法
 * */
function printBarcode(ObjectDatas,createTime,printCount,printConfig){
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
    //将批量打印存入map
    const templatesArray = printTemplates.map((template, index) => {
        return {
            template: template,
            data: [{
                medicineName: ObjectDatas.medicine_name,
                medicinePrice: ObjectDatas.medicine_price,
                medicineCode: 'image/'+ObjectDatas.medicine_code,
                //medicineCode: 'https://img0.baidu.com/it/u=1711875334,20344900&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
                medicineCreateTime: createTime,
                medicineBatch: (ObjectDatas.medicine_batch_number) // 批次已在后台+1需要递增，这里加上了 index
            }]
        };
    });
    hiprint.print({
        templates: templatesArray
    });
}

/**
 * 生成新编码
 * @param code
 * @returns {string}
 */
function incrementCode(code) {
    // 正则表达式匹配字符和数字部分
    const match = code.match(/([A-Za-z]+)(\d+)/);
    if (!match) {
        throw new Error('输入格式不正确');
    }
    // 提取字符和数字部分
    const letters = match[1];
    const number = parseInt(match[2], 10); // 将数字部分转换为整数
    // 数字部分加1
    const incrementedNumber = number + 1;
    // 组合成新的编码,使用 padStart 确保数字部分的长度与原字符串中的数字长度一致,且用0填充
    const newCode = `${letters}${incrementedNumber.toString().padStart(match[2].length, '0')}`;
    return newCode;
}
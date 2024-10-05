var idCardImage;
var image;
$(document).ready(function() {
    // 浏览器兼容性检查
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // 启动摄像头
        $('#capture_start').click(function (){
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    $('#video').prop('srcObject', stream)[0].play();
                    $('#video').show(); // 显示视频元素
                })
                .catch(function(error) {
                    console.error("无法启动摄像头：", error);
                });
        });
        /**
         * 拍身份证
         * */
        $('#capture_idCard').click(function () {
            const icCard_canvas = $('#canvas')[0];
            const icCard_context = icCard_canvas.getContext('2d');
            icCard_context.drawImage($('#video')[0], 0, 0, 256, 192);
            // 将canvas转换为图片并显示
            const idCard_dataURL = icCard_canvas.toDataURL('image/png');
            $('#photo_idCard').prop('src', idCard_dataURL).show();
            idCardImage = idCard_dataURL.split(',')[1];
            console.log('身份证图片已显示,Base64 编码:' + idCardImage);
            $.ajax({
                url: '/BaiduApi/verify_idcard',
                type: 'POST',
                dataType: 'json',
                data: {
                    image: idCardImage
                }, // 发送到服务器的数据
                success: function(data) {
                    //console.log('请求成功:'+data.handleType); // 打印返回的数据
                    if(data.handleType){
                        console.log('请求成功:'+data.handleData);
                        const result=JSON.parse(data.handleData);
                        $('#real_name').val(result.words_result.姓名.words);
                        $('#idCard').val(result.words_result.公民身份号码.words);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('请求失败: ' + textStatus, errorThrown);
                    waringToast('温馨提示','请求失败: ' + textStatus, errorThrown);
                }
            });
        });

        /**
         * 拍人脸
         */
        $('#capture').click(function (){
            const canvas = $('#canvas')[0];
            const context = canvas.getContext('2d');
            context.drawImage($('#video')[0], 0, 0, 256, 192);
            // 将canvas转换为图片并显示
            const dataURL = canvas.toDataURL('image/png');
            $('#photo').prop('src', dataURL).show();
            image=dataURL.split(',')[1];
            console.log('图片已显示,Base64 编码的图片数据:', image);
        });
    } else {
        //console.error('您的浏览器不支持 getUserMedia API');
        waringToast('温馨提示','您的浏览器不支持获取摄像设备API');
        //simple_modal('平台提示','您的浏览器不支持 getUserMedia API!');
    }

    /**
     * 验证逻辑
     */
    $('#verify').click(function(){
        const real_name=$('#real_name').val().trim();
        const idCard=$('#idCard').val().trim();
        if (!real_name || !idCard || !image) {
            waringToast('平台提示','信息不能为空!');
            return;
        }
        else{
            // console.log(real_name);
            // console.log(idCard);
            // console.log(image);
            var data = {
                "realname": real_name,
                "idcard": idCard,
                "image": image
            }
            $.ajax({
                "url":"https://eolink.o.apispace.com/identity-three/name_number_image",
                "method": "POST",
                "headers": {
                    "X-APISpace-Token":"88ytgg9eu7l0uh1ri9hqqe1100i5oad7",
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                "data": data,
                "crossDomain": true
            })
                .done(function(response){
                    //console.log('结果:'+response);
                    if(response.data.incorrect===100){
                        var content = response.data.message+':'+response.data.scoreMsg;
                        // 创建Modal的HTML结构
                        simple_modal('验证结果',content);
                    }
                })
                .fail(function(jqXHR){

                })
        }
    });
});
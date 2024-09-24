// import isEmptyString from '../common/matrix_tool';
var image;
$(document).ready(function() {
    $('#imageInput').on('change', function(e) {
        const file = e.target.files[0]; // 或者使用 $(this)[0].files[0]
        if (!file.type.startsWith('image/')) {
            console.log('Please select an image file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64String = e.target.result;
            image = base64String.replace(/^data:image\/\w+;base64,/, '');//去掉前缀
            console.log(image);
            // 你可以在这里使用这个Base64字符串
        };
        reader.readAsDataURL(file);
    });

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
        // 拍照
        $('#capture').click(function (){
            const canvas = $('#canvas')[0];
            const context = canvas.getContext('2d');
            context.drawImage($('#video')[0], 0, 0, 256, 192);
            // 将canvas转换为图片并显示
            const dataURL = canvas.toDataURL('image/png');
            $('#photo').prop('src', dataURL).show();
            console.log('图片已显示');
            image=dataURL.split(',')[1];
            //const base64Data = dataURL.split(',')[1]; // 分割字符串，并取第二个元素（即Base64编码的数据）
            console.log('Base64 编码的图片数据:', image);
        });
    } else {
        //console.error('您的浏览器不支持 getUserMedia API');
        alert('您的浏览器不支持 getUserMedia API');
        //simple_modal('平台提示','您的浏览器不支持 getUserMedia API!');
    }

    $('#verify').click(function(){
        var real_name=$('#real_name').val().trim();
        var idCard=$('#idCard').val().trim();
        if (!real_name || !idCard || !image) {
            alert('信息不能为空!');
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
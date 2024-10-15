package matrix.cloudestudio.faceverify.controller;

import com.google.gson.Gson;
import com.google.zxing.WriterException;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.model.PrintStyleBean;
import matrix.cloudestudio.faceverify.model.UserAuthorityInfoBean;
import matrix.cloudestudio.faceverify.service.AuthorityService;
import matrix.cloudestudio.faceverify.service.BaseInfoService;
import matrix.cloudestudio.faceverify.service.PrintStyleService;
import matrix.cloudestudio.faceverify.tool.QRCodeUtil;
import matrix.cloudestudio.faceverify.util.WebServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName OpenApiController
 * @Author Create By matrix
 * @Date 2024/10/3 22:11
 */
@Controller
@RequestMapping("/openApi")
public class OpenApiController {
    @Autowired
    private BaseInfoService baseInfoService;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PrintStyleService printStyleService;

    private static Gson gson=new Gson();

    @RequestMapping("/query_userInfo_authority")
    public void queryUserAuthorityInfo(HttpServletResponse response) throws IOException {
        List<UserAuthorityInfoBean> userList=baseInfoService.queryUserAuthorityInfo();
        if (userList.size()>0) {
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",userList)));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }

    @RequestMapping("/test_password")
    public ResponseEntity<Map<String, Object>> getData(@RequestParam("password") String password) {
        Map<String, Object> data = new HashMap<>();
        data.put("password", passwordEncoder.encode(password));
        return ResponseEntity.ok(data);
    }

    @RequestMapping("/test_query")
    public ResponseEntity<List<UserAuthorityInfoBean>> test_query() {
        List<UserAuthorityInfoBean> list=baseInfoService.queryTest();
        return ResponseEntity.ok(list);
    }
    @RequestMapping("/test_query_authority")
    public ResponseEntity<List<UserAuthorityInfoBean>> testQuery() {
        List<UserAuthorityInfoBean> list=authorityService.queryAccount_Authority();
        return ResponseEntity.ok(list);
    }

//    @RequestMapping("/generateQRCode")
//    public ResponseEntity<byte[]> generateQRCode(@RequestParam("text") String text) {
//        try {
//            byte[] qrCodeImage = QRCodeUtil.generateQRCodeImage(text);
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Content-Type", "image/png");
//            return new ResponseEntity<>(qrCodeImage, headers, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @RequestMapping("/generateQRCode")
    public void generateQRCode2(@RequestParam("text") String text,HttpServletResponse response) throws IOException, WriterException {
        //byte[] qrCodeImage = QRCodeUtil.generateQRCodeImage(text);
        //String base64Image = Base64.getEncoder().encodeToString(qrCodeImage);
        String qrCodeImage = QRCodeUtil.generateQRCodeImage(text);
        response.setContentType("application/json;charset=UTF-8");
        if (qrCodeImage != null || !(qrCodeImage.isEmpty())) {
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("qrCodeImage", qrCodeImage);
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",responseMap)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }
    @RequestMapping("/generateBarcode")
    public void generateBarcode(@RequestParam("text") String text,HttpServletResponse response) throws IOException, WriterException {
        String qrCodeImage = QRCodeUtil.generateBarcodeImage(text);
        //String qrCodeImage = QRCodeUtil.generateBarcodeImage2(text);
        response.setContentType("application/json;charset=UTF-8");
        if (qrCodeImage != null || !(qrCodeImage.isEmpty())) {
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("qrCodeImage", qrCodeImage);
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",responseMap)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }
    @RequestMapping("/generateBarcode2")
    public void generateBarcode2(@RequestParam("text") String text,HttpServletResponse response) throws IOException, WriterException {
        String qrCodeImage = QRCodeUtil.generateBarcodeImage(text);
        //String qrCodeImage = QRCodeUtil.generateBarcodeImage2(text);
        response.setContentType("application/json;charset=UTF-8");
        if (qrCodeImage != null || !(qrCodeImage.isEmpty())) {
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("qrCodeImage", qrCodeImage);
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",responseMap)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }

    @RequestMapping("/getPrintStyle")
    public void getPrintStyle(@RequestParam("printName") String printName,HttpServletResponse response) throws IOException, WriterException {
        PrintStyleBean printStyleBean = printStyleService.query_print_style(printName);
        response.setContentType("application/json;charset=UTF-8");
        if (printStyleBean != null) {
            System.out.println("打印格式:"+printStyleBean.toString());
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",printStyleBean)));
        }else{
            System.out.println("打印格式:"+printStyleBean.toString());
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }
}

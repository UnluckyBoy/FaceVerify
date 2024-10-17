package matrix.cloudestudio.faceverify.controller;

import com.google.gson.Gson;
import com.google.zxing.WriterException;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.model.MedicineBaseBean;
import matrix.cloudestudio.faceverify.model.PrintStyleBean;
import matrix.cloudestudio.faceverify.model.UserAuthorityInfoBean;
import matrix.cloudestudio.faceverify.service.AuthorityService;
import matrix.cloudestudio.faceverify.service.BaseInfoService;
import matrix.cloudestudio.faceverify.service.MedicineService;
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
    private MedicineService medicineService;

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

    /**
     * 移动端扫码获取基本信息
     * @param medicine_code
     * @param response
     * @throws IOException
     */
    @RequestMapping("/queryMedicineCodeInfoByCode")
    public void queryNearMedicineCode(@RequestParam("medicine_code") String medicine_code,
                                      HttpServletResponse response) throws IOException {
        MedicineBaseBean request=medicineService.query_medicineBaseInfoByCode(medicine_code);
        response.setContentType("application/json;charset=UTF-8");
        if (request!=null) {
            System.out.println("药品Code:"+request.getMedicine_code());
            Map<String,Object> responseMap=new HashMap<>();
            responseMap.put("medicine_code",request.getMedicine_code());
            responseMap.put("medicine_name",request.getMedicine_name());
            responseMap.put("medicine_price",request.getMedicine_price());
            responseMap.put("medicine_time",request.getMedicine_time());
            responseMap.put("medicine_retail",request.getMedicine_retail());
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",responseMap)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("获取新药品编码异常!")));
        }
    }

    @RequestMapping("/addMedicineToWareHouse")
    public void addMedicineToWareHouse(@RequestParam("medicine_code") String medicine_code,
                                       @RequestParam("medicine_batch_number") int medicine_batch_number,
                                       @RequestParam("warehouse_count") int warehouse_count,
                                       @RequestParam("create_time") String create_time,
                                      HttpServletResponse response) throws IOException {

        Map<String,Object> requestMap=new HashMap<>();
        requestMap.put("medicine_code",medicine_code);
        requestMap.put("medicine_batch_number",medicine_batch_number);
        requestMap.put("warehouse_count",warehouse_count);
        requestMap.put("canuse_count",warehouse_count);
        requestMap.put("create_time",create_time);
        response.setContentType("application/json;charset=UTF-8");
        MedicineBaseBean addQueryBean=medicineService.queryWareHouseInfoByCodeCrTimeBaNum(requestMap);
        if(addQueryBean!=null){
            System.out.println("药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"已在库");
            Map<String,Object> updateWareCountMap=new HashMap<>();
            updateWareCountMap.put("medicine_code",medicine_code);
            updateWareCountMap.put("medicine_batch_number",medicine_batch_number);
            updateWareCountMap.put("create_time",create_time);
            updateWareCountMap.put("warehouse_count",addQueryBean.getWarehouse_count()+warehouse_count);
            updateWareCountMap.put("canuse_count",addQueryBean.getCanuse_count()+warehouse_count);
            boolean updateWareCountKey=medicineService.updateWarehouseCount(updateWareCountMap);
            if(updateWareCountKey){
                System.out.println("药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"入库成功");
                response.getWriter().write(gson.toJson(WebServerResponse.success("入库成功")));
            }else{
                response.getWriter().write(gson.toJson(WebServerResponse.failure("入库异常!")));
            }
        }else{
            System.out.println("药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"未入库");
            boolean addKey=medicineService.addMedicineToWareHouse(requestMap);
            if(addKey){
                System.out.println("药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"入库成功");
                response.getWriter().write(gson.toJson(WebServerResponse.success("入库成功")));
            }else{
                response.getWriter().write(gson.toJson(WebServerResponse.failure("入库异常!")));
            }
        }
    }

    @RequestMapping("/medicineOutWareHouse")
    public void medicineOutWareHouse(@RequestParam("medicine_code") String medicine_code,
                                       @RequestParam("medicine_batch_number") int medicine_batch_number,
                                       @RequestParam("outCount") int outCount,
                                       @RequestParam("create_time") String create_time,
                                       HttpServletResponse response) throws IOException {
        Map<String,Object> requestMap=new HashMap<>();
        requestMap.put("medicine_code",medicine_code);
        requestMap.put("medicine_batch_number",medicine_batch_number);
        requestMap.put("create_time",create_time);
        response.setContentType("application/json;charset=UTF-8");
        MedicineBaseBean outQueryBean=medicineService.queryWareHouseInfoByCodeCrTimeBaNum(requestMap);
        if(outQueryBean==null){
            System.out.println("药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"未入库");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("出库异常!"+"药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"未入库")));
        }else{
            if(outQueryBean.getCanuse_count()>0){
                requestMap.put("canuse_count",outQueryBean.getCanuse_count()-outCount);
                boolean updateCanuseKey=medicineService.updateCanuseCount(requestMap);
                if(updateCanuseKey){
                    response.getWriter().write(gson.toJson(WebServerResponse.success("药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"出库成功!可用库存量:"+(outQueryBean.getCanuse_count()-outCount))));
                }else{
                    response.getWriter().write(gson.toJson(WebServerResponse.success("药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"出库异常!")));
                }
            }else{
                System.out.println("药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"库存不足");
                response.getWriter().write(gson.toJson(WebServerResponse.failure("出库异常!"+"药剂:"+medicine_code+" 批次:"+create_time+medicine_batch_number+"库存不足")));
            }
        }
    }
}

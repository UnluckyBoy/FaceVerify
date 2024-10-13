package matrix.cloudestudio.faceverify.controller;

import com.google.gson.Gson;
import com.google.zxing.WriterException;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.model.MedicineBaseBean;
import matrix.cloudestudio.faceverify.model.PrintStyleBean;
import matrix.cloudestudio.faceverify.service.MedicineService;
import matrix.cloudestudio.faceverify.service.PrintStyleService;
import matrix.cloudestudio.faceverify.util.WebServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName MedicineController
 * @Author Create By matrix
 * @Date 2024/10/9 21:21
 */
@Controller
@RequestMapping("/MedicineApi")
public class MedicineController {
    private static Gson gson=new Gson();//Json数据对象

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private PrintStyleService printStyleService;

    /**
     * 查询所有药品名
     * @param response
     * @throws IOException
     */
    @RequestMapping("/queryMedicineName")
    public void queryMedicineName(HttpServletResponse response) throws IOException {
        List<MedicineBaseBean> list=medicineService.query_medicine_name();
        response.setContentType("application/json;charset=UTF-8");
        if (list.size()>0) {
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",list)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }

    /**
     * 查询所有药品编码
     * @param response
     * @throws IOException
     */
    @RequestMapping("/queryMedicineCode")
    public void queryMedicineCode(HttpServletResponse response) throws IOException {
        List<MedicineBaseBean> list=medicineService.query_medicine_code();
        System.out.println("查询药品:"+list.toString());
        response.setContentType("application/json;charset=UTF-8");
        if (list.size()>0) {
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",list)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }

    /***
     * 查询药品基表信息
     * @param response
     * @throws IOException
     */
    @RequestMapping("/queryMedicineBaseInfo")
    public void queryMedicineBaseInfo(HttpServletResponse response) throws IOException {
        List<MedicineBaseBean> list=medicineService.query_medicine_baseInfo();
        System.out.println("查询药品:"+list.toString());
        response.setContentType("application/json;charset=UTF-8");
        if (list.size()>0) {
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",list)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }

    /**
     * 查询最新批次药品信息:返回code,batch_number,name,price
     * @param medicine_code
     * @param response
     * @throws IOException
     */
    @RequestMapping("/queryNearMedicineInfo")
    public void queryNearMedicineInfo(@RequestParam("medicine_code") String medicine_code, HttpServletResponse response) throws IOException {
        MedicineBaseBean request=medicineService.queryNearMedicineInfo(medicine_code);
        System.out.println("最新批次药品信息:"+request.toString());
        response.setContentType("application/json;charset=UTF-8");
        if (request!=null) {
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",request)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }

    /**
     * 获取最新药剂编码
     * @param response
     * @throws IOException
     */
    @RequestMapping("/queryNearMedicineCode")
    public void queryNearMedicineCode(HttpServletResponse response) throws IOException {
        MedicineBaseBean request=medicineService.queryNearMedicineCode();
        System.out.println("最新药品Code:"+request.getMedicine_code());
        response.setContentType("application/json;charset=UTF-8");
        if (request!=null) {
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",request)));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("获取新药品编码异常!")));
        }
    }

    /**
     * 创建药剂基本字典
     * @param response
     * @throws IOException
     */
    @RequestMapping("/addMedicineBaseInfo")
    public void addMedicineBaseInfo(@RequestParam("medicine_code") String medicine_code,
                                    @RequestParam("medicine_name") String medicine_name,
                                    @RequestParam("medicine_price") String medicine_price,
                                    HttpServletResponse response) throws IOException {
        Map<String,Object> requestMap=new HashMap<>();
        requestMap.put("medicine_code",medicine_code);
        requestMap.put("medicine_name",medicine_name);
        requestMap.put("medicine_price",medicine_price);
        boolean insertKey=medicineService.addMedicineBaseInfo(requestMap);
        response.setContentType("application/json;charset=UTF-8");
        if (insertKey) {
            System.out.println("药剂字典创建:"+requestMap.toString());
            response.getWriter().write(gson.toJson(WebServerResponse.success("药剂字典创建成功!")));
        }else{
            response.getWriter().write(gson.toJson(WebServerResponse.failure("药剂字典创建异常!")));
        }
    }

    /***
     * 通过打印名称获取条码打印格式
     * @param printName
     * @param response
     * @throws IOException
     * @throws WriterException
     */
    @RequestMapping("/getPrintStyle")
    public void getPrintStyle(@RequestParam("printName") String printName,HttpServletResponse response) throws IOException, WriterException {
        PrintStyleBean printStyleBean = printStyleService.query_print_style(printName);
        response.setContentType("application/json;charset=UTF-8");
        if (printStyleBean != null) {
            System.out.println("打印格式:"+printStyleBean.toString());
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",printStyleBean)));
        }else{
            System.out.println("打印格式:"+printStyleBean.toString());
            response.getWriter().write(gson.toJson(WebServerResponse.failure("打印操作失异常!")));
        }
    }
}

package matrix.cloudestudio.faceverify.controller;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.model.MedicineBaseBean;
import matrix.cloudestudio.faceverify.service.MedicineService;
import matrix.cloudestudio.faceverify.util.WebServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.List;

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
}

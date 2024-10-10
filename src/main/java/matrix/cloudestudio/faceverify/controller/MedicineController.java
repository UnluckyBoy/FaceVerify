package matrix.cloudestudio.faceverify.controller;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.model.MedicineBaseBean;
import matrix.cloudestudio.faceverify.service.MedicineService;
import matrix.cloudestudio.faceverify.util.WebServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
}

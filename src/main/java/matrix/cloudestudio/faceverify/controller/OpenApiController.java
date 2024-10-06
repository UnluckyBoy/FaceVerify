package matrix.cloudestudio.faceverify.controller;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.model.UserAuthorityInfoBean;
import matrix.cloudestudio.faceverify.service.AuthorityService;
import matrix.cloudestudio.faceverify.service.BaseInfoService;
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
}

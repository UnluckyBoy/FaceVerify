package matrix.cloudestudio.faceverify.controller;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.model.UserAuthorityInfoBean;
import matrix.cloudestudio.faceverify.model.UserInfo;
import matrix.cloudestudio.faceverify.model.UserInfoSimple;
import matrix.cloudestudio.faceverify.service.AuthorityService;
import matrix.cloudestudio.faceverify.service.BaseInfoService;
import matrix.cloudestudio.faceverify.util.WebServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.List;

/**
 * @ClassName HandleController
 * @Author Create By matrix
 * @Date 2024/9/26 20:26
 */
@Controller
@RequestMapping("/api")
public class HandleController {
    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private BaseInfoService baseInfoService;

    private static Gson gson=new Gson();//Json数据对象

    /**
     * 获取认证用户信息并返回
     * @param authentication
     * @param response
     * @throws IOException
     */
    @RequestMapping("/userInfo")
    public void checkAuthentication(Authentication authentication, HttpServletResponse response) throws IOException{
        // 如果authentication为null，则认证流程没有触发或成功
        UserInfoSimple userInfo=getUserInfo(authentication);
        if (userInfo==null) {
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",userInfo)));
        }
    }

    @RequestMapping("/query_userInfo_authority")
    public void queryUserAuthorityInfo(HttpServletResponse response) throws IOException{
        List<UserAuthorityInfoBean> userAuthorityInfoBeanList=baseInfoService.queryUserAuthorityInfo();
        if (userAuthorityInfoBeanList.size()>0) {
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",userAuthorityInfoBeanList)));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }
    }


    /**
     * 查询认证用户
     * @param authentication
     * @return
     */
    private UserInfoSimple getUserInfo(Authentication authentication){
        // 如果authentication为null，则认证流程没有触发或成功
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("用户未认证");
            return null;
        }
        // 如果authentication不为null且已认证，则可以访问用户详情
        assert authentication != null;
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserInfo) {
            //UserInfo userInfoDetails = (UserInfoSimple) principal;
            UserInfoSimple userInfoDetails = ((UserInfo) principal).toUserInfoSimple();
            // 获取用户详情
            System.out.println("认证用户信息:" + userInfoDetails.toString());
            return userInfoDetails;
        } else {
            // 如果不是UserDetails类型，可能是其他类型的Principal，比如String用户名等
            System.out.println("用户认证,但角色异常: " + principal.toString());
            return null;
        }
    }
}

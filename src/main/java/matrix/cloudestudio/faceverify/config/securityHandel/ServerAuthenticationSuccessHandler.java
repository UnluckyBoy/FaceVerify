package matrix.cloudestudio.faceverify.config.securityHandel;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.util.WebServerResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @ClassName ServerAuthenticationSuccessHandler
 * @Author Create By matrix
 * @Date 2024/9/26 16:51
 * 自定义登录响应
 */
@Component
public class ServerAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Value("${spring.security.loginType}")
    private String loginType;

    private static Gson gson=new Gson();//Json数据对象

    /**
     * 处理登录成功返回的结果
     * @param request
     * @param response
     * @param authentication
     * @throws ServletException
     * @throws IOException
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        if(loginType.equalsIgnoreCase("JSON")){
            //返回JSON数据逻辑
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success()));
            System.out.println("登录成功");
        }else{
            response.setContentType("application/html;charset=UTF-8");
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}

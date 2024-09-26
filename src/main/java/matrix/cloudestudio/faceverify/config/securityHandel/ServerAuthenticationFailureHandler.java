package matrix.cloudestudio.faceverify.config.securityHandel;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import matrix.cloudestudio.faceverify.util.WebServerResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @ClassName ServerAuthenticationFailureHandler
 * @Author Create By matrix
 * @Date 2024/9/26 16:49
 *
 * 失败响应类
 */
@Component
public class ServerAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Value("${spring.security.loginType}")
    private String loginType;

    private static Gson gson=new Gson();//Json数据对象

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        if(loginType.equalsIgnoreCase("JSON")){
            //返回JSON数据逻辑
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure(exception)));
            System.out.println("登录失败");
        }else{
            response.setContentType("application/html;charset=UTF-8");
            super.onAuthenticationFailure(request, response, exception);
        }
    }
}

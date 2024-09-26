package matrix.cloudestudio.faceverify.util;

import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * @ClassName MessageUtil
 * @Author Create By matrix
 * @Date 2024/9/26 16:51
 *
 * 错误信息处理类
 */
public class MessageUtil {
    public static String Message(AuthenticationException exception){
        String errorMessage = "";
        if (exception instanceof UsernameNotFoundException) {
            errorMessage = "账号不存在";
        } else if (exception instanceof BadCredentialsException) {
            errorMessage = "账号或密码错误";
        } else if (exception instanceof DisabledException) {
            errorMessage = "用户已被禁用";
        } else if (exception instanceof LockedException) {
            errorMessage = "用户已被锁定";
        } else if (exception instanceof AccountExpiredException) {
            errorMessage = "账户已过期";
        } else if (exception instanceof CredentialsExpiredException) {
            errorMessage = "密码已过期";
        }else{
            errorMessage = "未知错误";
        }

        /*
        switch (exception) {
            case UsernameNotFoundException e -> errorMessage = "账号不存在";
            case BadCredentialsException e -> errorMessage = "密码错误";
            case DisabledException e -> errorMessage = "用户已被禁用";
            case LockedException e -> errorMessage = "用户已被锁定";
            case AccountExpiredException e -> errorMessage = "账户已过期";
            case CredentialsExpiredException e -> errorMessage = "密码已过期";
                default -> errorMessage = "未知错误";
        }
        */

        return errorMessage;
    }
}

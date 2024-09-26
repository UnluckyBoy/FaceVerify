package matrix.cloudestudio.faceverify.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @ClassName ServerEncode
 * @Author Create By matrix
 * @Date 2024/9/26 17:07
 */
public class ServerEncode {
    @Autowired
    private static PasswordEncoder passwordEncoder;

    /**
     * 加密
     * @param rawPassword
     * @return
     */
    public static String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    /**
     * 验证密码是否正确
     * @param rawPassword 数据库密码
     * @param encodedPassword 待校验密码
     * @return
     */
    public static boolean isPasswordMatch(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
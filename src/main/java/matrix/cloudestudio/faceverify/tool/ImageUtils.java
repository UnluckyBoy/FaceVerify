package matrix.cloudestudio.faceverify.tool;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

/**
 * @ClassName ImageUtils
 * @Author Create By matrix
 * @Date 2024/9/25 21:08
 * 图片工具类
 */
public class ImageUtils {
    /**
     * 将MultipartFile图片转换为Base64字符串(不含前缀)
     * @param file MultipartFile图片文件
     * @return Base64编码的字符串
     * @throws IOException 如果读取文件时发生错误
     */
    public static String convertMultipartFileToBase64(MultipartFile file) throws IOException {
        // 读取文件内容到字节数组
        byte[] bytes = file.getBytes();
        // 将字节数组编码为Base64字符串
        String base64Image = Base64.getEncoder().encodeToString(bytes);
        // 返回不含前缀的Base64字符串
        return base64Image;
    }
}

package matrix.cloudestudio.faceverify.tool;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName QRCodeUtil
 * @Author Create By matrix
 * @Date 2024/10/9 13:53
 *
 * 条形码、二维码工具
 */
public class QRCodeUtil {
    private static final int QR_CODE_SIZE = 300;
    private static final String IMAGE_TYPE = "PNG";

    private static final int BARCODE_WIDTH = 300;
    private static final int BARCODE_HEIGHT = 100;

    /**
     * 二维码
     * @param text
     * @return
     * @throws WriterException
     * @throws IOException
     */
    public static String generateQRCodeImage(String text) throws WriterException, IOException {
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");

        BitMatrix bitMatrix = new MultiFormatWriter().encode(text, BarcodeFormat.QR_CODE, QR_CODE_SIZE, QR_CODE_SIZE, hints);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, IMAGE_TYPE, baos);

        //return baos.toByteArray();//返回字节数组
        return Base64.getEncoder().encodeToString(baos.toByteArray());//返回Base64字符串
    }

    /**
     * 条形码生成
     * @param text
     * @return
     * @throws WriterException
     * @throws IOException
     */
    public static String generateBarcodeImage(String text) throws WriterException, IOException {
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        // 使用Code128Writer生成条形码
        BitMatrix bitMatrix = new Code128Writer().encode(text, BarcodeFormat.CODE_128, BARCODE_WIDTH, BARCODE_HEIGHT, hints);
        // 将BitMatrix转换为BufferedImage
        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
        // 使用ByteArrayOutputStream将BufferedImage转换为字节数组
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, IMAGE_TYPE, baos);
        return Base64.getEncoder().encodeToString(baos.toByteArray());
    }
}

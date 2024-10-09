package matrix.cloudestudio.faceverify.model;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @ClassName MedicineBaseBean
 * @Author Create By matrix
 * @Date 2024/10/9 20:53
 */
@Data
public class MedicineBaseBean implements Serializable {
    private String medicine_code;
    private String medicine_name;
    private BigDecimal medicine_price;
}

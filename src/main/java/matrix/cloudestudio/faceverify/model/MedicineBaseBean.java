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
    private int medicine_batch_number;
    private int warehouse_count;
    private int canuse_count;
    private String create_time;
    private String towarehouse_time;
    private String towarehouse_operator;
    private String outwarehouse_time;
    private String outwarehouse_operator;
}

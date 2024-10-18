package matrix.cloudestudio.faceverify.model;

import lombok.Data;

import java.io.Serializable;

/**
 * @ClassName OrderBean
 * @Author Create By matrix
 * @Date 2024/10/18 8:36
 */
@Data
public class OrderBean implements Serializable {
    private String order_uid;
    private String medicine_code;
    private String medicine_name;
    private String order_time;
    private int order_status;
    private float order_amount;
    private int order_quantity;
}

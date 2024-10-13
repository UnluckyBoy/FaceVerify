package matrix.cloudestudio.faceverify.model;

import lombok.Data;

import java.io.Serializable;

/**
 * @ClassName PrintStyleBean
 * @Author Create By matrix
 * @Date 2024/10/12 13:57
 */
@Data
public class PrintStyleBean implements Serializable {
    private int print_code;
    private String print_name;
    private String print_style;
}

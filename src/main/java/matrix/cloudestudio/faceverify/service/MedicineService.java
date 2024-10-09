package matrix.cloudestudio.faceverify.service;

import matrix.cloudestudio.faceverify.model.MedicineBaseBean;

import java.util.List;

/**
 * @ClassName MedicineService
 * @Author Create By matrix
 * @Date 2024/10/9 21:00
 */
public interface MedicineService {
    List<MedicineBaseBean> query_medicine_code();
    List<MedicineBaseBean> query_medicine_name();
    List<MedicineBaseBean> query_medicine_baseInfo();
}

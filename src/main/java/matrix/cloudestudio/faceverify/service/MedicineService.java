package matrix.cloudestudio.faceverify.service;

import matrix.cloudestudio.faceverify.model.MedicineBaseBean;

import java.util.List;
import java.util.Map;

/**
 * @ClassName MedicineService
 * @Author Create By matrix
 * @Date 2024/10/9 21:00
 */
public interface MedicineService {
    List<MedicineBaseBean> query_medicine_code();
    List<MedicineBaseBean> query_medicine_name();
    List<MedicineBaseBean> query_medicine_baseInfo();
    MedicineBaseBean queryNearMedicineInfo(String medicine_code);
    MedicineBaseBean queryNearMedicineCode();
    boolean addMedicineBaseInfo(Map<String,Object> map);
    MedicineBaseBean query_medicineBaseInfoByCode(String medicine_code);
    MedicineBaseBean queryWareHouseInfoByCodeCrTimeBaNum(Map<String,Object> map);
    boolean addMedicineToWareHouse(Map<String,Object> map);
    boolean updateWarehouseCount(Map<String,Object> map);
    boolean updateCanuseCount(Map<String,Object> map);
}

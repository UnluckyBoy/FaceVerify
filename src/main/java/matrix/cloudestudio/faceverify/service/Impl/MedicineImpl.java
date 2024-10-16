package matrix.cloudestudio.faceverify.service.Impl;

import matrix.cloudestudio.faceverify.model.MedicineBaseBean;
import matrix.cloudestudio.faceverify.model.mapper.MedicineMapper;
import matrix.cloudestudio.faceverify.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName MedicineImpl
 * @Author Create By matrix
 * @Date 2024/10/9 21:01
 */
@Service("MedicineService")
public class MedicineImpl implements MedicineService {
    @Autowired
    MedicineMapper medicineMapper;

    @Override
    public List<MedicineBaseBean> query_medicine_code() {
        return medicineMapper.query_medicine_code();
    }

    @Override
    public List<MedicineBaseBean> query_medicine_name() {
        return medicineMapper.query_medicine_name();
    }

    @Override
    public List<MedicineBaseBean> query_medicine_baseInfo() {
        return medicineMapper.query_medicine_baseInfo();
    }

    @Override
    public MedicineBaseBean queryNearMedicineInfo(String medicine_code) {
        return medicineMapper.queryNearMedicineInfo(medicine_code);
    }

    @Override
    public MedicineBaseBean queryNearMedicineCode() {
        return medicineMapper.queryNearMedicineCode();
    }

    @Override
    public boolean addMedicineBaseInfo(Map<String, Object> map) {
        return medicineMapper.addMedicineBaseInfo(map);
    }

    @Override
    public MedicineBaseBean query_medicineBaseInfoByCode(String medicine_code) {
        return medicineMapper.query_medicineBaseInfoByCode(medicine_code);
    }

    @Override
    public MedicineBaseBean queryWareHouseInfoByCodeCrTimeBaNum(Map<String, Object> map) {
        return medicineMapper.queryWareHouseInfoByCodeCrTimeBaNum(map);
    }

    @Override
    public boolean addMedicineToWareHouse(Map<String, Object> map) {
        return medicineMapper.addMedicineToWareHouse(map);
    }

    @Override
    public boolean updateWarehouseCount(Map<String, Object> map) {
        return medicineMapper.updateWarehouseCount(map);
    }

    @Override
    public boolean updateCanuseCount(Map<String, Object> map) {
        return medicineMapper.updateCanuseCount(map);
    }
}

package matrix.cloudestudio.faceverify.service.Impl;

import matrix.cloudestudio.faceverify.model.MedicineBaseBean;
import matrix.cloudestudio.faceverify.model.mapper.MedicineMapper;
import matrix.cloudestudio.faceverify.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

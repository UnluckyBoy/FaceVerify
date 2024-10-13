package matrix.cloudestudio.faceverify.model.mapper;

import matrix.cloudestudio.faceverify.model.MedicineBaseBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName MedicineMapper
 * @Author Create By matrix
 * @Date 2024/10/9 20:54
 */
@Service
@Mapper
@Repository
public interface MedicineMapper {
    List<MedicineBaseBean> query_medicine_code();//查询药品编码
    List<MedicineBaseBean> query_medicine_name();//查询药品名称
    List<MedicineBaseBean> query_medicine_baseInfo();//查询药品名称、编码
    MedicineBaseBean queryNearMedicineInfo(String medicine_code);//查询最新批次药品信息
    MedicineBaseBean queryNearMedicineCode();//查询最新批次药品编码
    boolean addMedicineBaseInfo(Map<String,Object> map);//药剂基本信息Insert
}

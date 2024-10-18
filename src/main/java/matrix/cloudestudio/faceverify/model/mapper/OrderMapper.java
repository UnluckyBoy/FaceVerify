package matrix.cloudestudio.faceverify.model.mapper;

import matrix.cloudestudio.faceverify.model.OrderBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @ClassName OrderMapper
 * @Author Create By matrix
 * @Date 2024/10/18 8:35
 */
@Service
@Mapper
@Repository
public interface OrderMapper {
    boolean addOrder(Map<String,Object> map);//创建订单
    boolean updateOrderStatus(Map<String,Object> map);//创建订单
    int getOrderAmount(String order_uid);
    OrderBean queryOrderBaseAndMedicineName(Map<String,Object> map);
}

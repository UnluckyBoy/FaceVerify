package matrix.cloudestudio.faceverify.service;

import matrix.cloudestudio.faceverify.model.OrderBean;

import java.util.Map;

/**
 * @ClassName OrderService
 * @Author Create By matrix
 * @Date 2024/10/18 8:38
 */
public interface OrderService {
    boolean addOrder(Map<String,Object> map);//创建订单
    boolean updateOrderStatus(Map<String,Object> map);//创建订单
    int getOrderAmount(String order_uid);
    OrderBean queryOrderBaseAndMedicineName(Map<String,Object> map);
}

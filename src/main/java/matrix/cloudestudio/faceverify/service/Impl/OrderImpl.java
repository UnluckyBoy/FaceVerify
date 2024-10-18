package matrix.cloudestudio.faceverify.service.Impl;

import matrix.cloudestudio.faceverify.model.OrderBean;
import matrix.cloudestudio.faceverify.model.mapper.OrderMapper;
import matrix.cloudestudio.faceverify.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @ClassName OrderImpl
 * @Author Create By matrix
 * @Date 2024/10/18 8:39
 */
@Service("OrderService")
public class OrderImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public boolean addOrder(Map<String, Object> map) {
        return orderMapper.addOrder(map);
    }

    @Override
    public boolean updateOrderStatus(Map<String, Object> map) {
        return orderMapper.updateOrderStatus(map);
    }

    @Override
    public int getOrderAmount(String order_uid) {
        return orderMapper.getOrderAmount(order_uid);
    }

    @Override
    public OrderBean queryOrderBaseAndMedicineName(Map<String, Object> map) {
        return orderMapper.queryOrderBaseAndMedicineName(map);
    }
}

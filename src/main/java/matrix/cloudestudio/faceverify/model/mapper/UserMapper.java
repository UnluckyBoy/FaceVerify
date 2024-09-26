package matrix.cloudestudio.faceverify.model.mapper;

import matrix.cloudestudio.faceverify.model.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * @ClassName UserMapper
 * @Author Create By matrix
 * @Date 2024/9/26 17:04
 */
@Service
@Mapper //mybatis的mapper类
@Repository //将mapper交由spring容器管理
public interface UserMapper {
    UserInfo accountQuery(String account);
}

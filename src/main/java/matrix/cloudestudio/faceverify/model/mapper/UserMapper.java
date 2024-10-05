package matrix.cloudestudio.faceverify.model.mapper;

import matrix.cloudestudio.faceverify.model.UserAuthorityInfoBean;
import matrix.cloudestudio.faceverify.model.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName UserMapper
 * @Author Create By matrix
 * @Date 2024/9/26 17:04
 */
@Service
@Mapper //mybatis的mapper类
@Repository //将mapper交由spring容器管理
public interface UserMapper {
    UserInfo accountQuery(String account);//登录验证
    List<UserAuthorityInfoBean> queryUserAuthorityInfo();//用户信息联合查询
    boolean fresh_user_organization(Map<String,Object> map);//更新用户组织信息
    boolean delete_user(String uAccount);//删除用户信息
}

package matrix.cloudestudio.faceverify.service.Impl;

import matrix.cloudestudio.faceverify.model.UserAuthorityInfoBean;
import matrix.cloudestudio.faceverify.model.mapper.UserMapper;
import matrix.cloudestudio.faceverify.service.BaseInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName BaseInfoImpl
 * @Author Create By matrix
 * @Date 2024/10/2 16:48
 */
@Service("BaseInfoService")
public class BaseInfoImpl implements BaseInfoService {
    @Autowired
    UserMapper userMapper;

    @Override
    public List<UserAuthorityInfoBean> queryUserAuthorityInfo() {
        return userMapper.queryUserAuthorityInfo();
    }

    @Override
    public boolean fresh_user_organization(Map<String, Object> map) {
        return userMapper.fresh_user_organization(map);
    }

    @Override
    public boolean delete_user(String uAccount) {
        return userMapper.delete_user(uAccount);
    }
}

package matrix.cloudestudio.faceverify.service;

import matrix.cloudestudio.faceverify.model.UserAuthorityInfoBean;

import java.util.List;
import java.util.Map;

/**
 * @ClassName BaseInfoService
 * @Author Create By matrix
 * @Date 2024/10/2 16:47
 */
public interface BaseInfoService {
    List<UserAuthorityInfoBean> queryUserAuthorityInfo();
    boolean fresh_user_organization(Map<String,Object> map);
    boolean delete_user(String uAccount);

    List<UserAuthorityInfoBean> queryTest();
}

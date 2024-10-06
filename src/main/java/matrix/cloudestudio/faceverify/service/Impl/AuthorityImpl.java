package matrix.cloudestudio.faceverify.service.Impl;

import matrix.cloudestudio.faceverify.model.AuthorityInfo;
import matrix.cloudestudio.faceverify.model.UserAuthorityInfoBean;
import matrix.cloudestudio.faceverify.model.mapper.AuthorityMapper;
import matrix.cloudestudio.faceverify.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName AuthorityImpl
 * @Author Create By matrix
 * @Date 2024/9/26 17:25
 */
@Service("AuthorityService")
public class AuthorityImpl implements AuthorityService {
    @Autowired
    AuthorityMapper authorityMapper;


    @Override
    public List<AuthorityInfo> queryAuthority(String account) {
        return authorityMapper.queryAuthority(account);
    }

    @Override
    public List<UserAuthorityInfoBean> queryAccount_Authority() {
        return authorityMapper.queryAccount_Authority();
    }
}

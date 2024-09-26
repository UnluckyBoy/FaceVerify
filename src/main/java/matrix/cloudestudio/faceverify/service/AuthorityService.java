package matrix.cloudestudio.faceverify.service;

import matrix.cloudestudio.faceverify.model.AuthorityInfo;

import java.util.List;

/**
 * @ClassName AuthorityService
 * @Author Create By matrix
 * @Date 2024/9/26 17:25
 */
public interface AuthorityService {
    List<AuthorityInfo> queryAuthority(String account);
}

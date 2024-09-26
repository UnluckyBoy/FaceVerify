package matrix.cloudestudio.faceverify.model.mapper;

import matrix.cloudestudio.faceverify.model.AuthorityInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName AuthorityMapper
 * @Author Create By matrix
 * @Date 2024/9/26 17:05
 */
@Service
@Mapper
@Repository
public interface AuthorityMapper {
    List<AuthorityInfo> queryAuthority(String account);
}

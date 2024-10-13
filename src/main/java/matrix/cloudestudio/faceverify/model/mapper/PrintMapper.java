package matrix.cloudestudio.faceverify.model.mapper;

import matrix.cloudestudio.faceverify.model.PrintStyleBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * @ClassName PrintMapper
 * @Author Create By matrix
 * @Date 2024/10/12 13:53
 */
@Service
@Mapper
@Repository
public interface PrintMapper {
    PrintStyleBean query_print_style(String printName);
}

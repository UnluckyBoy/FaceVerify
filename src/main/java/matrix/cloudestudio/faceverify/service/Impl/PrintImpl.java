package matrix.cloudestudio.faceverify.service.Impl;

import matrix.cloudestudio.faceverify.model.PrintStyleBean;
import matrix.cloudestudio.faceverify.model.mapper.PrintMapper;
import matrix.cloudestudio.faceverify.service.PrintStyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName PrintImpl
 * @Author Create By matrix
 * @Date 2024/10/12 13:59
 */
@Service("PrintStyleService")
public class PrintImpl implements PrintStyleService {
    @Autowired
    PrintMapper printMapper;

    @Override
    public PrintStyleBean query_print_style(String printName) {
        return printMapper.query_print_style(printName);
    }
}

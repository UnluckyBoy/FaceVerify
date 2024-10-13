package matrix.cloudestudio.faceverify.service;

import matrix.cloudestudio.faceverify.model.PrintStyleBean;

/**
 * @ClassName PrintService
 * @Author Create By matrix
 * @Date 2024/10/12 13:59
 */
public interface PrintStyleService {
    PrintStyleBean query_print_style(String printName);
}

package matrix.cloudestudio.faceverify.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @ClassName WebController
 * @Author Create By matrix
 * @Date 2024/9/23 21:41
 */
@Controller
public class WebController {
    @RequestMapping("/index")
    public String indexWebView(){
        return "index";
    }
    @RequestMapping("/login")
    public String loginWebView(){
        return "login";
    }

    @RequestMapping("/about")
    public String aboutWebView(){
        return "about";
    }
}

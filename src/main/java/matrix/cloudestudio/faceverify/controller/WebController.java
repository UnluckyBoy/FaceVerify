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
    public String IndexWebView(){
        return "index";
    }
    @RequestMapping("/login")
    public String LoginWebView(){
        return "login";
    }
}

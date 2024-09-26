package matrix.cloudestudio.faceverify.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import matrix.cloudestudio.faceverify.util.WebServerResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

/**
 * @ClassName BaiduApiController
 * @Author Create By matrix
 * @Date 2024/9/25 17:20
 */
@RestController
@RequestMapping("/BaiduApi")
public class BaiduApiController {
    @Value("${baidu.aip.client_id}")
    private String API_KEY;
    @Value("${baidu.aip.client_secret}")
    private String SECRET_KEY;
    private static final String TOKEN_URL = "https://aip.baidubce.com/oauth/2.0/token";
    private static final String url = "https://aip.baidubce.com/rest/2.0/ocr/v1/idcard";

    private static Gson gson=new Gson();//Json数据对象


    private WebClient webClient = WebClient.create();

    @RequestMapping("/test")
    //public Mono<Mono<Object>> testAccessToken() {
    public Mono<String> getAccessToken() {
        // 注意：image 参数在这个上下文中未使用，如果你需要它，请相应调整
        return webClient.post()
                .uri(TOKEN_URL)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromFormData("grant_type", "client_credentials")
                        .with("client_id", API_KEY)
                        .with("client_secret", SECRET_KEY))
                .retrieve()
                .bodyToMono(String.class)
                .map(responseBody -> {
                    // 解析 JSON 并获取 access_token
                    JsonObject jsonObject = JsonParser.parseString(responseBody).getAsJsonObject();
                    String accessToken = jsonObject.get("access_token").getAsString();
                    // 这里你可以根据 access_token 做一些操作，但因为是 Mono<Void>，所以只打印或记录
                    System.out.println("Access Token: " + accessToken);
                    return accessToken;
                })
                .onErrorResume(e -> {
                    // 在这里处理错误，比如记录日志或返回一个表示错误的 Mono<Void>
                    System.out.println("异常: " + e.getMessage());
                    return Mono.just(e.getMessage());
                });
    }

    @RequestMapping("/verify_idcard")
    public Mono<ResponseEntity<WebServerResponse>> verifyIdcard(@RequestParam("image") String image) throws IOException {
        return webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED) // 设置请求的内容类型
                .accept(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromFormData("id_card_side","front")
                        .with("access_token",getAccessToken().block())
                        .with("image",image))
                .retrieve()
                .bodyToMono(String.class)
                .map(result ->{
                    System.out.println("结果:"+result.toString());
                    return ResponseEntity.ok(WebServerResponse.success("成功",result));
                })
                .onErrorResume(e -> {
                    // 在这里处理错误
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(WebServerResponse.success("失败",e.getMessage())));
                });
    }
}

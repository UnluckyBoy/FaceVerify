package matrix.cloudestudio.faceverify.model;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @ClassName UserInfoSimple
 * @Author Create By matrix
 * @Date 2024/9/28 21:57
 */
@Data
public class UserInfoSimple implements Serializable {
    private int uId;
    private String uAccount;
    private String uName;
    private String organization_code;
    private String organization_name;
    private int uStatus;
    private String headerImageUrl;
    private List<String> authorities;

    public UserInfoSimple(int id, String account,String name, String organization_code,
                          String organization_name, int status, String headerUrl, List<String> authorities){
        this.uId=id;
        this.uAccount=account;
        this.uName=name;
        this.organization_code=organization_code;
        this.organization_name=organization_name;
        this.uStatus=status;
        this.headerImageUrl=headerUrl;
        this.authorities=authorities;
    }
}

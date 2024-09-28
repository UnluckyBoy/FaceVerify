package matrix.cloudestudio.faceverify.model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @ClassName UserInfo
 * @Author Create By matrix
 * @Date 2024/9/26 17:01
 * 用户实体类,实现UserDetails接口
 */
@Data
public class UserInfo implements UserDetails {
    private int uId;
    private String uAccount;
    private String uPassword;
    private String organization_code;
    private String organization_name;
    private int uStatus;
    private String headerImageUrl;
    private List<String> authorities;

    /**
     * 存放当前用户的角色以及权限
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    /*密码*/
    @Override
    public String getPassword() {
        return uPassword;
    }
    /*账号*/
    @Override
    public String getUsername() {
        return uAccount;
    }
    /**
     * 是否过期
     * true:否
     * false:是
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 是否锁定
     * true:否
     * false:是
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        if(uStatus<0){
            return false;
        }
        else{
            return true;
        }
    }

    /**
     * 密码是否过期
     * true:否
     * false:是
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 账户是否可用
     * true:是
     * false:否
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}

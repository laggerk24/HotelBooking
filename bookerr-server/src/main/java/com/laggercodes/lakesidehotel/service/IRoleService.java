package com.laggercodes.lakesidehotel.service;

import com.laggercodes.lakesidehotel.model.Role;
import com.laggercodes.lakesidehotel.model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);
    void deleteRole(Long id);
    Role findByName(String name);
    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId);
    Role removeALlUsersFromRole(Long roleId);
}

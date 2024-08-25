package com.laggercodes.lakesidehotel.controller;

import com.laggercodes.lakesidehotel.exception.RoleAlreadyExistException;
import com.laggercodes.lakesidehotel.model.Role;
import com.laggercodes.lakesidehotel.service.IRoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RestController
@RequestMapping("api/roles")
public class RoleController {
    private final IRoleService roleService;

    public RoleController(IRoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(roleService.getRoles(), FOUND);
    }

    public ResponseEntity<String> createRole(@RequestBody Role theRole) {
        try{
            roleService.createRole(theRole);
            return ResponseEntity.ok("New Role Created successfully!!");
        }catch(RoleAlreadyExistException re){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(re.getMessage());
        }
    }

    @DeleteMapping()
    public void deleteRole(@PathVariable("roleId") Long roleId){
        roleService.deleteRole(roleId);
    }
}

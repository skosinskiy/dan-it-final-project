package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.RoleRequest;
import com.danit.finalproject.application.dto.response.RoleResponse;
import com.danit.finalproject.application.facade.RoleFacade;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/roles")
public class RoleController {

  private RoleFacade roleFacade;

  @Autowired
  public RoleController(RoleFacade roleFacade) {
    this.roleFacade = roleFacade;
  }

  @GetMapping
  public ResponseEntity<List<RoleResponse>> getAllRoles() {
    return new ResponseEntity<>(roleFacade.getAll(), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<RoleResponse> createRole(@RequestBody RoleRequest roleRequest) {
    return new ResponseEntity<>(roleFacade.create(roleRequest), HttpStatus.OK);
  }

  @PutMapping("{roleId}")
  public ResponseEntity<RoleResponse> updateRole(@PathVariable Long roleId, @RequestBody RoleRequest roleRequest) {
    return new ResponseEntity<>(roleFacade.update(roleId, roleRequest), HttpStatus.OK);
  }

  @DeleteMapping("{roleId}")
  public ResponseEntity<RoleResponse> deleteRole(@PathVariable Long roleId) {
    return new ResponseEntity<>(roleFacade.delete(roleId), HttpStatus.OK);
  }

}

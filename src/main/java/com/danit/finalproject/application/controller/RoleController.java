package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.RoleRequestDto;
import com.danit.finalproject.application.dto.response.RoleResponseDto;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.facade.RoleFacade;
import com.danit.finalproject.application.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/roles")
public class RoleController {

  private RoleFacade roleFacade;

  @Autowired
  public RoleController(RoleFacade roleFacade) {
    this.roleFacade = roleFacade;
  }

  @GetMapping
  public List<RoleResponseDto> getAllRoles() {
    return roleFacade.getAll();
  }

  @PostMapping
  public RoleResponseDto createRole(@RequestBody RoleRequestDto roleRequestDto) {
    return roleFacade.create(roleRequestDto);
  }

  @PutMapping("{roleId}")
  public RoleResponseDto updateRole(@PathVariable Long roleId, @RequestBody RoleRequestDto roleRequestDto) {
    return roleFacade.update(roleId, roleRequestDto);
  }

  @DeleteMapping("{roleId}")
  public RoleResponseDto deleteRole(@PathVariable Long roleId) {
    return roleFacade.delete(roleId);
  }

}

package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.RoleRequest;
import com.danit.finalproject.application.dto.response.RoleResponse;
import com.danit.finalproject.application.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleFacade extends AbstractDtoFacade<Role, RoleRequest, RoleResponse> {

}

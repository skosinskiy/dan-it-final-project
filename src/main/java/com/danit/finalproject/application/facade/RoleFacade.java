package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.RoleRequestDto;
import com.danit.finalproject.application.dto.response.RoleResponseDto;
import com.danit.finalproject.application.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleFacade extends AbstractDtoFacade<Role, RoleRequestDto, RoleResponseDto> {

}

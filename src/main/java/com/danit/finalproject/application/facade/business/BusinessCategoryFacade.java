package com.danit.finalproject.application.facade.business;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequestDto;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponseDto;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import org.springframework.stereotype.Component;

@Component
public class BusinessCategoryFacade extends
    AbstractDtoFacade<BusinessCategory, BusinessCategoryRequestDto, BusinessCategoryResponseDto> {
}

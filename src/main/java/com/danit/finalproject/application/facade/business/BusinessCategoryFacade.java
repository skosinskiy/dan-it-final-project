package com.danit.finalproject.application.facade.business;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class BusinessCategoryFacade extends
    AbstractDtoFacade<BusinessCategory, BusinessCategoryRequest, BusinessCategoryResponse> {
  private BusinessCategoryService businessCategoryService;

  public BusinessCategoryFacade(
      BusinessCategoryService businessCategoryService) {
    this.businessCategoryService = businessCategoryService;
  }

  public List<BusinessCategoryResponse> getAllParent() {
    return mapEntityListToResponseDtoList(businessCategoryService.findByParentCategoryIsNull());
  }
}

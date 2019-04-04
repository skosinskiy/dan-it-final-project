package com.danit.finalproject.application.facade.business;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Component
public class BusinessCategoryFacade extends
    AbstractDtoFacade<BusinessCategory, BusinessCategoryRequest, BusinessCategoryResponse> {

  private BusinessCategoryService businessCategoryService;

  @Autowired
  public BusinessCategoryFacade(BusinessCategoryService businessCategoryService) {
    this.businessCategoryService = businessCategoryService;
  }

  public BusinessCategoryResponse deleteBusinessCategory(Long businessCategoryId) {
    BusinessCategory businessCategory = businessCategoryService.getById(businessCategoryId);
    businessCategory
        .getBusinesses()
        .forEach(business -> business.getCategories().remove(businessCategory));
    businessCategoryService.delete(businessCategoryId);
    return mapEntityToResponseDto(businessCategory);
  }

  public BusinessCategoryResponse createAndPutS3Image(
      BusinessCategoryRequest businessCategoryRequest) throws IOException {

    BusinessCategory businessCategory = mapRequestDtoToEntity(businessCategoryRequest);
    BusinessCategory createdBusinessCategory =
        businessCategoryService.createAndPutS3Image(businessCategoryRequest.getImageFile(), businessCategory);
    return mapEntityToResponseDto(createdBusinessCategory);
  }
}

package com.danit.finalproject.application.facade.business;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class BusinessCategoryFacade extends
    AbstractDtoFacade<BusinessCategory, BusinessCategoryRequest, BusinessCategoryResponse> {

  private BusinessCategoryService businessCategoryService;

  @Autowired
  public BusinessCategoryFacade(BusinessCategoryService businessCategoryService) {
    this.businessCategoryService = businessCategoryService;
  }

  public BusinessCategoryResponse createAndPutS3Image(
      BusinessCategoryRequest businessCategoryRequest, MultipartFile imageFile) throws IOException {

    BusinessCategory businessCategory = mapRequestDtoToEntity(businessCategoryRequest);
    BusinessCategory createdBusinessCategory =
        businessCategoryService.createAndPutS3Image(imageFile, businessCategory);
    return mapEntityToResponseDto(createdBusinessCategory);
  }
}

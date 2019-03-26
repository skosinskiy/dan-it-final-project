package com.danit.finalproject.application.facade.business;

import com.danit.finalproject.application.dto.request.business.BusinessPhotoRequest;
import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.business.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BusinessFacade extends AbstractDtoFacade<Business, BusinessRequest, BusinessResponse> {

  private BusinessService businessService;

  @Autowired
  public BusinessFacade(BusinessService businessService) {
    this.businessService = businessService;
  }

  public List<BusinessResponse> getAllByPlace(Long placeId) {
    List<Business> businesses = businessService.findAllByPlace(placeId);
    return mapEntityListToResponseDtoList(businesses);
  }

  public BusinessResponse addPhoto(BusinessPhotoRequest businessPhotoRequest, Long businessId) {
    BusinessPhoto eventPhoto = modelMapper.map(businessPhotoRequest, BusinessPhoto.class);
    Business updatedBusiness = businessService.addPhoto(eventPhoto, businessId);
    return mapEntityToResponseDto(updatedBusiness);
  }

  public BusinessResponse deleteBusinessPhoto(Long businessId, Long photoId) {
    Business business = businessService.deleteBusinessPhoto(businessId, photoId);
    return mapEntityToResponseDto(business);
  }
}

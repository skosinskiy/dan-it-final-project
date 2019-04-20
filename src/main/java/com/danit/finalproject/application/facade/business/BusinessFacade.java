package com.danit.finalproject.application.facade.business;

import com.danit.finalproject.application.dto.request.business.BusinessPhotoRequest;
import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.business.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BusinessFacade extends AbstractDtoFacade<Business, BusinessRequest, BusinessResponse> {

  private BusinessService businessService;

  @Autowired
  public BusinessFacade(BusinessService businessService) {
    this.businessService = businessService;
  }

  public Page<BusinessResponse> findBusinesses(Long placeId, Long categotyId, String title, Pageable pageable) {
    return mapEntityListToResponseDtoList(businessService.findBusinesses(placeId, categotyId, title, pageable));
  }

  public BusinessResponse createBusinessPhotos(List<BusinessPhotoRequest> businessPhotosRequest, Long businessId) {
    List<BusinessPhoto> businessPhotos = businessPhotosRequest
        .stream()
        .map(businessPhotoRequest -> modelMapper.map(businessPhotoRequest, BusinessPhoto.class))
        .collect(Collectors.toList());
    Business updatedBusiness = businessService.createBusinessPhotos(businessPhotos, businessId);
    return mapEntityToResponseDto(updatedBusiness);
  }

  public BusinessResponse deleteBusinessPhoto(Long businessId, Long photoId) {
    Business business = businessService.deleteBusinessPhoto(businessId, photoId);
    return mapEntityToResponseDto(business);
  }
}

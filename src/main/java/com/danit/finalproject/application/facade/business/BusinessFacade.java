package com.danit.finalproject.application.facade.business;

import com.danit.finalproject.application.dto.request.business.BusinessPhotoRequestDto;
import com.danit.finalproject.application.dto.request.business.BusinessRequestDto;
import com.danit.finalproject.application.dto.response.business.BusinessResponseDto;
import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.business.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BusinessFacade extends AbstractDtoFacade<Business, BusinessRequestDto, BusinessResponseDto> {

  private BusinessService businessService;

  @Autowired
  public BusinessFacade(BusinessService businessService) {
    this.businessService = businessService;
  }

  public List<BusinessResponseDto> getAllByPlace(Long placeId) {
    List<Business> businesses = businessService.findAllByPlace(placeId);
    return mapEntityListToResponseDtoList(businesses);
  }

  public BusinessResponseDto addPhoto(BusinessPhotoRequestDto businessPhotoRequestDto, Long businessId) {
    BusinessPhoto eventPhoto = modelMapper.map(businessPhotoRequestDto, BusinessPhoto.class);
    Business updatedBusiness = businessService.addPhoto(eventPhoto, businessId);
    return mapEntityToResponseDto(updatedBusiness);
  }
}

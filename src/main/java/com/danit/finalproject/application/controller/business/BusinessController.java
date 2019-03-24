package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.dto.request.business.BusinessPhotoRequestDto;
import com.danit.finalproject.application.dto.request.business.BusinessRequestDto;
import com.danit.finalproject.application.dto.response.business.BusinessResponseDto;
import com.danit.finalproject.application.facade.business.BusinessFacade;
import com.danit.finalproject.application.service.business.BusinessPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/businesses")
public class BusinessController {
  private BusinessFacade businessFacade;
  private BusinessPhotoService businessPhotoService;

  @Autowired
  public BusinessController(BusinessFacade businessFacade, BusinessPhotoService businessPhotoService) {
    this.businessFacade = businessFacade;
    this.businessPhotoService = businessPhotoService;
  }

  @GetMapping("{id}")
  public BusinessResponseDto getBusinessById(@PathVariable("id") Long businessId) {
    return businessFacade.getById(businessId);
  }

  @GetMapping
  public List<BusinessResponseDto> getAllBusinesses(@RequestParam("placeId") Long placeId) {
    return businessFacade.getAllByPlace(placeId);
  }

  @PostMapping
  public BusinessResponseDto createNewBusiness(@RequestBody BusinessRequestDto businessRequestDto) {
    return businessFacade.create(businessRequestDto);
  }

  @PutMapping("{id}")
  public BusinessResponseDto updateBusiness(@PathVariable Long id, @RequestBody BusinessRequestDto businessRequestDto) {
    return businessFacade.update(id, businessRequestDto);
  }

  @DeleteMapping("{id}")
  public BusinessResponseDto deleteBusiness(@PathVariable("id") Long businessId) {
    return businessFacade.delete(businessId);
  }

  @PostMapping("/{businessId}/photos")
  public BusinessResponseDto addPhotosToBusiness(
      @RequestBody BusinessPhotoRequestDto businessPhotoRequestDto,
      @PathVariable("businessId") Long businessId) {
    return businessFacade.addPhoto(businessPhotoRequestDto, businessId);
  }

  @DeleteMapping("/{businessId}/photos/{photoId}")
  public void deletePhoto(@PathVariable("photoId") Long photoId) {
    businessPhotoService.deleteBusinessPhoto(photoId);
  }
}

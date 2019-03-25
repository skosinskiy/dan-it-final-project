package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.dto.request.business.BusinessPhotoRequest;
import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.facade.business.BusinessFacade;
import com.danit.finalproject.application.service.business.BusinessPhotoService;
import java.util.List;
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
  public BusinessResponse getBusinessById(@PathVariable("id") Long businessId) {
    return businessFacade.getById(businessId);
  }

  @GetMapping
  public List<BusinessResponse> getAllBusinesses(@RequestParam("placeId") Long placeId) {
    return businessFacade.getAllByPlace(placeId);
  }

  @PostMapping
  public BusinessResponse createNewBusiness(@RequestBody BusinessRequest businessRequest) {
    return businessFacade.create(businessRequest);
  }

  @PutMapping("{id}")
  public BusinessResponse updateBusiness(@PathVariable Long id, @RequestBody BusinessRequest businessRequest) {
    return businessFacade.update(id, businessRequest);
  }

  @DeleteMapping("{id}")
  public BusinessResponse deleteBusiness(@PathVariable("id") Long businessId) {
    return businessFacade.delete(businessId);
  }

  @PostMapping("/{businessId}/photos")
  public BusinessResponse addPhotosToBusiness(
      @RequestBody BusinessPhotoRequest businessPhotoRequest,
      @PathVariable("businessId") Long businessId) {
    return businessFacade.addPhoto(businessPhotoRequest, businessId);
  }

  @DeleteMapping("/{businessId}/photos/{photoId}")
  public void deletePhoto(@PathVariable("photoId") Long photoId) {
    businessPhotoService.deleteBusinessPhoto(photoId);
  }
}

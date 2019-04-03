package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.dto.request.business.BusinessPhotoRequest;
import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.facade.business.BusinessFacade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

  @Autowired
  public BusinessController(BusinessFacade businessFacade) {
    this.businessFacade = businessFacade;
  }

  @GetMapping("{id}")
  public ResponseEntity<BusinessResponse> getBusinessById(@PathVariable("id") Long businessId) {
    return new ResponseEntity<>(businessFacade.getById(businessId), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<BusinessResponse>> getAllBusinesses(
      @RequestParam(name = "placeId", required = false) Long placeId,
      @RequestParam(name = "name", required = false) String name) {
    return new ResponseEntity<>(businessFacade.findBusinesses(placeId, name), HttpStatus.OK);
  }

  @PostMapping
  public BusinessResponse createNewBusiness(@RequestBody BusinessRequest businessRequest) {
    return businessFacade.create(businessRequest);
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAuthority('MANAGE_BUSINESS')")
  public ResponseEntity<BusinessResponse> updateBusiness(
      @PathVariable Long id,
      @RequestBody BusinessRequest businessRequest) {
    return new ResponseEntity<>(businessFacade.update(id, businessRequest), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('MANAGE_BUSINESS')")
  public ResponseEntity<BusinessResponse> deleteBusiness(@PathVariable("id") Long businessId) {
    return new ResponseEntity<>(businessFacade.delete(businessId), HttpStatus.OK);
  }

  @PostMapping("/{businessId}/photos")
  @PreAuthorize("hasAuthority('MANAGE_BUSINESS')")
  public ResponseEntity<BusinessResponse> addPhotosToBusiness(
      @RequestBody BusinessPhotoRequest businessPhotoRequest,
      @PathVariable("businessId") Long businessId) {
    return new ResponseEntity<>(businessFacade.addPhoto(businessPhotoRequest, businessId), HttpStatus.OK);
  }

  @DeleteMapping("/{businessId}/photos/{photoId}")
  @PreAuthorize("hasAuthority('MANAGE_BUSINESS')")
  public ResponseEntity<BusinessResponse> deletePhoto(
      @PathVariable Long businessId,
      @PathVariable("photoId") Long photoId) {
    return new ResponseEntity<>(businessFacade.deleteBusinessPhoto(businessId, photoId), HttpStatus.OK);
  }
}

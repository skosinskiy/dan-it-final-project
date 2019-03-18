package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.service.business.BusinessPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/businesses/{businessId}/photos")
public class BusinessPhotoController {
  private BusinessPhotoService businessPhotoService;

  @Autowired
  public BusinessPhotoController(BusinessPhotoService businessPhotoService) {
    this.businessPhotoService = businessPhotoService;
  }

  @PostMapping
  public void addPhotosToBusiness(@RequestBody BusinessPhoto businessPhoto, @PathVariable("businessId") Long businessId) {
    businessPhotoService.createNewBusinessPhoto(businessPhoto, businessId);
  }

  @DeleteMapping("/{photoId}")
  public void deletePhoto(@PathVariable("photoId") Long photoId) {
    businessPhotoService.deleteBusinesPhoto(photoId);
  }

}

package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.repository.business.BusinessPhotoRepository;
import com.danit.finalproject.application.repository.business.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessPhotoService {
  private BusinessPhotoRepository businessPhotoRepository;
  private BusinessRepository businessRepository;

  @Autowired
  public BusinessPhotoService(BusinessPhotoRepository businessPhotoRepository, BusinessRepository businessRepository) {
    this.businessPhotoRepository = businessPhotoRepository;
    this.businessRepository = businessRepository;
  }

  public BusinessPhoto getBusinessPhotoById(Long photoId) {
    return businessPhotoRepository.findById(photoId).orElse(null);
  }

  public BusinessPhoto createNewBusinessPhoto(BusinessPhoto businessPhoto, Long businessId) {
    businessPhoto.setBusiness(businessRepository.findById(businessId).orElse(null));
    return businessPhotoRepository.save(businessPhoto);
  }

  public void deleteBusinesPhoto(Long photoId) {
    businessPhotoRepository.deleteById(photoId);
  }
}

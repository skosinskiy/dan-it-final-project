package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.repository.business.BusinessPhotoRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BusinessPhotoService {
  private BusinessPhotoRepository businessPhotoRepository;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public BusinessPhotoService(
      BusinessPhotoRepository businessPhotoRepository,
      AmazonS3Service amazonS3Service) {
    this.businessPhotoRepository = businessPhotoRepository;
    this.amazonS3Service = amazonS3Service;
  }

  public BusinessPhoto getBusinessPhotoById(Long photoId) {
    return businessPhotoRepository.findById(photoId).orElse(null);
  }

  @Transactional
  public BusinessPhoto deleteBusinessPhoto(BusinessPhoto businessPhoto) {
    businessPhotoRepository.delete(businessPhoto);
    amazonS3Service.deleteObject(businessPhoto.getImageKey());
    return businessPhoto;
  }
}

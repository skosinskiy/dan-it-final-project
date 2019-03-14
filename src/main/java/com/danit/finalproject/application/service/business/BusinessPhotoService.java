package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.repository.business.BusinessPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessPhotoService {
  private BusinessPhotoRepository businessPhotoRepository;

  @Autowired
  public BusinessPhotoService(BusinessPhotoRepository businessPhotoRepository) {
    this.businessPhotoRepository = businessPhotoRepository;
  }

  public void createNewBusinessPhoto(BusinessPhoto businessPhoto) {
    businessPhotoRepository.save(businessPhoto);
  }

  public void deleteBusinesPhoto(Long id) {
    businessPhotoRepository.deleteById(id);
  }
}

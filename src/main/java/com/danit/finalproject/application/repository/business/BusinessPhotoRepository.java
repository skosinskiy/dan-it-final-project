package com.danit.finalproject.application.repository.business;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessPhotoRepository extends JpaRepository<BusinessPhoto, Long> {
  BusinessPhoto deleteByIdAndBusiness(Long photoId, Business business);

  BusinessPhoto getByIdAndBusiness(Long photoId, Business business);
}

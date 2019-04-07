package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.repository.business.BusinessRepository;
import com.danit.finalproject.application.repository.event.EventRepository;
import com.danit.finalproject.application.service.CrudService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessService implements CrudService<Business> {
  private BusinessRepository businessRepository;
  private BusinessPhotoService businessPhotoService;

  @Autowired
  public BusinessService(
      BusinessRepository businessRepository,
      BusinessPhotoService businessPhotoService, EventRepository eventRepository) {
    this.businessRepository = businessRepository;
    this.businessPhotoService = businessPhotoService;
  }

  @Override
  public Business getById(Long id) {
    return businessRepository.findById(id).orElse(null);
  }

  @Override
  public List<Business> getAll() {
    return businessRepository.findAll();
  }

  public List<Business> findBusinesses(Long placeId, String title) {
    return businessRepository.findByParams(placeId, title);
  }

  @Override
  public Business create(Business business) {
    return businessRepository.save(business);
  }

  @Override
  public Business update(Long id, Business business) {
    business.setId(id);
    return businessRepository.save(business);
  }

  @Override
  public Business delete(Long id) {
    Business business = businessRepository.findById(id).orElse(null);

    businessRepository.deleteById(id);

    return business;
  }

  public Business addPhoto(BusinessPhoto businessPhoto, Long businessId) {
    Optional<Business> optionalBusiness = businessRepository.findById(businessId);
    optionalBusiness.ifPresent(business -> business.getPhotos().add(businessPhoto));
    Business business = optionalBusiness.orElse(null);
    businessRepository.save(business);
    return business;
  }

  public Business deleteBusinessPhoto(Long businessId, Long photoId) {
    Optional<Business> optionalBusiness = businessRepository.findById(businessId);
    if (optionalBusiness.isPresent()) {
      Optional<BusinessPhoto> optionalBusinessPhoto = optionalBusiness.get().getPhotos()
          .stream()
          .filter(photo -> photoId.equals(photo.getId()))
          .findFirst();
      optionalBusinessPhoto.ifPresent(photo -> businessPhotoService.deleteBusinessPhoto(photo));
    }
    return optionalBusiness.orElse(null);
  }
}


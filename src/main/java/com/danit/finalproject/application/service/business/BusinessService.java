package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.repository.business.BusinessRepository;
import com.danit.finalproject.application.service.CrudService;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BusinessService implements CrudService<Business> {
  private BusinessRepository businessRepository;
  private BusinessPhotoService businessPhotoService;

  @Autowired
  public BusinessService(
      BusinessRepository businessRepository,
      BusinessPhotoService businessPhotoService) {
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

  public Page<Business> findBusinesses(Long placeId, String title, Pageable pageable) {
    return businessRepository.findByParams(placeId, title, pageable);
  }

  @Override
  public Business create(Business business) {
    return businessRepository.save(business);
  }

  @Override
  public Business update(Long id, Business business) {
    List<BusinessPhoto> updatedBusinessPhotos = business.getPhotos();
    deleteBusinessPhotos(getById(id).getPhotos(), updatedBusinessPhotos);
    updatedBusinessPhotos.forEach(businessPhoto -> businessPhoto.setBusiness(business));
    business.setId(id);
    return businessRepository.save(business);
  }

  private void deleteBusinessPhotos(
      List<BusinessPhoto> currentBusinessPhotos,
      List<BusinessPhoto> updatedBusinessPhotos) {
    currentBusinessPhotos
        .stream()
        .filter(currentBusinessPhoto -> updatedBusinessPhotos
                .stream()
                .noneMatch(businessPhoto -> currentBusinessPhoto.getImageKey().equals(businessPhoto.getImageKey())))
        .forEach(businessPhoto -> businessPhotoService.deleteBusinessPhoto(businessPhoto));
  }

  @Override
  public Business delete(Long id) {
    Business business = businessRepository.findById(id).orElse(null);
    if (business != null) {
      business.getPhotos().forEach(businessPhoto -> businessPhotoService.deleteBusinessPhoto(businessPhoto));
    }
    businessRepository.deleteById(id);
    return business;
  }

  public Business createBusinessPhotos(List<BusinessPhoto> businessPhotos, Long businessId) {
    Business business = getById(businessId);
    business.setPhotos(businessPhotos);
    return businessRepository.save(business);
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


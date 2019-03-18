package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.repository.business.BusinessRepository;
import com.danit.finalproject.application.repository.place.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {
  private BusinessRepository businessRepository;
  private PlaceRepository placeRepository;

  @Autowired
  public BusinessService(BusinessRepository businessRepository, PlaceRepository placeRepository) {
    this.businessRepository = businessRepository;
    this.placeRepository = placeRepository;
  }

  public Business getBusinessById(Long id) {
    return businessRepository.findById(id).orElse(null);
  }

  public List<Business> findAllByPlace(Long placeId) {
    return businessRepository.findAllByPlace(placeRepository.findById(placeId).orElse(null));
  }

  public Business createNewBusiness(Business business) {
    return businessRepository.save(business);
  }

  public Business updateBusiness(Business business) {
    return businessRepository.saveAndFlush(business);
  }

  public void deleteBusiness(Long id) {
    businessRepository.deleteById(id);
  }
}


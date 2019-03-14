package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.repository.business.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {
  private BusinessRepository businessRepository;

  @Autowired
  public BusinessService(BusinessRepository businessRepository) {
    this.businessRepository = businessRepository;
  }

  public Business getBusinessById(Long id) {
    return businessRepository.getOne(id);
  }

//  public List<Business> findAllByLocation() {
//    return businessRepository.findAll();
//  }

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


package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.repository.business.BusinessCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessCategoryService {
  private BusinessCategoryRepository businessCategoryRepository;

  @Autowired
  public BusinessCategoryService(BusinessCategoryRepository businessCategoryRepository) {
    this.businessCategoryRepository = businessCategoryRepository;
  }

  public BusinessCategory getBusinessCategoryById(Long id) {
    return businessCategoryRepository.findById(id).orElse(null);
  }

  public List<BusinessCategory> findAll() {
    return businessCategoryRepository.findAll();
  }

  public BusinessCategory createNewBusinesCategory(BusinessCategory businessCategory) {
    return businessCategoryRepository.save(businessCategory);
  }

  public BusinessCategory updateBusinessCategory(BusinessCategory businessCategory) {
    return businessCategoryRepository.saveAndFlush(businessCategory);
  }

  public void deleteBusinessCategory(Long id) {
    businessCategoryRepository.deleteById(id);
  }
}

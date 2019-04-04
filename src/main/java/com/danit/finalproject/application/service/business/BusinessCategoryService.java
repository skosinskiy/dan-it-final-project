package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.repository.business.BusinessCategoryRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.CrudService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessCategoryService implements CrudService<BusinessCategory> {
  private BusinessCategoryRepository businessCategoryRepository;

  @Autowired
  public BusinessCategoryService(BusinessCategoryRepository businessCategoryRepository) {
    this.businessCategoryRepository = businessCategoryRepository;
  }

  @Override
  public BusinessCategory getById(Long id) {
    return businessCategoryRepository.findById(id).orElse(null);
  }

  @Override
  public List<BusinessCategory> getAll() {
    return businessCategoryRepository.findAll();
  }

  @Override
  public BusinessCategory create(BusinessCategory businessCategory) {
    return businessCategoryRepository.save(businessCategory);
  }

  @Override
  public BusinessCategory update(Long id, BusinessCategory businessCategory) {
    businessCategory.setId(id);

    return businessCategoryRepository.saveAndFlush(businessCategory);
  }

  @Override
  public BusinessCategory delete(Long id) {
    BusinessCategory businessCategory = businessCategoryRepository.findById(id).orElse(null);
    businessCategoryRepository.deleteById(id);
    return businessCategory;
  }
}

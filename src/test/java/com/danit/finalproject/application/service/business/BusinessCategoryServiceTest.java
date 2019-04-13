package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.repository.business.BusinessCategoryRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BusinessCategoryServiceTest {

  @Autowired
  private BusinessCategoryService businessCategoryService;

  @MockBean
  private BusinessCategoryRepository businessCategoryRepository;

  @MockBean
  private AmazonS3Service amazonS3Service;

  @Test
  public void verifyFindByIdCalledOnce() {
    Long expectedId = 1L;
    when(businessCategoryRepository.findById(expectedId)).thenReturn(Optional.of(new BusinessCategory()));

    BusinessCategory businessCategory = businessCategoryService.getById(expectedId);

    verify(businessCategoryRepository, times(1)).findById(expectedId);
    assertNotNull(businessCategory);
  }

  @Test
  public void verifyFindAllCalledOnce() {
    when(businessCategoryRepository.findAll()).thenReturn(new ArrayList<>());

    List<BusinessCategory> businessCategories = businessCategoryService.getAll();

    verify(businessCategoryRepository, times(1)).findAll();
    assertNotNull(businessCategories);
  }

  @Test
  public void verifySaveCalledOnce() {
    String expectedName = "testName";
    BusinessCategory businessCategory = new BusinessCategory();
    businessCategory.setName(expectedName);
    when(businessCategoryRepository.save(businessCategory)).thenReturn(businessCategory);
    BusinessCategory createdBusinesCategory = businessCategoryService.create(businessCategory);

    verify(businessCategoryRepository, times(1)).save(businessCategory);
    assertEquals(expectedName, createdBusinesCategory.getName());
  }

  @Test
  public void verifySaveCalledOnceAndS3ServiceDeleteCalledOnce() {
    Long expectedId = 2L;
    String expectedName = "testName";
    String expectedImageKey = "imageKey";
    String currentImageKey = "currentImageKey";
    BusinessCategory updateBusinessCategory = new BusinessCategory();
    updateBusinessCategory.setName(expectedName);
    updateBusinessCategory.setImageKey(expectedImageKey);
    updateBusinessCategory.setId(expectedId);
    BusinessCategory currentBusinessCategory = new BusinessCategory();
    currentBusinessCategory.setImageKey(currentImageKey);

    when(businessCategoryRepository.findById(expectedId)).thenReturn(Optional.of(currentBusinessCategory));
    when(businessCategoryRepository.saveAndFlush(updateBusinessCategory)).thenReturn(updateBusinessCategory);
    BusinessCategory updatedBusinessCategory = businessCategoryService.update(expectedId, updateBusinessCategory);

    verify(businessCategoryRepository, times(1)).saveAndFlush(updateBusinessCategory);
    verify(amazonS3Service, times(1)).deleteObject(currentImageKey);
    assertEquals(expectedId, updatedBusinessCategory.getId());
    assertEquals(expectedName, updatedBusinessCategory.getName());
    assertEquals(expectedImageKey, updatedBusinessCategory.getImageKey());
  }

  @Test
  public void verifyDeleteCalledOnceAndS3ServiceDeleteCalledOnce() {
    Long expectedId = 2L;
    String expectedName = "testName";
    String expectedImageKey = "imageKey";

    BusinessCategory businessCategory = new BusinessCategory();
    businessCategory.setName(expectedName);
    businessCategory.setImageKey(expectedImageKey);
    businessCategory.setId(expectedId);
    businessCategory.setBusinesses(new ArrayList<>());

    List<BusinessCategory> businessCategories = new ArrayList<>();
    BusinessCategory childBusinessCategory = new BusinessCategory();
    childBusinessCategory.setParentCategory(businessCategory);
    businessCategories.add(childBusinessCategory);

    when(businessCategoryRepository.findById(expectedId)).thenReturn(Optional.of(businessCategory));
    when(businessCategoryRepository.findAll()).thenReturn(businessCategories);

    BusinessCategory deletedBusinessCategory = businessCategoryService.delete(expectedId);

    verify(amazonS3Service, times(1)).deleteObject(expectedImageKey);
    verify(businessCategoryRepository, times(1)).findAll();
    verify(businessCategoryRepository, times(1)).delete(businessCategory);
    assertEquals(businessCategory, deletedBusinessCategory);
  }
}
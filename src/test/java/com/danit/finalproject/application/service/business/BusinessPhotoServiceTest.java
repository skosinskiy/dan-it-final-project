package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.repository.business.BusinessPhotoRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BusinessPhotoServiceTest {

  @Autowired
  private BusinessPhotoService businessPhotoService;

  @MockBean
  private BusinessPhotoRepository businessRepository;

  @MockBean
  private AmazonS3Service amazonS3Service;

  @Test
  public void verifyFindByIdCalledOnce() {
    Long expectedId = 1L;
    when(businessRepository.findById(expectedId)).thenReturn(Optional.of(new BusinessPhoto()));

    BusinessPhoto businessPhoto = businessPhotoService.getBusinessPhotoById(expectedId);

    verify(businessRepository, times(1)).findById(expectedId);
    assertNotNull(businessPhoto);
  }

  @Test
  public void verifyDeleteCalledOnceAndAmazonS3DeleteCalledOnce() {
    Long expectedId = 1L;
    String expectedImageKey = "imageKey";
    BusinessPhoto businessPhoto = new BusinessPhoto();
    businessPhoto.setId(expectedId);
    businessPhoto.setImageKey(expectedImageKey);
    BusinessPhoto deletedBusinessPhoto = businessPhotoService.deleteBusinessPhoto(businessPhoto);

    verify(businessRepository, times(1)).delete(businessPhoto);
    verify(amazonS3Service, times(1)).deleteObject(expectedImageKey);
    assertEquals(businessPhoto, deletedBusinessPhoto);
  }

}

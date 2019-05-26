package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.repository.business.BusinessRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BusinessServiceTest {

  @Autowired
  private BusinessService businessService;

  @MockBean
  private BusinessRepository businessRepository;

  @Test
  public void getAllTest() {
    when(businessRepository.findAll()).thenReturn(new ArrayList<>());

    List<Business> businessCategories = businessService.getAll();

    verify(businessRepository, times(1)).findAll();
    assertNotNull(businessCategories);
  }

  @Test
  public void updateWithMainPhotoTest() {
    Long businessId = 1L;

    BusinessPhoto mainPhoto = new BusinessPhoto();
    mainPhoto.setId(1L);
    mainPhoto.setImageKey("main");
    BusinessPhoto businessPhoto = new BusinessPhoto();
    mainPhoto.setId(2L);
    businessPhoto.setImageKey("photo1");
    ArrayList<BusinessPhoto> businessPhotos = new ArrayList<>();
    businessPhotos.add(businessPhoto);

    Business business = new Business();

    business.setMainPhoto(mainPhoto);
    business.setPhotos(businessPhotos);

    when(businessRepository.findById(businessId)).thenReturn(Optional.of(business));

    businessService.update(businessId, business);

    ArgumentCaptor<Business> captor = ArgumentCaptor.forClass(Business.class);
    verify(businessRepository, times(1)).save(captor.capture());
    Business savedBusiness = captor.getValue();

    assertEquals(2, savedBusiness.getPhotos().size());
    assertTrue(savedBusiness.getPhotos().stream().noneMatch(photo -> photo.getBusiness() == null));
  }
}
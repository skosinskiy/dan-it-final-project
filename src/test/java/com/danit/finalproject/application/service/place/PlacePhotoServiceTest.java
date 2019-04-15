package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.place.PlacePhotoRepository;
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
public class PlacePhotoServiceTest {

  @Autowired
  private PlacePhotoService placePhotoService;

  @MockBean
  private PlacePhotoRepository placeRepository;

  @MockBean
  private AmazonS3Service amazonS3Service;

  @Test
  public void verifyFindByIdCalledOnce() {
    Long expectedId = 1L;
    String expectedImageKey = "imageKey";
    PlacePhoto placePhoto = new PlacePhoto();
    placePhoto.setImageKey(expectedImageKey);
    when(placeRepository.findById(expectedId)).thenReturn(Optional.of(placePhoto));

    PlacePhoto createdPlacePhoto = placePhotoService.getPlacePhotoById(expectedId);

    verify(placeRepository, times(1)).findById(expectedId);
    assertNotNull(createdPlacePhoto);
    assertEquals(expectedImageKey, createdPlacePhoto.getImageKey());
  }

  @Test
  public void verifyDeleteCalledOnceAndAmazonS3DeleteCalledOnce() {
    Long expectedId = 1L;
    String expectedImageKey = "imageKey";
    PlacePhoto placePhoto = new PlacePhoto();
    placePhoto.setId(expectedId);
    placePhoto.setImageKey(expectedImageKey);
    PlacePhoto deletedPlacePhoto = placePhotoService.deletePlacePhoto(placePhoto);

    verify(placeRepository, times(1)).delete(placePhoto);
    verify(amazonS3Service, times(1)).deleteObject(expectedImageKey);
    assertEquals(placePhoto, deletedPlacePhoto);
  }

}

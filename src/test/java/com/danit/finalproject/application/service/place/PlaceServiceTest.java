package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.place.PlaceRepository;
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
public class PlaceServiceTest {

  @Autowired
  private PlaceService placeService;

  @MockBean
  private PlaceRepository placeRepository;

  @Test
  public void getAll() {
    when(placeRepository.findAll()).thenReturn(new ArrayList<>());

    List<Place> placeCategories = placeService.getAll();

    verify(placeRepository, times(1)).findAll();
    assertNotNull(placeCategories);
  }

  @Test
  public void update() {
    Long placeId = 1L;

    PlacePhoto mainPhoto = new PlacePhoto();
    mainPhoto.setId(1L);
    mainPhoto.setImageKey("main");
    PlacePhoto placePhoto = new PlacePhoto();
    mainPhoto.setId(2L);
    placePhoto.setImageKey("photo1");
    ArrayList<PlacePhoto> placePhotos = new ArrayList<>();
    placePhotos.add(placePhoto);

    Place place = new Place();

    place.setMainPhoto(mainPhoto);
    place.setPhotos(placePhotos);

    when(placeRepository.findById(placeId)).thenReturn(Optional.of(place));

    placeService.update(placeId, place);

    ArgumentCaptor<Place> captor = ArgumentCaptor.forClass(Place.class);
    verify(placeRepository, times(1)).save(captor.capture());
    Place savedPlace = captor.getValue();

    assertEquals(2, savedPlace.getPhotos().size());
    assertTrue(savedPlace.getPhotos().stream().noneMatch(photo -> photo.getPlace() == null));
  }
}
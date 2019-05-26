package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.place.PlaceRepository;
import com.danit.finalproject.application.service.CrudService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class PlaceService implements CrudService<Place> {
  private PlaceRepository placeRepository;
  private PlacePhotoService placePhotoService;

  @Autowired
  public PlaceService(PlaceRepository placeRepository, PlacePhotoService placePhotoService) {
    this.placeRepository = placeRepository;
    this.placePhotoService = placePhotoService;
  }

  @Override
  public Place getById(Long id) {
    return placeRepository.findById(id).orElse(null);
  }

  @Override
  public List<Place> getAll() {
    return placeRepository.findAll();
  }

  public Page<Place> getAllPlacesByParam(String param, Pageable pageable) {
    return StringUtils.hasText(param)
        ? placeRepository.getAllPlacesByParam(param, pageable)
        : placeRepository.findAll(pageable);
  }

  @Override
  public Place create(Place place) {
    return placeRepository.save(place);
  }

  @Override
  public Place update(Long id, Place place) {
    List<PlacePhoto> updatedPlacePhotos = place.getPhotos();
    if (place.getMainPhoto() != null) {
      place.getMainPhoto().setPlace(place);
      updatedPlacePhotos.add(place.getMainPhoto());
    }
    deletePlacePhotos(getById(id).getPhotos(), updatedPlacePhotos);
    updatedPlacePhotos.forEach(businessPhoto -> businessPhoto.setPlace(place));
    place.setId(id);
    return placeRepository.save(place);
  }

  private void deletePlacePhotos(
      List<PlacePhoto> currentPlacePhotos,
      List<PlacePhoto> updatedPlacePhotos) {
    currentPlacePhotos
        .stream()
        .filter(currentBusinessPhoto -> updatedPlacePhotos
            .stream()
            .noneMatch(businessPhoto -> currentBusinessPhoto.getImageKey().equals(businessPhoto.getImageKey())))
        .forEach(businessPhoto -> placePhotoService.deletePlacePhoto(businessPhoto));
  }

  @Override
  public Place delete(Long id) {
    Place place = placeRepository.findById(id).orElse(null);
    if (place != null) {
      place.getPhotos().forEach(placePhoto -> placePhotoService.deletePlacePhoto(placePhoto));
    }
    placeRepository.deleteById(id);
    return place;
  }

  public Place createPlacePhotos(List<PlacePhoto> placePhotos, Long placeId) {
    Place place = getById(placeId);
    place.setPhotos(placePhotos);
    return placeRepository.save(place);
  }

  public Place deletePlacePhoto(Long placeId, Long photoId) {
    Optional<Place> optionalPlace = placeRepository.findById(placeId);
    if (optionalPlace.isPresent()) {
      Optional<PlacePhoto> optionalPlacePhoto = optionalPlace.get().getPhotos()
          .stream()
          .filter(photo -> photoId.equals(photo.getId()))
          .findFirst();
      optionalPlacePhoto.ifPresent(photo -> placePhotoService.deletePlacePhoto(photo));
    }
    return optionalPlace.orElse(null);
  }
}

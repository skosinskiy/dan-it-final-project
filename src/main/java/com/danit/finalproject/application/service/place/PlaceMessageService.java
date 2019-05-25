package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlaceMessage;
import com.danit.finalproject.application.repository.place.PlaceMessageRepository;
import com.danit.finalproject.application.service.CrudService;
import com.danit.finalproject.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceMessageService implements CrudService<PlaceMessage> {
  private PlaceMessageRepository placeMessageRepository;
  private UserService userService;
  private PlaceService placeService;

  @Autowired
  public PlaceMessageService(
      PlaceMessageRepository placeMessageRepository,
      UserService userService,
      PlaceService placeService) {
    this.placeMessageRepository = placeMessageRepository;
    this.placeService = placeService;
    this.userService = userService;
  }

  @Override
  public PlaceMessage getById(Long id) {
    return placeMessageRepository.findById(id).orElse(null);
  }

  @Override
  public List<PlaceMessage> getAll() {
    return placeMessageRepository.findAll();
  }

  @Override
  public PlaceMessage create(PlaceMessage entity) {
    entity.setId(null);
    return placeMessageRepository.save(entity);
  }

  public PlaceMessage create(PlaceMessage entity, Long placeId) {
    User user = userService.getPrincipalUser();
    Place place = placeService.getById(placeId);
    entity.setId(null);
    entity.setUser(user);
    entity.setPlace(place);
    return placeMessageRepository.save(entity);
  }

  @Override
  public PlaceMessage update(Long id, PlaceMessage entity) {
    return null;
  }

  @Override
  public PlaceMessage delete(Long id) {
    PlaceMessage placeMessage = getById(id);
    placeMessageRepository.delete(placeMessage);
    return placeMessage;
  }

  public List<PlaceMessage> getAllByParam(Long placeId) {
    return placeId == null
        ? getAll()
        : placeMessageRepository.findAllByPlaceId(placeId);
  }
}

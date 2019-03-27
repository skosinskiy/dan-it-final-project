package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Action;
import com.danit.finalproject.application.repository.ActionRepository;
import org.springframework.stereotype.Service;

@Service
public class ActionService {
  private ActionRepository actionRepository;

  public ActionService(ActionRepository actionRepository) {
    this.actionRepository = actionRepository;
  }

  public Action addNewAction(Action action) {
    return actionRepository.save(action);
  }
}

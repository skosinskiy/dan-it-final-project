package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.VisitAction;
import com.danit.finalproject.application.repository.VisitActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitActionService implements CrudService<VisitAction>{
  private VisitActionRepository visitActionRepository;

  @Autowired
  public VisitActionService(VisitActionRepository visitActionRepository) {
    this.visitActionRepository = visitActionRepository;
  }

  public VisitAction createNewVisit(VisitAction visitAction) {
    return visitActionRepository.save(visitAction);
  }

  @Override
  public VisitAction getById(Long id) {
    return visitActionRepository.findById(id).orElse(null);
  }

  @Override
  public List<VisitAction> getAll() {
    return visitActionRepository.findAll();
  }

  @Override
  public VisitAction create(VisitAction visitAction) {
    return visitActionRepository.save(visitAction);
  }

  @Override
  public VisitAction update(Long id, VisitAction visitAction) {
    visitAction.setId(id);
    return visitActionRepository.save(visitAction);
  }

  @Override
  public VisitAction delete(Long id) {
    VisitAction visitAction = visitActionRepository.findById(id).orElse(null);
    visitActionRepository.delete(visitAction);
    return visitAction;
  }
}

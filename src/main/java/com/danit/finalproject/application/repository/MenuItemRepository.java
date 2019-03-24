package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.menuitem.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

}


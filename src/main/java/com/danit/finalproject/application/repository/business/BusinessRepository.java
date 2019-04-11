package com.danit.finalproject.application.repository.business;

import com.danit.finalproject.application.entity.business.Business;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusinessRepository extends JpaRepository<Business, Long> {
  @Query("select b from Business b where "
      + "(:placeId is null or b.place.id = :placeId) and "
      + "(:title is null or lower(b.title) like lower(CONCAT('%', :title, '%')))")
  Page<Business> findByParams(@Param("placeId") Long placeId, @Param("title") String title, Pageable pageable);
}

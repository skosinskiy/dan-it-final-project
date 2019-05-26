package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.facade.business.BusinessFacade;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AbstractDtoFacadeTest {

  @Autowired
  private BusinessFacade businessFacade;

  @Test
  public void mapNullEntityToResponseDtoTest() {
    assertNull(businessFacade.mapEntityToResponseDto(null));
  }

  @Test
  public void mapNullRequestDtoToEntity() {
    assertNull(businessFacade.mapRequestDtoToEntity(null));
  }

  @Test
  public void mapNullEntityListToResponseDtoList() {
    List <Business> businesses = null;
    assertTrue(businessFacade.mapEntityListToResponseDtoList(businesses).isEmpty());
  }

  @Test
  public void mapNullEntityListToResponseDtoPage() {
    Page<Business> businesses = null;
    assertNull(businessFacade.mapEntityListToResponseDtoList(businesses));
  }
}
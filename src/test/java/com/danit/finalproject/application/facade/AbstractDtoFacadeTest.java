package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.entity.business.Business;
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
  private AbstractDtoFacade<Business, BusinessRequest, BusinessResponse> abstractDtoFacade;

  @Test
  public void mapNullEntityToResponseDtoTest() {
    assertNull(abstractDtoFacade.mapEntityToResponseDto(null));
  }

  @Test
  public void mapNullRequestDtoToEntity() {
    assertNull(abstractDtoFacade.mapRequestDtoToEntity(null));
  }

  @Test
  public void mapNullEntityListToResponseDtoList() {
    List <Business> businesses = null;
    assertTrue(abstractDtoFacade.mapEntityListToResponseDtoList(businesses).isEmpty());
  }

  @Test
  public void mapNullEntityListToResponseDtoPage() {
    Page<Business> businesses = null;
    assertNull(abstractDtoFacade.mapEntityListToResponseDtoList(businesses));
  }
}
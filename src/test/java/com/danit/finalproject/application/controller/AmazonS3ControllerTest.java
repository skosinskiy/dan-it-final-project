package com.danit.finalproject.application.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.danit.finalproject.application.dto.response.S3UploadResponse;
import com.danit.finalproject.application.dto.response.UserResponse;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Objects;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@WithMockUser(username = "first.user@test.com")
public class AmazonS3ControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private AmazonS3Client amazonS3Client;

  @Test
  public void uploadImageTest() throws Exception {
    InputStream fileStream = new ByteArrayInputStream(new byte[0]);
    String expectedImageUrl = "amazonS3URL";

    when(amazonS3Client.getResourceUrl(eq(AmazonS3Service.S3_BUCKET_NAME), anyString())).
        thenReturn(expectedImageUrl);

    MvcResult result = mockMvc.perform(
        MockMvcRequestBuilders.multipart("/api/s3/upload/image")
            .file(new MockMultipartFile("imageFile", fileStream))
            .with(csrf())
            .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
        .andReturn();

    String responseBody = result.getResponse().getContentAsString();
    S3UploadResponse s3UploadResponse = objectMapper.readValue(responseBody, S3UploadResponse.class);

    assertNotNull(s3UploadResponse.getFileKey());
    assertEquals(expectedImageUrl, s3UploadResponse.getFileResource());
    verify(amazonS3Client, times(1))
        .putObject(eq(AmazonS3Service.S3_BUCKET_NAME), anyString(), any(InputStream.class), eq(null));
  }

}

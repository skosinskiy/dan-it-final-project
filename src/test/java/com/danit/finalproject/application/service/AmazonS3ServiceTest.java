package com.danit.finalproject.application.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import com.amazonaws.services.s3.AmazonS3Client;
import com.danit.finalproject.application.dto.response.S3UploadResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.io.InputStream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AmazonS3ServiceTest {

  @Autowired
  private AmazonS3Service amazonS3Service;

  @MockBean
  private AmazonS3Client amazonS3Client;

  @Test
  public void verifyS3CalledAndKeyIsGenerated() throws IOException {
    int expectedKeyLength = 40;
    S3UploadResponse s3UploadResponse = amazonS3Service.putImage(new MockMultipartFile("file", new byte[0]));

    assertNotNull(s3UploadResponse.getFileKey());
    assertEquals(expectedKeyLength, s3UploadResponse.getFileKey().length());
    verify(amazonS3Client, times(1))
        .putObject(eq(AmazonS3Service.S3_BUCKET_NAME), anyString(), any(InputStream.class), eq(null));
  }

  @Test
  public void verifyS3DeleteCalled() {
    amazonS3Service.deleteObject("");
    verify(amazonS3Client, times(1))
        .deleteObject(eq(AmazonS3Service.S3_BUCKET_NAME), anyString());
  }

}

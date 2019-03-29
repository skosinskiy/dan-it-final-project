package com.danit.finalproject.application.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import java.io.File;
import java.io.InputStream;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AmazonS3Service {

  public static final String S3_BUCKET_NAME = "rion-up-project";
  private AmazonS3 s3;

  @Autowired
  public AmazonS3Service(AmazonS3 s3) {
    this.s3 = s3;
  }

  public String putObject(File file) {
    String fileKey = UUID.randomUUID().toString();
    s3.putObject(S3_BUCKET_NAME, fileKey, file);
    return fileKey;
  }

  public InputStream getObject(String fileKey) {
    S3Object s3Object = s3.getObject(S3_BUCKET_NAME, fileKey);
    return s3Object.getObjectContent();
  }

  public void deleteObject(String fileKey) {
    s3.deleteObject(S3_BUCKET_NAME, fileKey);
  }

}

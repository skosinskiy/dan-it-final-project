package com.danit.finalproject.application.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class S3UploadResponse {

  private String fileKey;
  private String fileResource;

}

declare namespace NodeJS {
  export interface ProcessEnv {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    NEXTAUTH_URL: string;
    MONGODB_URI: string;
    MY_AWS_ACCESS_KEY: string;
    MY_AWS_SECRET_KEY: string;
    MY_AWS_S3_BUCKET: string;
    MY_AWS_S3_BUCKET_REGION: string;
    BASE_URL: string;
  }
}

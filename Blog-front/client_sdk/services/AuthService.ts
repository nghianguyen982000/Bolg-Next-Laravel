/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegisterRequest } from '../models/RegisterRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

  /**
   * Register User
   * @returns any Successful operation
   * @throws ApiError
   */
  public static register({
    requestBody,
  }: {
    requestBody: RegisterRequest,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/register',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        403: `Forbidden`,
      },
    });
  }

  /**
   * login
   * @returns any Successful login
   * @throws ApiError
   */
  public static login({
    formData,
  }: {
    /**
     * User data
     */
    formData: {
      email?: string;
      password?: string;
    },
  }): CancelablePromise<{
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    user?: {
      id?: number;
      name?: string;
      email?: string;
      email_verified_at?: string;
      created_at?: string;
      updated_at?: string;
      primary_phone_number?: string;
      secondary_phone_number?: string;
      company_id?: number;
      role_id?: number;
      line_number?: string;
    };
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/login',
      formData: formData,
      mediaType: 'multipart/form-data',
      errors: {
        400: `error`,
        401: `Unauthenticated`,
        422: `Validation error`,
      },
    });
  }

}

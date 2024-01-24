/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import type { EmailVerifyRequest } from '../models/EmailVerifyRequest';
import type { ForgotPasswordRequest } from '../models/ForgotPasswordRequest';
import type { LoginRequest } from '../models/LoginRequest';
import type { RegisterRequest } from '../models/RegisterRequest';
import type { ResendPinRequest } from '../models/ResendPinRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

  /**
   * Register User
   * @returns any Register successfully
   * @throws ApiError
   */
  public static register({
    requestBody,
  }: {
    requestBody: RegisterRequest,
  }): CancelablePromise<{
    success?: boolean;
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/register',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation error`,
      },
    });
  }

  /**
   * Email verification.
   * @returns any Verify email successfully
   * @throws ApiError
   */
  public static emailVerify({
    requestBody,
  }: {
    requestBody: EmailVerifyRequest,
  }): CancelablePromise<{
    success?: boolean;
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/email/verify',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Verify email error`,
      },
    });
  }

  /**
   * Resend Pin.
   * @returns any Resend pin  successfully
   * @throws ApiError
   */
  public static resendPin({
    requestBody,
  }: {
    requestBody: ResendPinRequest,
  }): CancelablePromise<{
    success?: boolean;
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/email/verify/pin',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Resend pin  error`,
      },
    });
  }

  /**
   * Login
   * @returns any Login  successfully
   * @throws ApiError
   */
  public static login({
    requestBody,
  }: {
    requestBody: LoginRequest,
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
    };
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/login',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Resend pin  error`,
      },
    });
  }

  /**
   * Log the user out (Invalidate the token).
   * @returns any User successfully signed out
   * @throws ApiError
   */
  public static logout(): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/logout',
      errors: {
        401: `Unauthenticated`,
      },
    });
  }

  /**
   * Refresh a token.
   * @returns any Refresh successfully
   * @throws ApiError
   */
  public static refresh(): CancelablePromise<{
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
    };
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/refresh',
      errors: {
        401: `Unauthenticated`,
      },
    });
  }

  /**
   * Get the authenticated User.
   * @returns any Profile
   * @throws ApiError
   */
  public static useProfile(): CancelablePromise<{
    user?: {
      id?: number;
      name?: string;
      email?: string;
      email_verified_at?: string;
      created_at?: string;
      updated_at?: string;
    };
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/use-profile',
      errors: {
        401: `Unauthenticated`,
      },
    });
  }

  /**
   * Change PassWord.
   * @returns any User successfully changed password
   * @throws ApiError
   */
  public static changePassword({
    requestBody,
  }: {
    requestBody: ChangePasswordRequest,
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/change-password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `Unauthenticated`,
      },
    });
  }

  /**
   * Forgot password.
   * @returns any Please check your email to reset password
   * @throws ApiError
   */
  public static forgotPassword({
    requestBody,
  }: {
    requestBody: ForgotPasswordRequest,
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/forgot-password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `Unauthenticated`,
      },
    });
  }

  /**
   * Reset Password.
   * @returns any Your password has been reset
   * @throws ApiError
   */
  public static resetPassword({
    requestBody,
  }: {
    requestBody: ForgotPasswordRequest,
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/reset-password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `Unauthenticated`,
      },
    });
  }

}

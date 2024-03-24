/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageRequest } from '../models/MessageRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChatService {

  /**
   * Get detail conversation
   * @returns any Successfully
   * @throws ApiError
   */
  public static getInfoConversation({
    id,
  }: {
    /**
     * ID conversation
     */
    id: number,
  }): CancelablePromise<{
    success?: boolean;
    data?: {
      id?: number;
      room_name?: string;
    };
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/conversations/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get all Room
   * @returns any Successfully
   * @throws ApiError
   */
  public static getConversations(): CancelablePromise<{
    success?: boolean;
    data?: Array<{
      id?: number;
      room_name?: string;
    }>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/conversations',
    });
  }

  /**
   * Get message conversation
   * @returns any Successfully
   * @throws ApiError
   */
  public static getMessageConversation({
    id,
  }: {
    /**
     * ID conversation
     */
    id: number,
  }): CancelablePromise<{
    success?: boolean;
    data?: Array<{
      id?: number;
      message?: string;
      messageType?: number;
    }>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/conversations/{id}/messages',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Create message conversation
   * @returns any Successfully
   * @throws ApiError
   */
  public static createConversation({
    id,
    requestBody,
  }: {
    /**
     * ID conversation
     */
    id: number,
    requestBody: MessageRequest,
  }): CancelablePromise<{
    success?: boolean;
    data?: Array<{
      id?: number;
      content?: string;
      messageType?: number;
    }>;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/chat/conversations/{id}/messages',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

}

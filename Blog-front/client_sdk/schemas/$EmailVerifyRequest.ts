/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EmailVerifyRequest = {
  properties: {
    token: {
      type: 'string',
      isRequired: true,
      format: 'token',
    },
    email: {
      type: 'string',
      isRequired: true,
      format: 'email',
    },
  },
} as const;

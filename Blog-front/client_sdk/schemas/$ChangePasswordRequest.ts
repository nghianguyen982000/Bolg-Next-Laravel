/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChangePasswordRequest = {
  properties: {
    old_password: {
      type: 'string',
      isRequired: true,
      format: 'old_password',
    },
    new_password: {
      type: 'string',
      isRequired: true,
      format: 'new_password',
    },
  },
} as const;

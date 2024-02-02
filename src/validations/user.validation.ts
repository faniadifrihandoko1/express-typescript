import type UserType from '../types/user.type'
import joi from 'joi'

export const inputUserValidation = (
  payload: UserType
): joi.ValidationResult<UserType> => {
  const schema = joi.object({
    user_id: joi.string().trim().allow(null, ''),
    email: joi.string().trim().required().email().messages({
      'any.required': 'email harus diisi',
      'string.base': 'email harus berupa string',
      'string.empty': 'email tidak boleh kosong',
      'string.email': 'email harus valid'
    }),
    nama: joi.string().trim().required().messages({
      'any.required': 'name harus diisi',
      'string.base': 'name harus berupa string',
      'string.empty': 'name tidak boleh kosong'
    }),
    password: joi.string().min(3).max(15).required().messages({
      'any.required': 'password harus diisi',
      'string.base': 'password harus berupa string',
      'string.empty': 'password tidak boleh kosong',
      'string.min': 'password minimal 3 karakter',
      'string.max': 'password maksimal 15 karakter'
    }),
    confirmPassword: joi
      .any()
      .equal(joi.ref('password'))
      .required()
      .label('confirm password')
      .messages({
        'any.only': '{{#label}} does not match',
        'any.required': '{{#label}} harus diisi'
      }),
    role: joi.string().trim().allow(null, '')
  })
  return schema.validate(payload)
}

export const loginUserValidation = (
  payload: UserType
): joi.ValidationResult<UserType> => {
  const schema = joi.object({
    email: joi.string().trim().required().email().messages({
      'any.required': 'email harus diisi',
      'string.base': 'email harus berupa string',
      'string.empty': 'email tidak boleh kosong',
      'string.email': 'email harus valid'
    }),
    password: joi.string().required().messages({
      'any.required': 'password harus diisi',
      'string.base': 'password harus berupa string',
      'string.empty': 'password tidak boleh kosong'
    })
  })
  return schema.validate(payload)
}

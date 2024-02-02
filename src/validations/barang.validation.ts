import joi from 'joi'
import type barangType from '../types/barang.type'

export const inputBarangValidation = (
  payload: barangType
): joi.ValidationResult<barangType> => {
  const schema = joi.object({
    nama: joi.string().trim().required().messages({
      'any.required': 'nama harus diisi',
      'string.empty': 'nama tidak boleh kosong',
      'string.base': 'nama harus berupa string'
    }),
    jumlah: joi.number().required().messages({
      'any.required': 'jumlah harus diisi',
      'number.base': 'jumlah harus berupa angka',
      'number.empty': 'jumlah tidak boleh kosong'
    }),
    harga: joi.number().required().messages({
      'any.required': 'harga harus diisi',
      'number.base': 'harga harus berupa angka',
      'number.empty': 'harga tidak boleh kosong'
    })
  })
  return schema.validate(payload)
}

import { type NextFunction, type Request, type Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import {
  deleteBarang,
  getBarang,
  getBarangById,
  insertBarang,
  updateBarang
} from '../services/barang.service'

export const getAllBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const data = await getBarang()

    return res.status(200).json({
      error: null,
      message: 'Berhasil menampilkan semua data',
      data
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: getAllBarang -' +
          String((error as Error).message)
      )
    )
  }
}

export const getDataBarangById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params
    const barang = await getBarangById(parseInt(id))
    if (barang == null) {
      return res.status(404).json({
        error: 'data not found',
        message: 'data not found',
        data: null
      })
    }
    return res.status(200).json({
      error: null,
      message: 'berhasil menampilkan data ',
      data: barang
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: getDataBarangById -' +
          String((error as Error).message)
      )
    )
  }
}

export const insertDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { error, value } = inputBarangValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'input data gagal',
        data: value
      })
    }
    const barang = await insertBarang(value)
    return res
      .status(200)
      .json({ error: null, message: 'input data berhasil', data: barang })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: insertDataBarang -' +
          String((error as Error).message)
      )
    )
  }
}

export const updateDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { error, value } = inputBarangValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'update data gagal',
        data: value
      })
    }
    const data = await updateBarang({ ...value, id: parseInt(id) })
    return res
      .status(200)
      .json({ error: null, message: 'update data berhasil', data })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: updateDataBarang -' +
          String((error as Error).message)
      )
    )
  }
}

export const deleteDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params
    const data = await deleteBarang(parseInt(id))
    return res
      .status(200)
      .json({ error: null, message: 'delete data berhasil', data })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: deleteDataBarang -' +
          String((error as Error).message)
      )
    )
  }
}

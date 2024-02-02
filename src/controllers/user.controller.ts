import { type NextFunction, type Request, type Response } from 'express'
import {
  inputUserValidation,
  loginUserValidation
} from '../validations/user.validation'
import { createUser, userLogin } from '../services/user.service'
import { compare, encript } from '../utils/bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { error, value } = inputUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'input data gagal',
        data: value
      })
    }
    value.password = encript(value.password)
    delete value.confirmPassword
    const user = await createUser(value)
    return res.status(200).json({
      error: null,
      message: 'input data berhasil',
      data: user
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/user.controller.ts: registerUser -' +
          String((error as Error).message)
      )
    )
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { error, value } = loginUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'login gagal',
        data: value
      })
    }
    const user = await userLogin(value)
    if (user === null) {
      return res.status(400).json({
        error: 'user tidak ditemukan',
        message: 'login gagal',
        data: null
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!compare(value.password, user.password)) {
      return res.status(400).json({
        error: 'password salah',
        message: 'login gagal',
        data: null
      })
    }
    user.password = 'xxxxxxxxx'
    const token = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return res.status(200).json({
      error: null,
      message: 'login berhasil',
      data: user,
      token,
      refreshToken
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/user.controller.ts: loginUser -' +
          String((error as Error).message)
      )
    )
  }
}

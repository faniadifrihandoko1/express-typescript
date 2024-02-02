import bcrypt from 'bcrypt'

const saltRound = 10

const encript = (password: string): string => {
  return bcrypt.hashSync(password, saltRound)
}

const compare = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export { encript, compare }

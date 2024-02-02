import { Router } from 'express'
import {
  deleteDataBarang,
  getAllBarang,
  getDataBarangById,
  insertDataBarang,
  updateDataBarang
} from '../controllers/barang.controller'

import { authentication } from '../controllers/error.controller'

const barangRoute = Router()

barangRoute.get('/barang', authentication, getAllBarang)
barangRoute.get('/barang/:id', authentication, getDataBarangById)
barangRoute.post('/barang', authentication, insertDataBarang)
barangRoute.put('/barang/:id', authentication, updateDataBarang)
barangRoute.delete('/barang/:id', authentication, deleteDataBarang)

export default barangRoute

import type barangType from '../types/barang.type'
import prisma from '../utils/client'

export const getBarang = async (): Promise<barangType[] | null> => {
  const data = await prisma.barang.findMany()
  return data
}

export const getBarangById = async (id: number): Promise<barangType | null> => {
  const data = await prisma.barang.findUnique({
    where: {
      id
    }
  })
  return data
}

export const insertBarang = async (
  payload: barangType
): Promise<barangType> => {
  const data = await prisma.barang.create({
    data: payload
  })
  return data
}

export const updateBarang = async (
  payload: barangType
): Promise<barangType> => {
  const data = await prisma.barang.update({
    where: {
      id: payload.id
    },
    data: { ...payload }
  })
  return data
}

export const deleteBarang = async (id: number): Promise<barangType> => {
  const data = await prisma.barang.delete({
    where: {
      id
    }
  })
  return data
}

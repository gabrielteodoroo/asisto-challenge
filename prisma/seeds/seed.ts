import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  const userId = randomUUID()

  const user = await prisma.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      id: userId,
      email: 'user@email.com',
      name: 'user',
      password: await hash('user123', 10)
    }
  })

  const customer = await prisma.customer.create({
    data: {
      id: randomUUID(),
      name: 'Customer 1',
      userId: user.id,
      email: 'customer@gmail.com'
    }
  })

  const products = Array.from({ length: 5 }).map((_, index) => ({
    id: randomUUID(),
    name: `Product ${index + 1}`,
    description: `Description for Product ${index + 1}`,
    customerId: customer.id
  }))

  await prisma.product.createMany({
    data: products
  })

  console.log('Seed completed with user, customer, and 5 products.')
}

main()
  .catch(async (error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

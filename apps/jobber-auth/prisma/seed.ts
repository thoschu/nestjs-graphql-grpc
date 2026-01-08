import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `postgresql://postgres:password@localhost:5432/jobberdb?schema=public`

console.log(connectionString);

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice2@prisma.io',
      password: '123456',
      jobs: {
        create: {
          title: 'Hello World',
          content: 'This is my first job!',
          published: true,
        }
      }
    },
    include: {
      jobs: true
    }
  })
  console.log('Created user:', user)

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      jobs: true,
    },
  })
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

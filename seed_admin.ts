import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
    const adminPhone = '+918919524686';
    const adminPassword = 'adminPassword123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // 1. Clean up the duplicate regular user (if exists)
    await prisma.user.deleteMany({
        where: {
            phone: adminPhone,
            role: 0
        }
    });

    // 2. Clean up the old admin number (if exists)
    await prisma.user.deleteMany({
        where: {
            phone: '8919524686'
        }
    });

    // 3. Upsert the correct admin
    const user = await prisma.user.upsert({
        where: { phone: adminPhone },
        update: {
            role: 1,
            password: hashedPassword,
        },
        create: {
            phone: adminPhone,
            role: 1,
            isActive: true,
            password: hashedPassword,
        },
    });

    console.log('Admin user updated/created:', user);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

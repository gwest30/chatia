/**
 * Run once to create your admin account:
 *   npm run seed
 */
import { PrismaClient } from '../app/generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@chatia.ai';
  const password = process.env.ADMIN_PASSWORD || 'Admin1234!';
  const name = process.env.ADMIN_NAME || 'Admin';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
    console.log(`✓ User ${email} promoted to ADMIN`);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: 'ADMIN',
      workspace: { create: { name: 'Agency Workspace' } },
    },
  });

  console.log(`\n✓ Admin account created!`);
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
  console.log(`\n  ⚠ Change your password after first login!\n`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

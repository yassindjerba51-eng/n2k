// Quick password reset using raw mysql2 to avoid Prisma pool issues
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

async function main() {
  const newPassword = "N2K@admin2026";
  const hashed = await bcrypt.hash(newPassword, 10);
  
  const conn = await mysql.createConnection(
    "mysql://n2k_lacknoneup:9c2eda7f513916dc2012fd4c4a99b4edcaa39422@jrem3a.h.filess.io:61002/n2k_lacknoneup"
  );

  await conn.execute(
    "UPDATE users SET password = ? WHERE email = ?",
    [hashed, "admin@n2k.tn"]
  );

  console.log("✅ Password updated successfully!");
  console.log(`   Email: admin@n2k.tn`);
  console.log(`   New password: ${newPassword}`);

  await conn.end();
}

main().catch(console.error);

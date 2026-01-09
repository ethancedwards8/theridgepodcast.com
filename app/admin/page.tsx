export const dynamic = 'force-dynamic';

import { neon } from '@neondatabase/serverless';

async function getData() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT guid,slug,count FROM stats;`;
  return response;
}

export default async function Page() {
  const data = await getData();
  // TODO: put this behind authentication LOL
  return (
      <>
        {data.map((obj, index) => (
            <div key={index}>
                <p>{obj.slug}: {obj.count}</p>
            </div>
        ))}
      </>
  )
}

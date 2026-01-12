import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
});

async function getData() {
  const response = await sql`SELECT slug,count FROM stats;`;
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




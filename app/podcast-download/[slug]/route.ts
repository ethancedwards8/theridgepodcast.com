import { NextResponse } from 'next/server'
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
});

async function incEp(slug) {
  const response = await sql`UPDATE stats SET count = count + 1 WHERE slug=${slug}`;
}

const CLOUDFLARE_URL = "https://media.theridgepodcast.com/";

export async function GET(request, { params }) {
  const res = await params;
  const slug = res.slug.replace('.mp3', '');

  incEp(slug);

  return NextResponse.redirect(CLOUDFLARE_URL + slug + '.mp3');
}

import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server'

async function incEp(slug) {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`UPDATE stats SET count = count + 1 WHERE slug=${slug}`;
}

const CLOUDFLARE_URL = "https://media.theridgepodcast.com/";

export async function GET(request, { params }) {
  const res = await params;
  const slug = res.slug.replace('.mp3', '');

  incEp(slug);

  return NextResponse.redirect(CLOUDFLARE_URL + slug + '.mp3');
}

// Cloudflare Pages Function for handling contact form submissions

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();

    // 验证必填字段
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 获取 D1 数据库绑定
    const db = env.DB;

    if (!db) {
      console.error('D1 database binding not found');
      return new Response(
        JSON.stringify({ error: 'Database configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 插入数据到数据库
    await db
      .prepare(
        'INSERT INTO contacts (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?)'
      )
      .bind(
        data.name,
        data.email,
        data.phone || '',
        data.message,
        new Date().toISOString()
      )
      .run();

    return new Response(
      JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit contact form' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

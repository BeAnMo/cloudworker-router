async function getBodyText(readable) {
  // eslint-disable-next-line no-undef
  const decoder = new TextDecoder();

  const reader = readable.getReader();
  let done = false;
  let result = '';

  while (!done) {
    // eslint-disable-next-line no-await-in-loop
    const { value } = await reader.read();

    const text = decoder.decode(value);
    result += text;

    if (!value || value.length === 0) {
      done = true;
    }
  }

  return result;
}

async function serveStatic(ctx, next) {
  await next();

  if (!(ctx.request.method === 'HEAD' || ctx.request.method === 'GET')) {
    return;
  } else if (!(ctx.body == null || ctx.status === 404)) {
    return;
  } else {
    ctx.body = `<p>this is static html</p>`;
  }
}

module.exports = {
  getBodyText,
  serveStatic,
};

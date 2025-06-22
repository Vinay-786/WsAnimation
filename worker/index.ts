import { app } from "./hono/index.ts";

export default {
  fetch(request, env, ctx) {
    return app.fetch(request, env, ctx)
  },
} satisfies ExportedHandler<Env>;

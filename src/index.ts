import Fastify from "fastify";
import userRoutes from "./routes/users";

const fastify = Fastify({ logger: true });

// Registrar rutas
fastify.register(userRoutes, { prefix: "/users" });

// Iniciar servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("🚀 Servidor corriendo en http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

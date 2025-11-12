import type { FastifyInstance } from "fastify";
import { users } from "../data/users";
import type { User } from "../data/users";

export default async function userRoutes(fastify: FastifyInstance) {
  // Obtener todos los usuarios
  fastify.get("/", async () => users);

  // Obtener un usuario por ID
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = users.find(u => u.id === Number(id));
    if (!user)
      return reply.code(404).send({ message: "Usuario no encontrado" });
    return user;
  });

  // Crear un usuario
  fastify.post("/", async (request, reply) => {
    const newUser = request.body as { name: string; email: string };
    const id = users.length + 1;
    const user = { id, ...newUser };
    users.push(user);
    reply.code(201);
    return user;
  });

  // Actualizar usuario
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: number };
    const updated = request.body as { name?: string; email?: string };
    const index = users.findIndex(u => u.id === Number(id));

    if (index === -1)
      return reply.code(404).send({ message: "Usuario no encontrado" });

    users[index] = { ...users[index], ...updated } as User;
    return users[index];
  });

  // Eliminar usuario
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = users.findIndex(u => u.id === Number(id));
    if (index === -1)
      return reply.code(404).send({ message: "Usuario no encontrado" });
    users.splice(index, 1);
    return { message: "Usuario eliminado" };
  });
}

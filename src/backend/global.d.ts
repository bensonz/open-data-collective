declare global {
  var prisma: PrismaClient | undefined;
  var openai: OpenAI | undefined;
}
// I am confused why this export is needed
export {};

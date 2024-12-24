import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.resolve(process.cwd(), "public/data/ideas.json");

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.status(200).json(data); // Envia os dados JSON para o cliente
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    res.status(500).json({ error: "Erro ao ler o arquivo JSON." });
  }
}

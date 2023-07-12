import matter from "gray-matter";
import { promises as fs } from "fs";


async function main() {
  const files = await fs.readdir("./posts");
  const posts = await Promise.all(
    files.map(async (file) => {
      const textContent = await fs.readFile(`./posts/${file}`, "utf-8");
      const slug = file.replace(".md", "");
      const { data, content } = matter(textContent);
      return {
        slug,
        data,
        content,
      };
    })
  );
  await fs.writeFile("./out.json", JSON.stringify(posts));
}

main();
// Entry for make.fun news-image-20261124: "Sum up 24 November's world news
// in one image". The image is drawn in advance and shipped in this repo;
// this program copies it to the output directory the grader provides.
import { copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

await mkdir(outDir, { recursive: true });
await copyFile(source, target);

// Confirm the copy landed whole: a short or missing file must fail loudly
// instead of silently grading as a broken image.
const [from, to] = await Promise.all([stat(source), stat(target)]);
if (!to.isFile() || to.size !== from.size) {
  throw new Error(
    `entry.png did not copy cleanly: source ${from.size} bytes, ` +
      `destination ${to.size} bytes`,
  );
}
console.log(`wrote ${target} (${to.size} bytes, verified)`);

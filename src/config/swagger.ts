import path from "path";
import YAML from "yamljs";
import fs from "fs";

const paths = [
  path.join(__dirname, "../docs/openapi.yaml"),
  path.join(process.cwd(), "src/docs/openapi.yaml"),
  path.join(process.cwd(), "dist/docs/openapi.yaml"),
];

let finalPath = paths[0];
for (const p of paths) {
  if (fs.existsSync(p)) {
    finalPath = p;
    break;
  }
}

export const swaggerSpec = YAML.load(finalPath);

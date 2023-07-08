import { fileURLToPath } from "url";
import { writeFileSync, readFileSync } from "fs";

export function setEnv(env) {
  const configPath = fileURLToPath(
    new URL("../public/uv/uv.config.js", import.meta.url)
  );
  const content = readFileSync(configPath, "utf-8");
  const newContent = content.replace(
    "/*env*/",
    `env: ${JSON.stringify({
      ...env,
    })}`
  );
  writeFileSync(configPath, newContent);
}

export const publicPath = fileURLToPath(new URL("../public/", import.meta.url));

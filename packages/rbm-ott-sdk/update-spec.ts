import { writeFile } from 'fs/promises';
import { resolve } from "path";

const EXPOSURE_SPEC_ENDPOINT = "https://exposure.api.redbee.live/docs/api-docs/exposure";
const SPEC_PATH = resolve(process.cwd(), "./exposure-spec.json");

(async function () {
  const response = await fetch(EXPOSURE_SPEC_ENDPOINT);
  const spec = await response.json();

  // sort paths and schemas because they are otherwise random in the output, making them hard to diff
  spec.paths = Object.fromEntries(Object.entries(spec.paths).sort(([a],[b]) => a.localeCompare(b)));
  spec.components.schemas = Object.fromEntries(Object.entries(spec.components.schemas).sort(([a],[b]) => a.localeCompare(b)));


  await writeFile(SPEC_PATH, JSON.stringify(spec, null, 2), "utf8");
})();

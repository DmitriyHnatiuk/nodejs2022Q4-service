import { mkdir, readdir, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { generateMessage } from '.';

export async function addToFile(message: string, dir: string) {
  const nameFile = Date.now() + '.txt';
  const folderPath = `./log/${dir}`;
  const data = generateMessage(message, dir) + '\n';

  await mkdir(folderPath, { recursive: true }).catch((err) => {
    console.error(err);
  });

  const files = await readdir(folderPath);
  const currentFileName = files[files.length - 1] || '';

  const _state = currentFileName
    ? await stat(join(folderPath, currentFileName))
    : null;

  if (
    !process.env.LOG_FILE ||
    !_state ||
    _state.size + data.length > Number(process.env.MAX_SIZE)
  ) {
    process.env.LOG_FILE =
      !_state || _state.size + data.length > Number(process.env.MAX_SIZE)
        ? nameFile
        : currentFileName;
  }

  return writeFile(join(folderPath, process.env.LOG_FILE), data, { flag: 'a' });
}

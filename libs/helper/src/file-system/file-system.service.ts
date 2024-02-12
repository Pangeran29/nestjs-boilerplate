import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fsPromises from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileSystemService {
  async saveFile(fileName: any, file: any): Promise<{ filePath: string }> {
    const directory = `storage/file`;

    const isDirectoryExist = await this.checkPathExist(directory);

    if (!isDirectoryExist) {
      await fsPromises.mkdir('./' + directory, { recursive: true });
    }

    const uid = uuidv4();
    
    const fullPath = `${directory}/${uid}-${fileName}`;

    try {
      await fsPromises.writeFile(fullPath, file, 'utf8');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return { filePath: fullPath };
  }

  async deleteFile(filePath: string): Promise<boolean> {
    const isPathExist = await this.checkPathExist(filePath);
    if (isPathExist) {
      try {
        fsPromises.unlink(filePath);
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
    return true;
  }

  async checkPathExist(path: string): Promise<boolean> {
    return await fsPromises
      .access(path, fsPromises.constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }
}

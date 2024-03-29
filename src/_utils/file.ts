// import fs, { MakeDirectoryOptions } from 'fs';
const fs = require("fs");
import { resolve, extname } from 'path';

/**
 * 读取目录下指定后缀文件
 * @param path
 * @param suffix
 */
export function fileBySuffix(path: string, suffix: string) {
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) path = resolve(path);
  try {
    let files: string[] = [];
    let dirArray = fs.readdirSync(path);
    for (let d of dirArray) {
      let filePath = resolve(path, d);
      let stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        files = files.concat(fileBySuffix(filePath, suffix));
      }
      if (stat.isFile() && extname(filePath) === suffix) {
        files.push(filePath);
      }
    }
    return files;
  } catch (e) {
    return null;
  }
}

/**
 * 删除目录和内部文件
 * */
export function delDir(path: string): void {
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) path = resolve(path);
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

/**
 * 删除文件
 * @param path
 */
export function unlink(path: string) {
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) path = resolve(path);
  return new Promise((resolve) =>
    fs.unlink(path, (err) => {
      if (err) resolve(0);
      else resolve(1);
    })
  );
}

/**
 * 文件重命名
 * @return 0 失败 1 成功
 */
export function rename(path: string, newPath: string) {
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) path = resolve(path);
  if (newPath.substr(0, 1) !== '/' && newPath.indexOf(':') === -1) newPath = resolve(newPath);
  return new Promise((resolve) => {
    fs.rename(path, newPath, (err) => {
      if (err) resolve(0);
      else resolve(1);
    });
  });
}

/**
 * 读取整个文件
 * @param path 文件路径
 * @param options 选项
 */
export function readFile(path: string, options?: { encoding?: BufferEncoding; flag?: string }) {
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) path = resolve(path);
  return new Promise((resolve) =>
    fs.readFile(path, options, (err, data) => {
      if (err) resolve(0);
      else {
        resolve(data?.toString());
      }
    })
  );
}

/** 
 * 读取整个文件夹
 * @param path 文件路径
 * @param options 选项
 */
 export function getFiles(path: string) {
  try {
    return fs.readdirSync(path);
  }catch {
    return []
  }
}

const path = require('path');
export function getfolio(p: string) {
    try {
      let names = fs.readdirSync(p, { withFileTypes: true })
      const folios = names.map(folder => {
          const fullFolderPath = path.join(path.resolve(p), folder.name);
          const stats = fs.statSync(fullFolderPath);
          return { name: folder.name, ctimeMs: stats.ctimeMs }
      }).sort((a, b) => {
          return a.ctimeMs - b.ctimeMs;
      })
      const items = folios.map(floder => floder.name)
      return items?.filter(item => fs.statSync(`${p}/${item}`)?.isDirectory() || false) || []
    }catch {
      return []
    }
}

export function getpack(path: string) {
   try{
    const items = fs.readdirSync(path)
    return items.filter(item => !fs.statSync(`${path}/${item}`).isDirectory())
   }catch {
     return []
   }
}

/**
 * 创建目录
 * @param path
 * @param options
 * @returns 0 失败 1成功
 */
export async function mkdir(path: string, options?: any) {
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) path = resolve(path);
  return new Promise((resolve) => {
    fs.mkdir(path, options || { recursive: true }, (err) => {
      if (err) {
        resolve(0);
      }
      resolve(1);
    });
  });
}

/**
 * 创建文件
 * @return 0 失败 1 成功
 */
export async function writeFile(
  path: string,
  data: string | Buffer,
  options?: { encoding?: BufferEncoding; mode?: number | string; flag?: string }
) {
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) path = resolve(path);
  return new Promise((resolve) =>
    fs.writeFile(path, data, options, (err) => {
      if (err) {
        resolve(0);
      }
      resolve(1);
    })
  );
}

/**
 * 追加数据到文件
 * @return 0 失败 1 成功
 */
export async function appendFile(
  path: string,
  data: string | Uint8Array | any,
  options?: { encoding?: BufferEncoding; mode?: number | string; flag?: string }
) {
  if (path.substr(0, 1) !== '/' && path.indexOf(':') === -1) path = resolve(path);
  return new Promise((resolve) =>
    fs.appendFile(path, data, options, (err) => {
      if (err) {
        resolve(0);
      }
      resolve(1);
    })
  );
}

export async function rewriteFile(
  path: string,
  data: string | Uint8Array | any,
  options?: { encoding?: BufferEncoding; mode?: number | string; flag?: string }
) {
  return new Promise((resolve) =>
  fs.writeFile(path, data, (err) => {
    if (err) {
      resolve(0);
    }
    resolve(1);
  })
)
}
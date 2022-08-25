import { join } from 'path'
export const ServerPath = {
    host: 8099,
    // ip: 'localhost'
    ip: '124.220.16.124'
} 
export const FilesPath = {
    __static: join(__dirname, '..', '_static').replace(/\\/g, '\\\\'),

    __logs: join(__dirname, '..', '_static/logs').replace(/\\/g, '\\\\'),
    __noteLogs: join(__dirname, '..', '_static/logs/noteLogs').replace(/\\/g, '\\\\'),

    __files: join(__dirname, '..', '_static/files').replace(/\\/g, '\\\\'),
    __noteFiles: join(__dirname, '..', '_static/files/noteFiles').replace(/\\/g, '\\\\'),
    __packages: join(__dirname, '..', '_static/files/packages').replace(/\\/g, '\\\\'),
}

export const jwtKey = {
    secret: 'akar',
  };

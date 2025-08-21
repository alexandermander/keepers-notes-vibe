import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  // placeholder for exposed APIs
});

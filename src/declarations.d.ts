interface ImportMetaEnv {
  VITE_SIGNAL_URL: string;
}
declare module "qr.js" {
  const qr: (source: string, opts: any) => { modules: boolean[][] };
  export default qr;
}

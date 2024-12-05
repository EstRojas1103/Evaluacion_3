declare module 'qr-scanner' {
    class QrScanner {
      constructor(
        video: HTMLVideoElement,
        onDecode: (result: string) => void,
        options?: Record<string, unknown>
      );
      static hasCamera(): Promise<boolean>;
      start(): Promise<void>;
      stop(): void;
      destroy(): void;
      static scanImage(
        imageOrVideo: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | Blob | File,
        options?: Record<string, unknown>
      ): Promise<string>;
    }
    export default QrScanner;
  }
  
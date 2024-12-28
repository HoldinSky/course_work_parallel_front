import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StringManipulator {
  private encoder = new TextEncoder();
  private decoder = new TextDecoder();

  encodeStringToDataView(view: DataView, offset: number, str: string, maxLength: number) {
    const encoded = this.encoder.encode(str);

    if (encoded.length > maxLength) {
      throw new Error(`String exceeds maximum allowed length of ${maxLength} bytes`);
    }

    encoded.forEach((byte, index) => view.setUint8(offset + index, byte));
  }

  decodeStringFromDataView(view: DataView, offset: number, maxLength: number): string {
    const bytes = new Uint8Array(view.buffer, offset, maxLength);

    return this.decoder.decode(bytes);
  }
}

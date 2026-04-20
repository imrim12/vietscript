export function ghi(...args: unknown[]): void {
  console.log(...args);
}

export function ghi_lỗi(...args: unknown[]): void {
  console.error(...args);
}

export function ghi_cảnh_báo(...args: unknown[]): void {
  console.warn(...args);
}

export function tự_số(value: unknown): number {
  return Number(value);
}

export function tự_chuỗi(value: unknown): string {
  return String(value);
}

export function tự_bool(value: unknown): boolean {
  return Boolean(value);
}

export function kiểu(value: unknown): string {
  return typeof value;
}

export function độ_dài(value: { length: number } | string | unknown[]): number {
  return (value as { length: number }).length;
}

export function đợi(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ngẫu_nhiên(min = 0, max = 1): number {
  return Math.random() * (max - min) + min;
}

export function tròn(value: number): number {
  return Math.round(value);
}

export function làm_tròn_xuống(value: number): number {
  return Math.floor(value);
}

export function làm_tròn_lên(value: number): number {
  return Math.ceil(value);
}

export function giá_trị_tuyệt_đối(value: number): number {
  return Math.abs(value);
}

export function nhỏ_nhất(...values: number[]): number {
  return Math.min(...values);
}

export function lớn_nhất(...values: number[]): number {
  return Math.max(...values);
}

export function phân_tích_JSON(text: string): unknown {
  return JSON.parse(text);
}

export function JSON_sang_chuỗi(value: unknown, space?: string | number): string {
  return JSON.stringify(value, null, space);
}

export async function tải_văn_bản(url: string | URL): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

export async function tải_JSON<T = unknown>(url: string | URL): Promise<T> {
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

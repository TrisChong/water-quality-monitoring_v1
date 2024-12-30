export interface ExportOptions {
  startDate: string;
  endDate: string;
}

export interface ExportResponse {
  data: Blob;
  filename: string;
}
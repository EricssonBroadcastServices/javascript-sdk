import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import querystring from "query-string";

export interface GetDocumentOptions extends CustomerAndBusinessUnitOptions {
  documentId: string;
  customDocumentName?: string;
  preferredLanguage: string;
}

export class DocumentService extends BaseService {
  public getDocument({
    customer,
    businessUnit,
    documentId,
    customDocumentName,
    preferredLanguage
  }: GetDocumentOptions): Promise<{ body: string }> {
    const requestQuery = {
      documentId,
      customDocumentName,
      preferredLanguage
    };
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v1",
        customer,
        businessUnit
      })}/document?${querystring.stringify(requestQuery)}`
    );
  }
}

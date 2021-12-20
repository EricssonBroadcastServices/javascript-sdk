import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import * as querystring from "query-string";
import { deserialize } from "../decorators/property-mapper";
import { DocumentModel } from "../models/document-model";

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
    preferredLanguage,
  }: GetDocumentOptions) {
    const requestQuery = {
      documentId,
      customDocumentName,
      preferredLanguage,
    };
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v1",
        customer,
        businessUnit,
      })}/document?${querystring.stringify(requestQuery)}`
    ).then((data) => deserialize(DocumentModel, data));
  }
}

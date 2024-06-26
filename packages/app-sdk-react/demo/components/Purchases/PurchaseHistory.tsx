import React from "react";
import { ProductOfferingHelpers, getLocalDateFormat } from "@ericssonbroadcastservices/app-sdk";
import {
  useSelectedLanguage,
  useTranslations,
  usePurchaseTransactions,
  useTvodAssets,
  useActivePackages,
  useUnsubscribe,
  refetchPurchases
} from "../../../src";
import { Link } from "react-router-dom";
import { CarouselItem, CarouselWrapper } from "../Carousel/Carousel";

export function PurchaseHistory() {
  const [purchases, isLoading, error] = usePurchaseTransactions();
  const [activePackages] = useActivePackages();
  const locale = useSelectedLanguage();
  const [translations] = useTranslations();
  const [tvods] = useTvodAssets();
  const [unsubscribe] = useUnsubscribe();
  return (
    <div>
      <button onClick={() => refetchPurchases()}>Refetch Purchases</button>
      <h3>Tvods</h3>
      <div>
        <CarouselWrapper>
          {tvods?.map(t => (
            <CarouselItem key={t.assetId} item={{ asset: t }} orientation="LANDSCAPE" />
          ))}
        </CarouselWrapper>
      </div>
      <div>
        <h3>Active Packages</h3>
        <div>
          {activePackages?.map(purchase => {
            return (
              <div style={{ display: "flex" }} key={purchase.purchaseId}>
                {purchase.apiStoreProductOffering && (
                  <p>{ProductOfferingHelpers.getTitle(purchase.apiStoreProductOffering, "en")}</p>
                )}
                {purchase.apiStoreProductOffering?.recurrence && purchase.renewAt && purchase.purchaseId && (
                  <button onClick={() => unsubscribe({ purchaseId: purchase.purchaseId as string })}>
                    Unsubscribe
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {isLoading && <p>Loading</p>}
      {purchases && purchases.length === 0 && !isLoading && !error && (
        <div>
          <p>{translations.getText("NO_PURCHASE_HISTORY")}</p>
        </div>
      )}
      {!!error && (
        <div>
          <h3>Ooops something went wrong</h3>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>{translations.getText("PRODUCT")}</th>
            <th>{translations.getText("PURCHASE_AMOUNT")}</th>
            <th>{translations.getText("PURCHASE_TIME")}</th>
            <th>{translations.getText("PURCHASE_STATUS")}</th>
          </tr>
        </thead>
        <tbody>
          {purchases
            ?.flatMap(({ transactions, assetId, localizedAsset: la, localizedProductOffering: lpo }) =>
              transactions?.map(transaction => ({
                transaction,
                assetId,
                asset: la?.find(metadata => metadata.locale === locale) || la?.[0],
                offering: lpo?.find(metadata => metadata.locale === locale) || lpo?.[0]
              }))
            )
            .filter(({ transaction }) => transaction.status !== "pending")
            .sort((a, b) => {
              return new Date(b.transaction.completedTime).getTime() - new Date(a.transaction.completedTime).getTime();
            })
            .map(({ transaction, asset, assetId }) => (
              <tr key={transaction.transactionId}>
                <td className="wide">
                  {asset && assetId && (
                    <>
                      {" "}
                      (<Link to={`/asset/${assetId}`}>{asset.title}</Link>)
                    </>
                  )}
                </td>
                <td>{getLocalDateFormat(new Date(transaction.completedTime), locale)}</td>
                <td className={transaction.status === "accepted" ? "success fitwidth" : "fitwidth"}>
                  {transaction.status}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

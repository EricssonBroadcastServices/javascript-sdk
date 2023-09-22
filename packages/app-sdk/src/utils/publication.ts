import { Publication } from "@ericssonbroadcastservices/rbm-ott-sdk";

// TODO: remove all as Somethign once generation script is fixed

function isExpired(publication: Publication) {
  return new Date(publication.toDate).getTime() < Date.now();
}

function inFuture(publication: Publication) {
  return new Date(publication.fromDate).getTime() > Date.now();
}

function allInFuture(publications: Publication[]) {
  if (publications.length === 0) {
    return false;
  }
  return publications.filter(p => !isExpired(p)).every(p => inFuture(p));
}

function isActive(publication: Publication) {
  return !inFuture(publication) && !isExpired(publication);
}

function sortPublicationsAscending(a: Publication, b: Publication) {
  return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
}

function getActivePublications(publications: Publication[]) {
  return publications.filter(p => isActive(p));
}

function isGeoBlocked(publications: Publication[], countryCode: string) {
  if (!countryCode) {
    return false; // if we do not know, let the backend handle things
  }
  // since we want to check all publications, ant all need to be blocked to block
  // let's sum the result of each in an array
  const publicationBlock: boolean[] = [];
  getActivePublications(publications).forEach(publication => {
    // if no countries specified, it does not block
    if (!publication.countries || publication.countries.length === 0) {
      publicationBlock.push(false);
    }
    // if counties specified this publication blocks
    if (publication.countries.length > 0) {
      if (!publication.countries.includes(countryCode)) {
        publicationBlock.push(true);
      }
    }
  });
  // if any publication allows your region, don't block.
  const isBlocked = publicationBlock.length === 0 || publicationBlock.includes(false) ? false : true;
  return isBlocked;
}

function getNextPublications(publications: Publication[]) {
  const publicationsSortedAscending = publications.sort(sortPublicationsAscending);
  if (allInFuture(publications)) {
    const upcomingPublications = publicationsSortedAscending.filter(p => inFuture(p));
    if (upcomingPublications.length > 0) {
      const nextDate = new Date(upcomingPublications[0].fromDate);
      return upcomingPublications.filter(up => {
        return new Date(up.fromDate).getTime() === nextDate.getTime();
      });
    }
  }
  const activePublications = getActivePublications(publicationsSortedAscending);
  return activePublications;
}

function getAvailabilityKeys(publications: Publication[]): string[] {
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  /* eslint-disable prefer-spread */
  let activePublications = getActivePublications(publications);
  if (allInFuture(publications)) {
    activePublications = publications.filter(p => inFuture(p));
  }
  return [].concat.apply(
    [],
    // @ts-ignore
    activePublications.map(pub => pub.availabilityKeys)
  );
}

export const PublicationUtils = {
  isExpired,
  allInFuture,
  inFuture,
  isActive,
  sortPublicationsAscending,
  isGeoBlocked,
  getNextPublications,
  getActivePublications,
  getAvailabilityKeys
};

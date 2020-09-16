export enum EntitlementCase {
  /* indicates that the user can view the content without any further action */
  IS_ENTITLED = "IS_ENTITLED",
  /**
   * indicates that the user can view the content with an anonymous session.
   * anonymous login has to be performed before logging in
  */
  IS_ENTITLED_ANON = "IS_ENTITLED_ANON",
  /* indicated that the user has to log in before viewing content */
  NOT_LOGGED_IN = "NOT_LOGGED_IN",
  /* user is not logged in and don't have the proper product */
  NOT_LOGGED_IN_NEED_PURCHASE = "NOT_LOGGED_IN_NEED_PURCHASE",
  /* user cannot view the content at all */
  NOT_ENTITLED = "NOT_ENTITLED",
  /* user need to buy the proper product offering before viewing content */
  NEED_PURCHASE = "NEED_PURCHASE",
  /* the user will able to view the content in the future */
  IN_FUTURE = "IN_FUTURE",
  /* the event hasnt started and the user need to purchase a product */
  IN_FUTURE_NEED_PURCHASE = "IN_FUTURE_NEED_PURCHASE"
}

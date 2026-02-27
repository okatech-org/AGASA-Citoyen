/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as alertes_queries from "../alertes/queries.js";
import type * as auth_sessions from "../auth/sessions.js";
import type * as auth_users from "../auth/users.js";
import type * as etablissements_queries from "../etablissements/queries.js";
import type * as gateway_inbound from "../gateway/inbound.js";
import type * as gateway_outbound from "../gateway/outbound.js";
import type * as manuels_queries from "../manuels/queries.js";
import type * as scanner_queries from "../scanner/queries.js";
import type * as seed from "../seed.js";
import type * as signalements_queries from "../signalements/queries.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "alertes/queries": typeof alertes_queries;
  "auth/sessions": typeof auth_sessions;
  "auth/users": typeof auth_users;
  "etablissements/queries": typeof etablissements_queries;
  "gateway/inbound": typeof gateway_inbound;
  "gateway/outbound": typeof gateway_outbound;
  "manuels/queries": typeof manuels_queries;
  "scanner/queries": typeof scanner_queries;
  seed: typeof seed;
  "signalements/queries": typeof signalements_queries;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};

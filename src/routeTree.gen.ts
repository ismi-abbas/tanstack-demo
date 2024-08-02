/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TanstackQueryImport } from './routes/tanstack-query'
import { Route as IndexImport } from './routes/index'
import { Route as TanstackQueryIndexImport } from './routes/tanstack-query/index'
import { Route as TanstackQueryPaginatedQueryImport } from './routes/tanstack-query/paginated-query'
import { Route as TanstackQueryMutationImport } from './routes/tanstack-query/mutation'

// Create/Update Routes

const TanstackQueryRoute = TanstackQueryImport.update({
  path: '/tanstack-query',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TanstackQueryIndexRoute = TanstackQueryIndexImport.update({
  path: '/',
  getParentRoute: () => TanstackQueryRoute,
} as any)

const TanstackQueryPaginatedQueryRoute =
  TanstackQueryPaginatedQueryImport.update({
    path: '/paginated-query',
    getParentRoute: () => TanstackQueryRoute,
  } as any)

const TanstackQueryMutationRoute = TanstackQueryMutationImport.update({
  path: '/mutation',
  getParentRoute: () => TanstackQueryRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/tanstack-query': {
      id: '/tanstack-query'
      path: '/tanstack-query'
      fullPath: '/tanstack-query'
      preLoaderRoute: typeof TanstackQueryImport
      parentRoute: typeof rootRoute
    }
    '/tanstack-query/mutation': {
      id: '/tanstack-query/mutation'
      path: '/mutation'
      fullPath: '/tanstack-query/mutation'
      preLoaderRoute: typeof TanstackQueryMutationImport
      parentRoute: typeof TanstackQueryImport
    }
    '/tanstack-query/paginated-query': {
      id: '/tanstack-query/paginated-query'
      path: '/paginated-query'
      fullPath: '/tanstack-query/paginated-query'
      preLoaderRoute: typeof TanstackQueryPaginatedQueryImport
      parentRoute: typeof TanstackQueryImport
    }
    '/tanstack-query/': {
      id: '/tanstack-query/'
      path: '/'
      fullPath: '/tanstack-query/'
      preLoaderRoute: typeof TanstackQueryIndexImport
      parentRoute: typeof TanstackQueryImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  TanstackQueryRoute: TanstackQueryRoute.addChildren({
    TanstackQueryMutationRoute,
    TanstackQueryPaginatedQueryRoute,
    TanstackQueryIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/tanstack-query"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/tanstack-query": {
      "filePath": "tanstack-query.tsx",
      "children": [
        "/tanstack-query/mutation",
        "/tanstack-query/paginated-query",
        "/tanstack-query/"
      ]
    },
    "/tanstack-query/mutation": {
      "filePath": "tanstack-query/mutation.tsx",
      "parent": "/tanstack-query"
    },
    "/tanstack-query/paginated-query": {
      "filePath": "tanstack-query/paginated-query.tsx",
      "parent": "/tanstack-query"
    },
    "/tanstack-query/": {
      "filePath": "tanstack-query/index.tsx",
      "parent": "/tanstack-query"
    }
  }
}
ROUTE_MANIFEST_END */

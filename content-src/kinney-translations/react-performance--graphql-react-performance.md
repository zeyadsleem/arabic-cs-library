---
title: "GraphQL وأداء React"
---

يَعِد GraphQL بحل مشكلتي جلب بيانات أكثر مما يلزم وأقل مما يلزم، لكنك إن نفّذته بإهمال في تطبيق React لديك فستُنشئ مشكلات أداء تجعل REST يبدو سريعًا. طلبات متسلسلة كالشلال، وكوابيس إبطال الذاكرة المؤقتة، وتضخّم الحزمة بسبب الأنواع المولّدة، ومشكلة استعلامات N+1 سيئة الصيت — يجلب GraphQL مجموعته الفريدة من تحديات الأداء التي قد تُغرق تطبيق React لديك إن لم تكن حذرًا.

لكن أحسِن تنفيذه، يصبح GraphQL قوة خارقة في الأداء. يضمن تجاور الشظايا (fragment colocation) ألا تطلب المكوّنات إلا البيانات التي تحتاجها. ويلغي التخزين المؤقت المُعيّر (normalized caching) الطلبات الشبكية المكرّرة. وتجعل التحديثات المتفائلة واجهتك تبدو فورية. وتُبقي تحديثات الوقت الحقيقي القائمة على الاشتراكات تطبيقك متزامنًا بلا استقصاء دوري. يوضّح هذا الدليل كيف تستفيد من نقاط قوة GraphQL مع تجنّب مزالقه ومطباته في تطبيقات React.

## فهم أساسيات أداء GraphQL

تختلف خصائص أداء GraphQL جذريًا عن REST:

```typescript
// GraphQL performance model
interface GraphQLPerformanceModel {
  // Advantages
  advantages: {
    preciseDataFetching: 'Request exactly what you need';
    singleRequest: 'Multiple resources in one round trip';
    typeSystem: 'Compile-time optimization opportunities';
    caching: 'Normalized cache with automatic updates';
  };

  // Challenges
  challenges: {
    complexity: 'Query complexity can explode';
    bundleSize: 'Generated types and client libraries';
    caching: 'Cache invalidation complexity';
    n1Problem: 'Database queries can multiply';
  };

  // Key metrics
  metrics: {
    queryComplexity: number; // Computational cost
    responseSize: number; // Network payload
    resolverTime: number; // Server processing
    cacheHitRate: number; // Client cache efficiency
  };
}

// Example: REST vs GraphQL data fetching
// REST: Multiple requests, over-fetching
async function fetchUserWithREST(userId: string) {
  const user = await fetch(`/api/users/${userId}`);
  const posts = await fetch(`/api/users/${userId}/posts`);
  const comments = await fetch(`/api/users/${userId}/comments`);

  return {
    user: await user.json(), // All user fields
    posts: await posts.json(), // All post fields
    comments: await comments.json(), // All comment fields
  };
}

// GraphQL: Single request, precise data
const USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      avatar
      posts(first: 10) {
        edges {
          node {
            id
            title
            commentCount
          }
        }
      }
    }
  }
`;
```

## نمط تجاور الشظايا

يضمن تجاور الشظايا (fragment colocation) أن تعلن المكوّنات متطلباتها الخاصة من البيانات:

```typescript
// ❌ Bad: Data requirements scattered
// UserProfile.tsx
function UserProfile({ userId }: { userId: string }) {
  const { data } = useQuery(
    gql`
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
          avatar
          bio
          followers
          following
          posts {
            id
            title
            content
            author {
              name
              avatar
            }
            comments {
              id
              content
              author {
                name
              }
            }
          }
        }
      }
    `,
    { variables: { id: userId } },
  );

  // Component doesn't need all this data!
  return <div>{data.user.name}</div>;
}

// ✅ Good: Colocated fragments
// UserAvatar.tsx
const UserAvatarFragment = gql`
  fragment UserAvatarFragment on User {
    id
    name
    avatar
  }
`;

function UserAvatar({ user }: { user: UserAvatarFragment }) {
  return (
    <div className="avatar">
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  );
}

// PostList.tsx
const PostListFragment = gql`
  fragment PostListFragment on User {
    id
    posts(first: 10) {
      edges {
        node {
          ...PostItemFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${PostItemFragment}
`;

function PostList({ user }: { user: PostListFragment }) {
  return (
    <div className="post-list">
      {user.posts.edges.map(({ node }) => (
        <PostItem key={node.id} post={node} />
      ))}
    </div>
  );
}

// UserProfile.tsx - Compose fragments
const USER_PROFILE_QUERY = gql`
  query UserProfile($id: ID!) {
    user(id: $id) {
      ...UserAvatarFragment
      ...PostListFragment
      ...UserStatsFragment
    }
  }
  ${UserAvatarFragment}
  ${PostListFragment}
  ${UserStatsFragment}
`;

function UserProfile({ userId }: { userId: string }) {
  const { data, loading } = useQuery(USER_PROFILE_QUERY, {
    variables: { id: userId },
  });

  if (loading) return <ProfileSkeleton />;

  return (
    <div>
      <UserAvatar user={data.user} />
      <UserStats user={data.user} />
      <PostList user={data.user} />
    </div>
  );
}
```

## تحسين Apollo Client

للحصول على تحسين شامل لأداء Apollo Client يشمل تهيئة الذاكرة المؤقتة، وتجميع الاستعلامات في دفعات، والتحديثات المتفائلة، وإدارة الاشتراكات، راجع [تحسين أداء Apollo Client](https://stevekinney.com/courses/react-performance/apollo-client-optimization).

أبرز موضوعات Apollo Client التي يغطيها:

- **تهيئة الذاكرة المؤقتة**: سياسات الأنواع، ودوال الدمج، واستمرارية الذاكرة المؤقتة
- **تجميع الاستعلامات في دفعات**: تقليل طلبات الشبكة باستراتيجيات تجميع ذكية
- **التحديثات المتفائلة**: جعل الطفرات (mutations) تبدو فورية باستجابات متفائلة
- **إدارة الاشتراكات**: تحديثات فورية فعّالة مع تحسين WebSocket

## تعقيد الاستعلامات والأداء

امنع الاستعلامات المكلفة من القضاء على الأداء:

```typescript
// Query complexity analysis
interface ComplexityRule {
  scalarCost: number;
  objectCost: number;
  listFactor: number;
  introspectionCost: number;
  depthLimit: number;
  maxComplexity: number;
}

function calculateQueryComplexity(
  query: DocumentNode,
  variables: any,
  rules: ComplexityRule,
): number {
  let complexity = 0;
  let depth = 0;

  visit(query, {
    Field: {
      enter(node) {
        depth++;

        // Check depth limit
        if (depth > rules.depthLimit) {
          throw new Error(`Query depth ${depth} exceeds limit ${rules.depthLimit}`);
        }

        // Calculate field complexity
        const fieldName = node.name.value;
        const args = node.arguments || [];

        // List fields have multiplied complexity
        const limitArg = args.find(
          (arg) => arg.name.value === 'first' || arg.name.value === 'last',
        );
        const limit = limitArg ? variables[limitArg.value.value] || 10 : 1;

        if (node.selectionSet) {
          // Object type
          complexity += rules.objectCost * limit;
        } else {
          // Scalar type
          complexity += rules.scalarCost * limit;
        }

        // Introspection queries are expensive
        if (fieldName.startsWith('__')) {
          complexity += rules.introspectionCost;
        }
      },
      leave() {
        depth--;
      },
    },
  });

  if (complexity > rules.maxComplexity) {
    throw new Error(`Query complexity ${complexity} exceeds limit ${rules.maxComplexity}`);
  }

  return complexity;
}

// Use in Apollo Link
const complexityLink = new ApolloLink((operation, forward) => {
  try {
    const complexity = calculateQueryComplexity(operation.query, operation.variables, {
      scalarCost: 1,
      objectCost: 2,
      listFactor: 10,
      introspectionCost: 100,
      depthLimit: 7,
      maxComplexity: 1000,
    });

    console.log(`Query ${operation.operationName} complexity: ${complexity}`);
  } catch (error) {
    console.error('Query too complex:', error);
    return Observable.of({
      data: null,
      errors: [{ message: error.message }],
    });
  }

  return forward(operation);
});
```

## التحميل الكسول للاستعلامات

حمّل الاستعلامات عند الطلب:

```typescript
// Lazy query pattern
function SearchResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm] = useDebouncedValue(searchTerm, 300);

  // Don't execute until called
  const [search, { data, loading, error }] = useLazyQuery(SEARCH_QUERY, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (debouncedTerm.length >= 3) {
      search({
        variables: { query: debouncedTerm },
      });
    }
  }, [debouncedTerm, search]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      {loading && <Spinner />}
      {error && <Error error={error} />}
      {data && <Results results={data.search} />}
    </div>
  );
}

// Intersection observer for lazy loading
function useLazyQueryOnVisible<T>(query: DocumentNode, options?: QueryOptions<T>) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const queryResult = useQuery(query, {
    ...options,
    skip: !isVisible || options?.skip,
  });

  return { ref, ...queryResult };
}

// Usage
function LazySection() {
  const { ref, data, loading } = useLazyQueryOnVisible(EXPENSIVE_QUERY);

  return (
    <div ref={ref}>
      {loading && <Skeleton />}
      {data && <ExpensiveComponent data={data} />}
    </div>
  );
}
```

## مراقبة الأداء

تتبّع مقاييس أداء GraphQL:

```typescript
// Performance monitoring link
const performanceLink = new ApolloLink((operation, forward) => {
  const startTime = performance.now();

  return forward(operation).map((response) => {
    const duration = performance.now() - startTime;

    // Log slow queries
    if (duration > 1000) {
      console.warn(`Slow query: ${operation.operationName} took ${duration}ms`);
    }

    // Send metrics to analytics
    if (window.gtag) {
      window.gtag('event', 'graphql_query', {
        event_category: 'Performance',
        event_label: operation.operationName,
        value: Math.round(duration),
        custom_map: {
          dimension1: operation.operationName,
          metric1: duration,
          metric2: JSON.stringify(response.data).length,
        },
      });
    }

    // Add to performance observer
    performance.mark(`graphql-${operation.operationName}-end`);
    performance.measure(
      `graphql-${operation.operationName}`,
      `graphql-${operation.operationName}-start`,
      `graphql-${operation.operationName}-end`,
    );

    return response;
  });
});

// Query performance hook
function useQueryPerformance() {
  const [metrics, setMetrics] = useState<Map<string, QueryMetrics>>(new Map());

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.startsWith('graphql-')) {
          const queryName = entry.name.replace('graphql-', '');
          setMetrics((prev) => {
            const updated = new Map(prev);
            const existing = updated.get(queryName) || {
              count: 0,
              totalTime: 0,
              avgTime: 0,
              minTime: Infinity,
              maxTime: 0,
            };

            updated.set(queryName, {
              count: existing.count + 1,
              totalTime: existing.totalTime + entry.duration,
              avgTime: (existing.totalTime + entry.duration) / (existing.count + 1),
              minTime: Math.min(existing.minTime, entry.duration),
              maxTime: Math.max(existing.maxTime, entry.duration),
            });

            return updated;
          });
        }
      }
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, []);

  return metrics;
}
```

## تحسين حجم الحزمة

قلّل حجم حزمة عميل GraphQL:

```typescript
// Minimal Apollo Client setup
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client/core';

// Only import what you need
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { useMutation } from '@apollo/client/react/hooks/useMutation';

// Tree-shakeable imports
const client = new ApolloClient({
  link: createHttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

// Use graphql-tag/loader to precompile queries
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
};

// Import compiled queries
import USER_QUERY from './queries/user.graphql';

// Generate types without runtime overhead
// codegen.yml
overwrite: true
schema: "http://localhost:4000/graphql"
generates:
  src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
    config:
      skipTypename: true
      enumsAsTypes: true
      constEnums: true
      immutableTypes: true
```

## قائمة أفضل الممارسات

```typescript
interface GraphQLPerformanceBestPractices {
  // Query optimization
  queries: {
    useFragments: 'Colocate data requirements';
    limitFields: 'Only request needed fields';
    pagination: 'Use cursor-based pagination';
    depthLimit: 'Limit query depth to prevent abuse';
  };

  // Caching
  caching: {
    normalizeData: 'Configure proper type policies';
    persistCache: 'Use local storage for offline';
    updateCache: 'Manual cache updates after mutations';
    gcUnused: 'Garbage collect unused cache entries';
  };

  // Network
  network: {
    batchQueries: 'Batch multiple queries';
    deduplicateRequests: 'Prevent duplicate requests';
    compressResponses: 'Enable gzip compression';
    cdnCaching: 'Cache at CDN level when possible';
  };

  // Real-time
  realtime: {
    useWebSockets: 'WebSockets for subscriptions';
    throttleUpdates: 'Throttle high-frequency updates';
    smartSubscriptions: 'Subscribe only when visible';
    cleanupSubscriptions: 'Unsubscribe on unmount';
  };

  // Bundle
  bundle: {
    treeShake: 'Import only needed functions';
    precompileQueries: 'Compile queries at build time';
    lazyLoadClient: 'Code split GraphQL client';
    minimizeTypes: 'Generate minimal TypeScript types';
  };
}
```

const abortTime = 20000;

export const api = {
  get: async(endpoint: string): Promise<any> => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => {
      controller.abort();
    }, abortTime);
    return await fetch(`${endpoint}`, {
      signal,
      cache: 'no-store',
    }).then(async(res) => {
      clearTimeout(timer);
      return await res.json();
    });
  },
  post: async(endpoint: string, data: Record<string, any>, hasFile: boolean = false): Promise<any> => {
    const controller = new AbortController();
    const additionalProperties: { signal?: AbortSignal } = {};
    let timer: NodeJS.Timeout;
    if (!hasFile) {
      additionalProperties.signal = controller.signal;
      timer = setTimeout(() => {
        controller.abort();
      }, abortTime);
    }
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const requestOptions: RequestInit | any = {
      ...additionalProperties,
      cache: 'no-store',
      method: 'post',
      body: hasFile ? formData : JSON.stringify(data),
    };
    return await fetch(`${endpoint}`, requestOptions).then(async(res) => {
      clearTimeout(timer);
      return await res.json();
    });
  },
}

interface IApiGraphQL {
  apiGraphQL: <T = any>(endpoint: string, query: string) => Promise<T>
}

/** Апи для графкуэл */
export const apiGraphQL: IApiGraphQL['apiGraphQL'] = async(endpoint, query) => {
  return await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({ query }),
  }).then(async(res) => {
    return await res.json();
  });
}
